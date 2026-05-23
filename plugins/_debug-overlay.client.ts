/**
 * TEMP DEBUG — 白屏診斷外掛
 *
 * 補強 nuxt.config inline 那段 window.onerror 抓不到的東西：
 *   - Vue 內部錯誤（render / setup / hydration）會走 vue:error / errorHandler
 *   - 載入 4 秒後若畫面看起來是白屏（main 沒內容），印出狀態快照
 *
 * 診斷完即刪除。
 */
export default defineNuxtPlugin((nuxtApp) => {
  function show(msg: string, color = '#a00') {
    try {
      let d = document.getElementById('__errlog') as HTMLDivElement | null
      if (!d) {
        d = document.createElement('div')
        d.id = '__errlog'
        d.style.cssText =
          'position:fixed;top:0;left:0;right:0;z-index:2147483647;'
          + 'color:#fff;font:11px/1.5 monospace;padding:10px;'
          + 'white-space:pre-wrap;max-height:80vh;overflow:auto;box-sizing:border-box'
        ;(document.body || document.documentElement).appendChild(d)
      }
      d.style.background = color
      d.textContent += msg + '\n──────\n'
    }
    catch {}
  }

  nuxtApp.vueApp.config.errorHandler = (err: unknown, _instance, info) => {
    const e = err as { message?: string, stack?: string }
    show('Vue errorHandler [' + info + ']: ' + (e?.message || err) + '\n' + ((e?.stack || '').slice(0, 400)))
  }
  nuxtApp.hook('vue:error', (err: unknown) => {
    const e = err as { message?: string }
    show('vue:error: ' + (e?.message || err))
  })
  nuxtApp.hook('app:error', (err: unknown) => {
    const e = err as { message?: string }
    show('app:error: ' + (e?.message || err))
  })

  // 4 秒後若畫面看起來是白屏，印狀態快照
  if (typeof window !== 'undefined') {
    setTimeout(() => {
      try {
        const main = document.querySelector('main')
        const splash = document.querySelector('.splash')
        const cs = splash ? getComputedStyle(splash) : null
        const nuxt = document.getElementById('__nuxt')
        const info = {
          url: location.pathname + location.search,
          locale: document.documentElement.lang,
          mainExists: !!main,
          mainTextLen: (main?.innerText || '').trim().length,
          mainChildren: main?.children.length ?? -1,
          bodyChildren: document.body.children.length,
          nuxtChildren: nuxt?.children.length ?? -1,
          splashDisplay: cs?.display,
          splashVisibility: cs?.visibility,
          splashOpacity: cs?.opacity,
          splashSeen: document.documentElement.classList.contains('splash-seen'),
          ua: navigator.userAgent.slice(0, 80),
        }
        const broken = !main || info.mainTextLen < 30
        if (broken) {
          show('白屏狀態快照 (4s 後)：\n' + JSON.stringify(info, null, 2), '#005a99')
        }
      }
      catch (e) {
        show('診斷失敗: ' + (e as Error).message, '#005a99')
      }
    }, 4000)
  }
})
