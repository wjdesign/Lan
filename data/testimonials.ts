export interface Testimonial {
  name: string
  role: string
  quote: string
  avatar?: string
  source?: string
  date: string // ISO yyyy-mm-dd
}

export const testimonials: Testimonial[] = [
  {
    name: '怡君',
    role: '2025 新娘',
    quote:
      '從第一次試妝到結婚當天，小蘭老師讓我覺得不是「被打扮」，而是「被理解」。整天看著鏡子裡的自己都會笑出來。',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=240&auto=format&fit=crop&q=80',
    date: '2025-03-12',
  },
  {
    name: '湘庭 & 媽媽',
    role: '2024 新娘',
    quote:
      '我媽從來不敢化太濃的妝，但小蘭老師為她做出來的氣質，連爸爸都看呆了。當天最開心的人其實是媽媽。',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=240&auto=format&fit=crop&q=80',
    date: '2024-11-02',
  },
  {
    name: 'Vivienne',
    role: 'Editorial Shoot 2024',
    quote:
      '配合攝影師的光，妝感調整得剛剛好。最厲害的是「不修圖也好看」——這就是真功夫。',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=240&auto=format&fit=crop&q=80',
    date: '2024-08-21',
  },
  {
    name: '宛蓁',
    role: '2024 新娘（嘉義場）',
    quote:
      '在嘉義能遇到老師真是幸運。從訂婚到結婚兩場，我幾乎沒擔心過。',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=240&auto=format&fit=crop&q=80',
    date: '2024-06-15',
  },
  {
    name: '芷涵',
    role: '彩妝教學學員',
    quote:
      '一對一教學讓我終於學會自己畫底妝。老師會根據你的眼型一筆一筆示範，課後筆記比書還詳細。',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=240&auto=format&fit=crop&q=80',
    date: '2024-04-08',
  },
  {
    name: 'Jenny',
    role: '2023 新娘',
    quote:
      '宴客當天我有點緊張，老師一邊補妝一邊和我聊天，整個人就放鬆下來。妝在熱舞之後完全沒花。',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=240&auto=format&fit=crop&q=80',
    date: '2023-12-30',
  },
]
