// ─────────────────────────────────────────────────────────────────────
// 葉小蘭時尚彩妝 ・ Sveltia CMS OAuth Worker（含 GitHub 帳號白名單）
//
// 部署位置：Cloudflare Workers ・ sveltia-cms-auth.4006wayne.workers.dev
//
// 與上游 https://github.com/sveltia/sveltia-cms-auth/blob/main/src/index.js
// 95% 相同，僅在 handleCallback 結尾「拿到 access_token 之後、回傳給
// Sveltia 之前」插入一段：
//
//   1. 用該 token 打 GET https://api.github.com/user 查當前登入者 login
//   2. 比對環境變數 ALLOWED_GITHUB_LOGINS（逗號分隔、不分大小寫）
//   3. 不在名單 → 回 NOT_ALLOWED 錯誤頁，Sveltia 拿不到 token，
//      編輯介面整個載不起來
//
// 部署步驟：
//   1. Cloudflare dashboard → Workers & Pages → sveltia-cms-auth → Edit code
//   2. 把整個 worker.js 用本檔內容覆蓋
//   3. Settings → Variables → 新增 Plain-text variable
//        Name : ALLOWED_GITHUB_LOGINS
//        Value: wjdesign,葉小蘭老師的GitHub帳號（逗號分隔）
//   4. Save and Deploy
//
// 環境變數一覽（這份 Worker 用到的）
//   GITHUB_CLIENT_ID       OAuth App client id（已設）
//   GITHUB_CLIENT_SECRET   OAuth App secret，必須是 Secret（已設）
//   ALLOWED_DOMAINS        允許白名單的網域，例如：
//                          wjdesign.github.io,localhost:*
//   ALLOWED_GITHUB_LOGINS  本檔新加：允許登入 CMS 的 GitHub 帳號
//                          （留空 = 不檢查，回到上游行為）
// ─────────────────────────────────────────────────────────────────────

/**
 * List of supported OAuth providers.
 */
const supportedProviders = ['github', 'gitlab'];

/**
 * Escape the given string for safe use in a regular expression.
 * @param {string} str - Original string.
 * @returns {string} Escaped string.
 */
const escapeRegExp = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * Output HTML response that communicates with the window opener.
 */
const outputHTML = ({ provider = 'unknown', token, error, errorCode }) => {
  const state = error ? 'error' : 'success';
  const content = error ? { provider, error, errorCode } : { provider, token };

  return new Response(
    `
      <!doctype html><html><body><script>
        (() => {
          window.addEventListener('message', ({ data, origin }) => {
            if (data === 'authorizing:${provider}') {
              window.opener?.postMessage(
                'authorization:${provider}:${state}:${JSON.stringify(content)}',
                origin
              );
            }
          });
          window.opener?.postMessage('authorizing:${provider}', '*');
        })();
      </script></body></html>
    `,
    {
      headers: {
        'Content-Type': 'text/html;charset=UTF-8',
        'Set-Cookie': `csrf-token=deleted; HttpOnly; Max-Age=0; Path=/; SameSite=Lax; Secure`,
      },
    },
  );
};

/**
 * Handle the `auth` method, which is the first request in the authorization flow.
 */
const handleAuth = async (request, env) => {
  const { url } = request;
  const { origin, searchParams } = new URL(url);
  const { provider, site_id: domain } = Object.fromEntries(searchParams);

  if (!provider || !supportedProviders.includes(provider)) {
    return outputHTML({
      error: 'Your Git backend is not supported by the authenticator.',
      errorCode: 'UNSUPPORTED_BACKEND',
    });
  }

  const {
    ALLOWED_DOMAINS,
    GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET,
    GITHUB_HOSTNAME = 'github.com',
    GITLAB_CLIENT_ID,
    GITLAB_CLIENT_SECRET,
    GITLAB_HOSTNAME = 'gitlab.com',
  } = env;

  if (
    ALLOWED_DOMAINS &&
    !ALLOWED_DOMAINS.split(/,/).some((str) =>
      (domain ?? '').match(new RegExp(`^${escapeRegExp(str.trim()).replace('\\*', '.+')}$`)),
    )
  ) {
    return outputHTML({
      provider,
      error: 'Your domain is not allowed to use the authenticator.',
      errorCode: 'UNSUPPORTED_DOMAIN',
    });
  }

  const csrfToken = globalThis.crypto.randomUUID().replaceAll('-', '');
  let authURL = '';

  if (provider === 'github') {
    if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
      return outputHTML({
        provider,
        error: 'OAuth app client ID or secret is not configured.',
        errorCode: 'MISCONFIGURED_CLIENT',
      });
    }
    const params = new URLSearchParams({
      client_id: GITHUB_CLIENT_ID,
      scope: 'repo,user',
      state: csrfToken,
    });
    authURL = `https://${GITHUB_HOSTNAME}/login/oauth/authorize?${params.toString()}`;
  }

  if (provider === 'gitlab') {
    if (!GITLAB_CLIENT_ID || !GITLAB_CLIENT_SECRET) {
      return outputHTML({
        provider,
        error: 'OAuth app client ID or secret is not configured.',
        errorCode: 'MISCONFIGURED_CLIENT',
      });
    }
    const params = new URLSearchParams({
      client_id: GITLAB_CLIENT_ID,
      redirect_uri: `${origin}/callback`,
      response_type: 'code',
      scope: 'api',
      state: csrfToken,
    });
    authURL = `https://${GITLAB_HOSTNAME}/oauth/authorize?${params.toString()}`;
  }

  return new Response('', {
    status: 302,
    headers: {
      Location: authURL,
      'Set-Cookie':
        `csrf-token=${provider}_${csrfToken}; ` +
        `HttpOnly; Path=/; Max-Age=600; SameSite=Lax; Secure`,
    },
  });
};

