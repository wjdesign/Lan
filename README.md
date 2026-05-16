# 葉小蘭時尚彩妝 ・ Lan Yeh Bridal Makeup

> Studio website for 葉小蘭老師 — 嘉義新娘秘書 ・ 全台預約服務。
> 二十餘年資歷的彩妝師工作室官網，以 Nuxt 3 / Tailwind / TypeScript 全新打造，部署於 GitHub Pages。

[![Deploy to GitHub Pages](https://github.com/wjdesign/Lan/actions/workflows/deploy.yml/badge.svg)](https://github.com/wjdesign/Lan/actions/workflows/deploy.yml)

---

## 🎨 設計概念

| 元素 | 規格 |
| --- | --- |
| **配色** | 奶茶米 (Champagne) ・ 玫瑰金 (Rose) ・ 深酒紅 (Wine) ・ 墨黑 (Ink) |
| **字型** | Noto Serif TC（中文襯線）、Cormorant Garamond / Italiana（英文展示） |
| **網格** | Tailwind v4 響應式 12 column grid（行動 → 大桌機四段） |
| **動畫** | Hero Ken-Burns、Scroll-Reveal IntersectionObserver、Page Transition、Marquee |
| **無障礙** | 支援 `prefers-reduced-motion`、語意化 HTML、AA 對比、鍵盤可達 |

---

## 🛠️ 技術棧

| 類別 | 套件 | 版本 |
| --- | --- | --- |
| 框架 | [Nuxt 3](https://nuxt.com) (SSG via `nuxt generate`) | ^3.21 |
| 語言 | TypeScript（strict） | ^5.7 |
| UI | [Nuxt UI v3](https://ui.nuxt.com) + [Tailwind CSS v4](https://tailwindcss.com) | ^3.x |
| 內容 | [@nuxt/content v3](https://content.nuxt.com) + Markdown + better-sqlite3 | ^3.5 |
| 圖片 | [@nuxt/image](https://image.nuxt.com)（WebP / AVIF / 自動 srcset） | ^1.8 |
| 字型 | [@nuxt/fonts](https://fonts.nuxt.com)（自動下載 + 子集化） | ^0.13 |
| SEO | [@nuxtjs/seo](https://nuxtseo.com)（Sitemap + Robots + Schema.org + OG） | ^3.x |
| 動畫 | [motion-v](https://motion.dev) + 自製 v-reveal directive | ^0.13 |
| 工具 | [@vueuse/nuxt](https://vueuse.org)、[date-fns](https://date-fns.org) | ^11 / ^4 |
| 部署 | GitHub Actions → GitHub Pages | — |

---

## 🚀 開發環境

### 一、Node 版本

本專案使用 nvm 管理 Node 版本，最低需求 Node **24 LTS (Krypton)**。

```bash
# 安裝 / 切換版本（會自動讀 .nvmrc）
nvm install
nvm use
```

### 二、安裝相依

```bash
npm install
```

### 三、啟動本地開發

```bash
npm run dev
# 開啟 http://localhost:3000
```

### 四、生產建置（靜態網站）

```bash
npm run generate
# 產出靜態檔案於 .output/public/
# 可用 npx serve .output/public 本地預覽
```

### 五、其他 npm scripts

| 指令 | 說明 |
| --- | --- |
| `npm run dev` | 本地開發伺服器（HMR） |
| `npm run build` | 一般 SSR build（非 SSG） |
| `npm run generate` | SSG 靜態網站建置 ★ |
| `npm run preview` | 預覽建置結果 |
| `npm run typecheck` | TypeScript 型別檢查 |
| `npm run lint` / `lint:fix` | ESLint |

---

## 🗂️ 目錄結構

```
Lan/
├─ app.vue                    # 根元件（UApp + NuxtLayout）
├─ error.vue                  # 404 / 錯誤頁
├─ app.config.ts              # Nuxt UI 主題設定（顏色、按鈕變體）
├─ nuxt.config.ts             # Nuxt / 模組 / SEO / GA / GTM 主設定
├─ content.config.ts          # @nuxt/content collection schema
│
├─ assets/css/main.css        # Tailwind 主題變數、字型、動畫、reveal
│
├─ components/                # 全域元件
│   ├─ AppHeader.vue          # Sticky / blur 導覽列 + 行動版抽屜
│   ├─ AppFooter.vue          # Footer 含聯絡＋社群
│   ├─ HeroBanner.vue         # 首頁滿版滑動 hero（Ken-Burns）
│   ├─ SectionHeading.vue     # 區塊標題（eyebrow + title + subtitle）
│   ├─ ServiceCard.vue        # 服務卡片
│   ├─ PortfolioCard.vue      # 作品卡片
│   ├─ TestimonialCard.vue    # 客戶見證
│   ├─ StatBar.vue            # 數據條
│   ├─ Marquee.vue            # 跑馬燈
│   └─ ContactCTA.vue         # 通用 CTA 區塊
│
├─ composables/
│   └─ useReveal.ts           # v-reveal 滾動進場 directive
│
├─ plugins/
│   └─ reveal.ts              # 註冊 v-reveal directive
│
├─ layouts/
│   └─ default.vue            # 預設版型（Header + main + Footer）
│
├─ pages/
│   ├─ index.vue              # 首頁
│   ├─ about.vue              # 關於小蘭老師
│   ├─ services.vue           # 彩妝服務 + 價目 + FAQ
│   ├─ portfolio/
│   │   ├─ index.vue          # 作品集列表（含分類篩選）
│   │   └─ [slug].vue         # 單一作品故事頁
│   ├─ journal/
│   │   ├─ index.vue          # 日誌列表
│   │   └─ [...slug].vue      # 單一文章（Markdown 渲染）
│   └─ contact.vue            # 預約諮詢頁（含 Google Form + LINE QR）
│
├─ content/journal/           # ★ 文章 Markdown 內容（請從此處新增）
│   └─ 2026-*.md
│
├─ data/                      # ★ 資料驅動內容（請從此處更新文案／作品／聯絡）
│   ├─ site.ts                # 品牌名／聯絡方式／社群／導覽
│   ├─ services.ts            # 服務項目 + 價目方案
│   ├─ portfolio.ts           # 作品集
│   ├─ testimonials.ts        # 客戶見證
│   └─ timeline.ts            # 工作室年表
│
├─ public/                    # 靜態檔案
│   ├─ favicon.ico / favicon.png
│   ├─ google8d0f228cc34004f6.html  # Google Search Console 驗證
│   ├─ robots.txt
│   └─ images/
│       ├─ about/              # 老師個人照／工作室
│       └─ portfolio/          # 實際作品照（從舊站匯入）
│
├─ server/api/__sitemap__/    # 動態 sitemap (含作品集詳情頁)
│
├─ .github/workflows/         # CI/CD
│   ├─ ci.yml                 # PR 上 lint + typecheck + build
│   └─ deploy.yml             # master 上自動部署 GitHub Pages
│
├─ _legacy/                   # 舊版靜態網站（保留參考，未被打包）
│
├─ .nvmrc                     # Node 版本鎖定
├─ package.json
└─ tsconfig.json
```

---

## ✏️ 如何維護內容（不需碰程式碼的人也能用）

### 修改聯絡資訊／品牌名／導覽列
→ `data/site.ts`

### 修改服務項目／價目／FAQ
→ `data/services.ts`（每項服務 / 價目方案都是物件，照樣式增刪即可）

### 新增 / 修改作品集
1. 把照片放到 `public/images/portfolio/`（建議 1200px+ 寬度）
2. 編輯 `data/portfolio.ts` 加入新作品：

```ts
{
  slug: 'amber-light',          // URL 用，英數連字號
  title: '琥珀光線下的儀式',
  category: 'bridal-white',     // 已有類別見上方型別
  year: 2025,
  location: '台南・晶英酒店',
  coverImage: '/images/portfolio/amber-cover.jpg',
  images: ['/images/portfolio/amber-1.jpg', '/images/portfolio/amber-2.jpg'],
  excerpt: '一句話介紹這場儀式',
  story: '完整故事⋯⋯',
  tags: ['白紗', '晨光'],
  isReal: true,                 // 真實作品設 true（過濾用）
}
```

### 新增日誌 / 部落格文章
1. 在 `content/journal/` 建立 `YYYY-MM-題目.md`
2. 範本：

```md
---
title: 文章標題
description: 一句話摘要（會用於 SEO meta description）
date: 2026-05-10
cover: /images/portfolio/some-photo.jpg
author: 葉小蘭
category: 造型筆記
tags:
  - 春季婚禮
readingTime: 5 min
---

## 第一個段落

正文⋯⋯
```

### 修改客戶見證
→ `data/testimonials.ts`

### 修改工作室年表
→ `data/timeline.ts`

---

## 🔍 SEO 設定

本專案 SEO 已優化至以下程度：

- ✅ 完整 `<title>`, `<meta description>`, `<meta keywords>` 於每頁
- ✅ Open Graph + Twitter Card（每頁可獨立設定 `ogImage`）
- ✅ Schema.org JSON-LD（`LocalBusiness` 全站 + 文章用 `Article`）
- ✅ `sitemap.xml` 自動生成（含動態作品集／文章頁）
- ✅ `robots.txt`
- ✅ Google Search Console site verification（保留原 2 組）
- ✅ Canonical URL（@nuxtjs/seo 自動處理）
- ✅ `<html lang="zh-Hant-TW">`
- ✅ 結構化標題層級（H1 唯一、H2 → H3）
- ✅ 圖片 alt 屬性、`loading="lazy"`
- ✅ Core Web Vitals：字型子集化、image lazy、現代格式 WebP/AVIF

### 追蹤碼（已沿用原本網站）
| 服務 | ID |
| --- | --- |
| Google Tag Manager | `GTM-MJR2XMVJ` |
| Google Analytics 4 | `G-26E7R738DX` |
| Google Search Console | `gLCAsUu86RoTsFHAsfUVP_D6Gh4p2AbcOBNcEyYFcns` |
| Google Search Console | `vgDwI3LkxGDTcZPslwNlwDAAzqPANefA0Pf1zkTLz1k` |

要修改：編輯 `nuxt.config.ts` 頂部常數。

---

## 🚢 部署（GitHub Pages）

### 第一次設定（一次性）
1. 開啟 GitHub repo → **Settings → Pages**
2. **Source** 選 **GitHub Actions**
3. （Push 到 master 後）等待 `Deploy to GitHub Pages` 工作流完成
4. 開啟 `https://wjdesign.github.io/Lan/`

### 之後的部署
任何 push 到 `master` 都會自動：
1. 跑 `npm ci`
2. `npm run generate`（產生 `.output/public/`）
3. 自動套用 `NUXT_APP_BASE_URL=/Lan/` 與 `NUXT_PUBLIC_SITE_URL=https://wjdesign.github.io`
4. 部署到 GitHub Pages

### PR / 開發分支
所有非 master 的 push 與 PR 會跑 `ci.yml`：
- ESLint
- TypeScript typecheck
- 完整 `npm run generate` 確保網站能 build

---

## 🧭 後續可優化

下列項目沒做進去，未來想加可參考：

- [ ] 自製 Open Graph 動態圖片產生器（目前用作品照當 og:image）
- [ ] LINE Bot 整合（讓 LINE 直接收訊息）
- [ ] 客戶後台（讓老師自己編輯內容，不用改 code）→ 可用 Decap CMS / TinaCMS
- [ ] i18n（英文版作品集）
- [ ] PWA / 離線快取
- [ ] 完整 lighthouse 100/100/100/100 校調

---

## 📜 版本記錄

- **2026-05-17** ・ v2.0 — Nuxt 3 完整改版（本次）
- **2017** ・ v1.0 — 原始 jQuery / Bootstrap 靜態網站（保留於 `_legacy/`）

---

## 📨 Maintained by

葉小蘭老師（內容）／wjdesign（開發）

聯絡：[ye168248@gmail.com](mailto:ye168248@gmail.com) ・ [LINE @ye168248](https://line.me/R/ti/p/ye168248)
