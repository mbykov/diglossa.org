import typography from '@tailwindcss/typography';
import flowbitePlugin from 'flowbite/plugin'

/** @type {import('tailwindcss').Config} */
export default {
  // content: ['./src/**/*.{html,js,svelte,ts}'],
    content: ['./src/**/*.{html,js,svelte,ts}',
              './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}',
              './node_modules/flowbite-svelte-icons/**/*.{html,js,svelte,ts}',
              './node_modules/svelte-5-ui-lib/**/*.{html,js,svelte,ts}',
             ],
  darkMode: 'selector',
  // theme: {
  //   extend: {}
  // },
    theme: {
        extend: {
            colors: {
                primary: { 50: '#FFF5F2', 100: '#FFF1EE', 200: '#FFE4DE', 300: '#FFD5CC', 400: '#FFBCAD', 500: '#FE795D', 600: '#EF562F', 700: '#EB4F27', 800: '#CC4522', 900: '#A5371B' },
                secondary: { "50": "#f0f9ff", "100": "#e0f2fe", "200": "#bae6fd", "300": "#7dd3fc", "400": "#38bdf8", "500": "#0ea5e9", "600": "#0284c7", "700": "#0369a1", "800": "#075985", "900": "#0c4a6e" },
                'maroon': '#800000',
                'gainsboro': '#dcdcdc',
            }
        }
    },

// screens: {
//   'sm': '640px',
//   // => @media (min-width: 640px) { ... }

//   'md': '768px',
//   // => @media (min-width: 768px) { ... }

//   'lg': '1024px',
//   // => @media (min-width: 1024px) { ... }

//   'xl': '1280px',
//   // => @media (min-width: 1280px) { ... }

//   '2xl': '1536px',
//   // => @media (min-width: 1536px) { ... }
// },

    plugins: [typography, flowbitePlugin]
};
