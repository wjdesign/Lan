export interface ServicePackage {
  name: string
  price: string
  description: string
  includes: string[]
  popular?: boolean
}

export interface Service {
  slug: string
  title: string
  subtitle: string
  description: string
  image: string
  icon: string
  highlights: string[]
  packages?: ServicePackage[]
}

export const services: Service[] = [
  {
    slug: 'bridal',
    title: '新娘秘書',
    subtitle: 'Bridal Styling',
    description:
      '從晨光梳化到燭光晚宴，為你打造一日多換造型的完整視覺敘事。妝容、髮型、配飾、補妝補髮，每一個鏡頭裡的你都從容、靈動、屬於自己。',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&auto=format&fit=crop&q=80',
    icon: 'i-ph-heart-duotone',
    highlights: ['一次定裝＋造型靈感提案', '當日專人補妝補髮', '訂結同日 / 雙場跟妝', '雙妝師到府服務（依需求）'],
    packages: [
      {
        name: '單妝（晨間迎娶）',
        price: 'NT$ 6,800 起',
        description: '適合公證、簡單宴客或晨間迎娶。',
        includes: ['新娘妝髮 1 套', '配飾搭配', '當日不補妝'],
      },
      {
        name: '雙妝（訂婚／結婚一日）',
        price: 'NT$ 12,800 起',
        description: '最受歡迎，覆蓋一日從早到晚的所有重要時刻。',
        includes: ['新娘妝髮 2 套', '宴客造型 1 換', '全日跟妝補妝', '迎賓花飾／配件搭配'],
        popular: true,
      },
      {
        name: '三妝以上 / VIP 全程',
        price: '客製報價',
        description: '海外婚禮、訂結同日、或想要每一場變身都驚豔賓客的你。',
        includes: ['妝髮 3 套以上', '雙妝師到府', '專屬造型流程表', '行前 1V1 諮詢 60 分鐘'],
      },
    ],
  },
  {
    slug: 'mother',
    title: '媽媽妝 / 婆婆妝',
    subtitle: 'Mother of the Bride',
    description: '溫柔細膩、讓鏡頭與賓客都看見媽媽的優雅。氣質、典雅、襯托整體家族畫面的色彩規劃。',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1600&auto=format&fit=crop&q=80',
    icon: 'i-ph-flower-duotone',
    highlights: ['含護膚＋專業底妝', '搭配新娘整體色系規劃', '加價可含媽媽髮型／盤髮'],
  },
  {
    slug: 'evening',
    title: '晚宴 / 派對造型',
    subtitle: 'Evening & Gala',
    description: '頒獎典禮、年終派對、品牌活動——讓你成為現場最具存在感的那一束光。',
    image: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=1600&auto=format&fit=crop&q=80',
    icon: 'i-ph-star-duotone',
    highlights: ['妝感可從清新到強氣場任選', '提供造型風格諮詢', '可加購到府服務'],
  },
  {
    slug: 'lesson',
    title: '彩妝教學',
    subtitle: 'Private Lesson',
    description: '一對一手把手教學，從膚質分析、底妝邏輯、到日常／約會／拍照三種妝容情境，學會就帶得走。',
    image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1600&auto=format&fit=crop&q=80',
    icon: 'i-ph-pen-nib-duotone',
    highlights: ['全程使用你的自有產品', '針對眼型／臉型客製', '提供完整課後筆記'],
  },
  {
    slug: 'engagement',
    title: '訂婚 / 文定造型',
    subtitle: 'Engagement',
    description: '訂婚是兩個家族正式相認的儀式。莊重而不嚴肅、亮眼而不浮誇——剛好的優雅，剛好的喜氣。',
    image: 'https://images.unsplash.com/photo-1525258946800-98cfd641d0de?w=1600&auto=format&fit=crop&q=80',
    icon: 'i-ph-diamond-duotone',
    highlights: ['含敬茶造型 + 宴客造型', '禮服／旗袍搭配規劃', '當日全程跟妝'],
  },
  {
    slug: 'shoot',
    title: '婚紗 / 形象拍攝',
    subtitle: 'Editorial & Bridal Shoot',
    description: '走進鏡頭時的你，每一格都是值得收藏的作品。配合攝影主題提案造型，從棚拍到外拍都掌握光影。',
    image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1600&auto=format&fit=crop&q=80',
    icon: 'i-ph-camera-duotone',
    highlights: ['依主題客製多套造型', '配合攝影師光線設計妝感', '可外景／離鄉拍攝'],
  },
]
