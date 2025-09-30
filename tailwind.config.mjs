/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', "Segoe UI", 'Roboto', "Helvetica Neue", 'Arial', "Noto Sans", 'sans-serif', "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"],
      },
      colors: {
        'gradient-start': '#0A0A1A', // Azul muy oscuro, casi negro
        'gradient-middle': '#1A1A3A', // Un azul oscuro intermedio
        'gradient-end': '#0A0A1A',   // Vuelve al azul muy oscuro para un gradiente sutil
      },
    },
  },
  plugins: [],
}
