export default defineAppConfig({
  ui: {
    colors: {
      primary: 'wine',
      secondary: 'champagne',
      neutral: 'stone',
    },
    button: {
      slots: {
        // No rounded corners + always pointer cursor on hover. Hover/focus
        // transitions are tuned to 200ms via the global stylesheet.
        base: 'tracking-wider font-medium uppercase !rounded-none cursor-pointer transition-all duration-200',
      },
      defaultVariants: {
        size: 'lg',
      },
    },
  },
})
