export default defineAppConfig({
  ui: {
    colors: {
      primary: 'wine',
      secondary: 'champagne',
      neutral: 'stone',
    },
    button: {
      slots: {
        // No rounded corners, font-serif (CJK glyphs use Noto Serif TC/SC for
        // proper Chinese rendering on buttons), pointer cursor, 200ms hover.
        base: 'font-serif tracking-wider font-medium uppercase !rounded-none cursor-pointer transition-all duration-200',
      },
      defaultVariants: {
        size: 'lg',
      },
    },
  },
})
