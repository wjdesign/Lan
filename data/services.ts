import type { Localized } from './i18n'

export interface Service {
  slug: string
  title: Localized
  subtitle: Localized
  description: Localized
  image: string
  icon: string
  highlights: Localized[]
}

export const services: Service[] = [
  {
    slug: 'bridal',
    title: {
      'zh-Hant': '新娘秘書',
      'zh-Hans': '新娘秘书',
      'en': 'Bridal Styling',
      'ja': 'ブライダルメイク',
    },
    subtitle: {
      'zh-Hant': 'Bridal Styling',
      'zh-Hans': 'Bridal Styling',
      'en': 'Wedding Day',
      'ja': 'ウェディング',
    },
    description: {
      'zh-Hant': '從晨光梳化到燭光晚宴，為你打造一日多換造型的完整視覺敘事。妝容、髮型、配飾、補妝補髮，每一個鏡頭裡的你都從容、靈動、屬於自己。',
      'zh-Hans': '从晨光梳化到烛光晚宴，为你打造一日多换造型的完整视觉叙事。妆容、发型、配饰、补妆补发，每一个镜头里的你都从容、灵动、属于自己。',
      'en': 'From dawn preparation to candlelit banquet — a complete visual narrative for your wedding day. Makeup, hair, accessories, and on-the-spot touch-ups across multiple looks.',
      'ja': '朝の支度から夜の披露宴まで、一日を通して移り変わる花嫁のスタイルを丁寧に演出。メイク、ヘア、アクセサリーから当日のお直しまで一貫してサポートします。',
    },
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=900&auto=format&fit=crop&q=72',
    icon: 'i-ph-heart-duotone',
    highlights: [
      { 'zh-Hant': '一次定裝＋造型靈感提案', 'zh-Hans': '一次定装＋造型灵感提案', 'en': 'Pre-wedding trial & mood-board', 'ja': '事前リハーサルとスタイル提案' },
      { 'zh-Hant': '當日專人補妝補髮', 'zh-Hans': '当日专人补妆补发', 'en': 'All-day on-site touch-ups', 'ja': '当日のメイク・ヘアお直し' },
      { 'zh-Hant': '訂結同日 / 雙場跟妝', 'zh-Hans': '订结同日 / 双场跟妆', 'en': 'Same-day engagement + wedding coverage', 'ja': '結納と挙式の同日対応' },
      { 'zh-Hant': '雙妝師到府服務（依需求）', 'zh-Hans': '双妆师到府服务（依需求）', 'en': 'Dual artists on request', 'ja': 'ご希望に応じて二名体制' },
    ],
  },
  {
    slug: 'mother',
    title: {
      'zh-Hant': '媽媽妝 / 婆婆妝',
      'zh-Hans': '妈妈妆 / 婆婆妆',
      'en': 'Mother of the Bride',
      'ja': '母親メイク',
    },
    subtitle: {
      'zh-Hant': 'Mother of the Bride',
      'zh-Hans': 'Mother of the Bride',
      'en': 'For the Family',
      'ja': '家族のために',
    },
    description: {
      'zh-Hant': '溫柔細膩、讓鏡頭與賓客都看見媽媽的優雅。氣質、典雅、襯托整體家族畫面的色彩規劃。',
      'zh-Hans': '温柔细腻、让镜头与宾客都看见妈妈的优雅。气质、典雅、衬托整体家族画面的色彩规划。',
      'en': 'Refined, tender, photograph-ready. Color planning that complements the bride and the entire family portrait.',
      'ja': '上品で柔らかなメイクで、当日のお母様の優雅さを引き立てます。新婦と家族写真全体の色設計に調和する仕上がりに。',
    },
    image: '/images/services/mother.jpg',
    icon: 'i-ph-flower-duotone',
    highlights: [
      { 'zh-Hant': '含護膚＋專業底妝', 'zh-Hans': '含护肤＋专业底妆', 'en': 'Skincare prep + professional base', 'ja': 'スキンケアと丁寧なベースメイク' },
      { 'zh-Hant': '搭配新娘整體色系規劃', 'zh-Hans': '搭配新娘整体色系规划', 'en': 'Color-coordinated with the bride', 'ja': '新婦と統一感のあるカラー設計' },
      { 'zh-Hant': '加價可含媽媽髮型／盤髮', 'zh-Hans': '加价可含妈妈发型／盘发', 'en': 'Optional hair styling add-on', 'ja': 'ヘアセットのオプションあり' },
    ],
  },
  {
    slug: 'evening',
    title: {
      'zh-Hant': '晚宴 / 派對造型',
      'zh-Hans': '晚宴 / 派对造型',
      'en': 'Evening & Gala',
      'ja': 'パーティーメイク',
    },
    subtitle: {
      'zh-Hant': 'Evening & Gala',
      'zh-Hans': 'Evening & Gala',
      'en': 'Spotlight Moments',
      'ja': 'スポットライトの瞬間',
    },
    description: {
      'zh-Hant': '頒獎典禮、年終派對、品牌活動——讓你成為現場最具存在感的那一束光。',
      'zh-Hans': '颁奖典礼、年终派对、品牌活动——让你成为现场最具存在感的那一束光。',
      'en': 'Awards, year-end galas, brand events. Make-up tailored to lighting, dress code, and presence.',
      'ja': '授賞式や年末パーティー、ブランドイベントなど、ライトの中で最も輝く存在へ。',
    },
    image: '/images/services/evening.jpg',
    icon: 'i-ph-star-duotone',
    highlights: [
      { 'zh-Hant': '妝感可從清新到強氣場任選', 'zh-Hans': '妆感可从清新到强气场任选', 'en': 'Soft-fresh to high-impact range', 'ja': 'ナチュラルから華やかまで幅広く対応' },
      { 'zh-Hant': '提供造型風格諮詢', 'zh-Hans': '提供造型风格谘询', 'en': 'Style consultation included', 'ja': 'スタイル提案あり' },
      { 'zh-Hant': '可加購到府服務', 'zh-Hans': '可加购到府服务', 'en': 'On-location service available', 'ja': '出張対応可' },
    ],
  },
  {
    slug: 'lesson',
    title: {
      'zh-Hant': '彩妝教學',
      'zh-Hans': '彩妆教学',
      'en': 'Private Lesson',
      'ja': 'プライベートレッスン',
    },
    subtitle: {
      'zh-Hant': 'Private Lesson',
      'zh-Hans': 'Private Lesson',
      'en': '1-on-1 Coaching',
      'ja': 'マンツーマン指導',
    },
    description: {
      'zh-Hant': '一對一手把手教學，從膚質分析、底妝邏輯、到日常／約會／拍照三種妝容情境，學會就帶得走。',
      'zh-Hans': '一对一手把手教学，从肤质分析、底妆逻辑、到日常／约会／拍照三种妆容情境，学会就带得走。',
      'en': 'Hands-on private coaching: skin analysis, base logic, three look scenarios for daily, date, and photo occasions.',
      'ja': '肌質診断からベース理論、デイリー／デート／撮影シーン別メイクまでマンツーマンで指導します。',
    },
    image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=900&auto=format&fit=crop&q=72',
    icon: 'i-ph-pen-nib-duotone',
    highlights: [
      { 'zh-Hant': '全程使用你的自有產品', 'zh-Hans': '全程使用你的自有产品', 'en': 'Uses your own products', 'ja': 'ご自身のコスメを使用' },
      { 'zh-Hant': '針對眼型／臉型客製', 'zh-Hans': '针对眼型／脸型客制', 'en': 'Customized to your features', 'ja': '目元・輪郭に合わせた指導' },
      { 'zh-Hant': '提供完整課後筆記', 'zh-Hans': '提供完整课后笔记', 'en': 'Full takeaway notes', 'ja': '受講後の手順ノート進呈' },
    ],
  },
  {
    slug: 'engagement',
    title: {
      'zh-Hant': '訂婚 / 文定造型',
      'zh-Hans': '订婚 / 文定造型',
      'en': 'Engagement',
      'ja': '結納・婚約',
    },
    subtitle: {
      'zh-Hant': 'Engagement',
      'zh-Hans': 'Engagement',
      'en': 'Family Ceremony',
      'ja': '両家の儀式',
    },
    description: {
      'zh-Hant': '訂婚是兩個家族正式相認的儀式。莊重而不嚴肅、亮眼而不浮誇——剛好的優雅，剛好的喜氣。',
      'zh-Hans': '订婚是两个家族正式相认的仪式。庄重而不严肃、亮眼而不浮夸——刚好的优雅，刚好的喜气。',
      'en': 'The engagement marks the two families coming together. Dignified but warm, radiant but never overdone.',
      'ja': '結納は両家が正式に出会う儀式。厳かでありながら華やかさのある、ちょうど良い佇まいを大切に。',
    },
    image: 'https://images.unsplash.com/photo-1525258946800-98cfd641d0de?w=900&auto=format&fit=crop&q=72',
    icon: 'i-ph-diamond-duotone',
    highlights: [
      { 'zh-Hant': '含敬茶造型 + 宴客造型', 'zh-Hans': '含敬茶造型 + 宴客造型', 'en': 'Tea ceremony + banquet looks', 'ja': '茶礼と披露宴の二つのスタイル' },
      { 'zh-Hant': '禮服／旗袍搭配規劃', 'zh-Hans': '礼服／旗袍搭配规划', 'en': 'Gown / qipao styling plan', 'ja': 'ドレス・チャイナドレスのコーディネート' },
      { 'zh-Hant': '當日全程跟妝', 'zh-Hans': '当日全程跟妆', 'en': 'Full-day touch-ups', 'ja': '当日のお直し対応' },
    ],
  },
  {
    slug: 'shoot',
    title: {
      'zh-Hant': '婚紗 / 形象拍攝',
      'zh-Hans': '婚纱 / 形象拍摄',
      'en': 'Editorial & Bridal Shoot',
      'ja': '撮影メイク',
    },
    subtitle: {
      'zh-Hant': 'Editorial & Bridal Shoot',
      'zh-Hans': 'Editorial & Bridal Shoot',
      'en': 'Camera-ready',
      'ja': 'カメラのために',
    },
    description: {
      'zh-Hant': '走進鏡頭時的你，每一格都是值得收藏的作品。配合攝影主題提案造型，從棚拍到外拍都掌握光影。',
      'zh-Hans': '走进镜头时的你，每一格都是值得收藏的作品。配合摄影主题提案造型，从棚拍到外拍都掌握光影。',
      'en': 'When you face the camera, every frame becomes a keepsake. Looks designed alongside photo themes and lighting — studio or on-location.',
      'ja': 'カメラに向かう瞬間、すべてのフレームが作品に。撮影テーマと光に合わせて、スタジオ・ロケーション両方に対応します。',
    },
    image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=900&auto=format&fit=crop&q=72',
    icon: 'i-ph-camera-duotone',
    highlights: [
      { 'zh-Hant': '依主題客製多套造型', 'zh-Hans': '依主题客制多套造型', 'en': 'Multiple themed looks', 'ja': 'テーマ別に複数スタイル' },
      { 'zh-Hant': '配合攝影師光線設計妝感', 'zh-Hans': '配合摄影师光线设计妆感', 'en': 'Aligned with photographer lighting', 'ja': 'カメラマンの光に合わせた仕上がり' },
      { 'zh-Hant': '可外景／離鄉拍攝', 'zh-Hans': '可外景／离乡拍摄', 'en': 'On-location & travel-friendly', 'ja': 'ロケ・遠方撮影対応' },
    ],
  },
]
