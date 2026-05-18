export interface Testimonial {
  name: string
  role: string
  quote: string
  avatar?: string
  source?: string
  date: string // ISO yyyy-mm-dd
}

const unsplashAvatar = (id: string) =>
  `https://images.unsplash.com/${id}?w=240&auto=format&fit=crop&q=80`

export const testimonials: Testimonial[] = [
  {
    name: '怡君',
    role: '2025 新娘',
    quote:
      '從第一次試妝到結婚當天，小蘭老師讓我覺得不是「被打扮」，而是「被理解」。整天看著鏡子裡的自己都會笑出來。',
    avatar: unsplashAvatar('photo-1494790108377-be9c29b29330'),
    date: '2025-03-12',
  },
  {
    name: '湘庭 & 媽媽',
    role: '2024 新娘',
    quote:
      '我媽從來不敢化太濃的妝，但小蘭老師為她做出來的氣質，連爸爸都看呆了。當天最開心的人其實是媽媽。',
    avatar: unsplashAvatar('photo-1517841905240-472988babdf9'),
    date: '2024-11-02',
  },
  {
    name: 'Vivienne',
    role: 'Editorial Shoot 2024',
    quote:
      '配合攝影師的光，妝感調整得剛剛好。最厲害的是「不修圖也好看」——這就是真功夫。',
    avatar: unsplashAvatar('photo-1438761681033-6461ffad8d80'),
    date: '2024-08-21',
  },
  {
    name: '宛蓁',
    role: '2024 新娘（嘉義場）',
    quote:
      '在嘉義能遇到老師真是幸運。從訂婚到結婚兩場，我幾乎沒擔心過。',
    avatar: unsplashAvatar('photo-1534528741775-53994a69daeb'),
    date: '2024-06-15',
  },
  {
    name: '芷涵',
    role: '彩妝教學學員',
    quote:
      '一對一教學讓我終於學會自己畫底妝。老師會根據你的眼型一筆一筆示範，課後筆記比書還詳細。',
    avatar: unsplashAvatar('photo-1531746020798-e6953c6e8e04'),
    date: '2024-04-08',
  },
  {
    name: 'Jenny',
    role: '2023 新娘',
    quote:
      '宴客當天我有點緊張，老師一邊補妝一邊和我聊天，整個人就放鬆下來。妝在熱舞之後完全沒花。',
    avatar: unsplashAvatar('photo-1573496359142-b8d87734a5a2'),
    date: '2023-12-30',
  },
  {
    name: '佳玲',
    role: '2025 新娘（台北場）',
    quote:
      '我看了很多新秘，但只有小蘭老師願意花時間了解我的故事。她記得我媽媽喜歡的顏色，連我外婆都被照顧到。',
    avatar: unsplashAvatar('photo-1487412720507-e7ab37603c6f'),
    date: '2025-05-08',
  },
  {
    name: '雅婷',
    role: '訂婚＋結婚雙場 2025',
    quote:
      '訂婚是旗袍、結婚是白紗，兩個場合風格完全不同，但都很有「我」的感覺。家人朋友都說我看起來「就是平常的我，但更美」。',
    avatar: unsplashAvatar('photo-1544005313-94ddf0286df2'),
    date: '2025-02-14',
  },
  {
    name: 'Sophia',
    role: '海外婚禮（沖繩）2024',
    quote:
      '從台灣飛到沖繩跟我們現場服務，連島上的潮濕氣候都能 hold 住妝感，補妝技術神乎其技。',
    avatar: unsplashAvatar('photo-1500917293891-ef795e70e1f6'),
    date: '2024-09-19',
  },
  {
    name: '彥君媽媽',
    role: '媽媽妝 2024',
    quote:
      '六十歲了還能被化得這麼自然又有氣質，朋友都問我去哪做的。謝謝小蘭老師讓我在女兒婚禮上也感到自信。',
    avatar: unsplashAvatar('photo-1567532939604-b6b5b0db2604'),
    date: '2024-10-26',
  },
  {
    name: '依萍',
    role: '訂婚造型 2024',
    quote:
      '我長輩很多、儀式繁複，老師事先就把整天的時程表跟著我們對過一遍，當天完全沒有亂掉的瞬間。專業度滿分。',
    avatar: unsplashAvatar('photo-1542596594-649edbc13630'),
    date: '2024-07-30',
  },
  {
    name: 'Cindy',
    role: '形象拍攝 2023',
    quote:
      '原本只是想拍幾張形象照，結果老師讓我發現自己也可以這麼有故事。攝影師說這是他遇過最配合的妝感。',
    avatar: unsplashAvatar('photo-1502823403499-6ccfcf4fb453'),
    date: '2023-11-04',
  },
]
