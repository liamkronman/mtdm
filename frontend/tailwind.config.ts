import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'dm-sans': ['var(--font-dm-sans)', 'sans-serif'],
        'kanit': ['var(--font-kanit)', 'sans-serif'],
        'dm-mono': ['var(--font-dm-mono)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config 