import typography from '@tailwindcss/typography';
import flowbitePlugin from 'flowbite/plugin'

/** @type {import('tailwindcss').Config} */
export default {
  // content: ['./src/**/*.{html,js,svelte,ts}'],
  content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'],
  darkMode: 'selector',
  theme: {
    extend: {}
  },

    plugins: [typography, flowbitePlugin]
};