/**
 * Handle the `callback` method, which is the second request in the authorization flow.
 */
const handleCallback = async (request, env) => {
  const { url, headers } = request;
  const { origin, searchParams } = new URL(url);
  const { code, state } = Object.fromEntries(searchParams);

  const [, provider, csrfToken] =
    headers.get('Cookie')?.match(/\bcsrf-token=([a-z-]+?)_([0-9a-f]{32})\b/) ?? [];

  if (!provider || !supportedProviders.includes(provider)) {
    return outputHTML({
      error: 'Your Git backend is not supported by the authenticator.',
      errorCode: 'UNSUPPORTED_BACKEND',
    });
  }
  if (!code || !state) {
    return outputHTML({
      provider,
      error: 'Failed to receive an authorization code. Please try again later.',
      errorCode: 'AUTH_CODE_REQUEST_FAILED',
    });
  }
  if (!csrfToken || state !== csrfToken) {
    return outputHTML({
      provider,
      error: 'Potential CSRF attack detected. Authentication flow aborted.',
      errorCode: 'CSRF_DETECTED',
    });
  }

  const {
    GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET,
    GITHUB_HOSTNAME = 'github.com',
    GITLAB_CLIENT_ID,
    GITLAB_CLIENT_SECRET,
    GITLAB_HOSTNAME = 'gitlab.com',
    ALLOWED_GITHUB_LOGINS,
  } = env;

  let tokenURL = '';
  let requestBody = {};

  if (provider === 'github') {
    if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
      return outputHTML({
        provider,
        error: 'OAuth app client ID or secret is not configured.',
        errorCode: 'MISCONFIGURED_CLIENT',
      });
    }
    tokenURL = `https://${GITHUB_HOSTNAME}/login/oauth/access_token`;
    requestBody = {
      code,
      client_id: GITHUB_CLIENT_ID,
      client_secret: GITHUB_CLIENT_SECRET,
    };
  }

  if (provider === 'gitlab') {
    if (!GITLAB_CLIENT_ID || !GITLAB_CLIENT_SECRET) {
      return outputHTML({
        provider,
        error: 'OAuth app client ID or secret is not configured.',
        errorCode: 'MISCONFIGURED_CLIENT',
      });
    }
    tokenURL = `https://${GITLAB_HOSTNAME}/oauth/token`;
    requestBody = {
      code,
      client_id: GITLAB_CLIENT_ID,
      client_secret: GITLAB_CLIENT_SECRET,
      grant_type: 'authorization_code',
      redirect_uri: `${origin}/callback`,
    };
  }

  let response;
  let token = '';
  let error = '';

  try {
    response = await fetch(tokenURL, {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });
  } catch {
    //
  }

  if (!response) {
    return outputHTML({
      provider,
      error: 'Failed to request an access token. Please try again later.',
      errorCode: 'TOKEN_REQUEST_FAILED',
    });
  }

  try {
    ({ access_token: token, error } = await response.json());
  } catch {
    return outputHTML({
      provider,
      error: 'Server responded with malformed data. Please try again later.',
      errorCode: 'MALFORMED_RESPONSE',
    });
  }

  // ─── 帳號白名單檢查（本檔新加） ────────────────────────────────
  // 僅對 GitHub 啟用、且 ALLOWED_GITHUB_LOGINS 有設值才檢查。
  // 留空或未設定 = 不檢查，行為等同上游版本。
  if (token && provider === 'github' && ALLOWED_GITHUB_LOGINS) {
    let login = '';
    try {
      const userRes = await fetch('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github+json',
          'User-Agent': 'sveltia-cms-auth',
        },
      });
      const userJson = await userRes.json();
      login = userJson?.login || '';
    } catch {
      return outputHTML({
        provider,
        error: 'Failed to verify your GitHub identity. Please try again.',
        errorCode: 'IDENTITY_VERIFICATION_FAILED',
      });
    }

    const allowed = ALLOWED_GITHUB_LOGINS.split(',').map((s) => s.trim().toLowerCase()).filter(Boolean);
    if (!allowed.includes(login.toLowerCase())) {
      return outputHTML({
        provider,
        error: `Sorry, ${login || 'your GitHub account'} is not authorized to access this CMS.`,
        errorCode: 'NOT_ALLOWED',
      });
    }
  }
  // ─── 白名單檢查結束 ─────────────────────────────────────────────

  return outputHTML({ provider, token, error });
};

export default {
  async fetch(request, env) {
    const { method, url } = request;
    const { pathname } = new URL(url);

    if (method === 'GET' && ['/auth', '/oauth/authorize'].includes(pathname)) {
      return handleAuth(request, env);
    }
    if (method === 'GET' && ['/callback', '/oauth/redirect'].includes(pathname)) {
      return handleCallback(request, env);
    }
    return new Response('', { status: 404 });
  },
};
