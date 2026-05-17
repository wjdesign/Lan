export default defineAppConfig({
  ui: {
    colors: {
      primary: 'wine',
      secondary: 'champagne',
      neutral: 'stone',
    },
    button: {
      slots: {
        // No rounded corners, font-serif for proper CJK rendering, pointer
        // cursor, 200ms hover. The `[&_*]:!text-current` trick forces every
        // descendant (including icon spans) to inherit the variant text color,
        // so Nuxt UI's auto-foreground doesn't render as near-black on our
        // custom wine palette.
        base: 'font-serif tracking-wider font-medium uppercase !rounded-none cursor-pointer transition-all duration-200',
      },
      variants: {
        // Force readable text colour on top of each solid/outline variant.
        // Nuxt UI's auto foreground was rendering near-black on our wine
        // palette in production, making CTA labels unreadable.
        color: {
          primary: {
            base: '',
          },
          secondary: {
            base: '',
          },
        },
      },
      compoundVariants: [
        {
          color: 'primary',
          variant: 'solid',
          class: '!bg-wine-800 !text-champagne-50 hover:!bg-wine-900',
        },
        {
          color: 'secondary',
          variant: 'solid',
          class: '!bg-champagne-500 !text-wine-900 hover:!bg-champagne-400',
        },
        {
          color: 'primary',
          variant: 'outline',
          class: '!border-wine-700 !text-wine-800 hover:!bg-wine-800 hover:!text-champagne-50',
        },
        {
          color: 'primary',
          variant: 'ghost',
          class: '!text-wine-800 hover:!bg-wine-50',
        },
      ],
      defaultVariants: {
        size: 'lg',
      },
    },
  },
})
