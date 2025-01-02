import tailwindTheme from '@customafk/lunas-ui/tailwindTheme'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/libs/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@customafk/lunas-ui/dist/**/*.js',
  ],
  theme: {
    extend: {
      ...tailwindTheme,
      backgroundImage: {
        'gradient-to-br':
          'linear-gradient(110deg, #9CD5F5 3.09%, #B1B8E6 33.47%, rgba(185, 155, 215, 0.90) 62.82%, #A293DF 84.45%, #878AEA 106.08%)',
        ...tailwindTheme.backgroundImage,
      },
      fontSize: {
        ...(tailwindTheme.fontSize as any),
        '2xs': '0.625rem',
      },
      spacing: {
        '104': '26rem',
      },
      container: {
        center: true,
        screens: {
          desktop: '1120px',
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
export default config
