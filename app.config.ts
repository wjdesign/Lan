export default defineAppConfig({
  ui: {
    colors: {
      primary: 'wine',
      secondary: 'champagne',
      neutral: 'stone',
    },
    button: {
      slots: {
        base: 'tracking-wider font-medium uppercase',
      },
      defaultVariants: {
        size: 'lg',
      },
    },
  },
})
