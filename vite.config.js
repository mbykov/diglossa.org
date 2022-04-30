const { appConfig } = require('./package.json')
const viteMainJs = require('vite-main-js')
const slug = require('remark-slug')
const tailwind = require('tailwindcss')
const postcssImport = require('postcss-import')
const { mdsvex } = require('mdsvex')
const autoPreprocess = require('svelte-preprocess')
const { svelte } = require('@sveltejs/vite-plugin-svelte')
const { port } = appConfig
const production = process.env.NODE_ENV === 'production'
module.exports = {
  server: {
    port: port,
  },
    build: {
        commonjsOptions: {
            include: [/linked-dep/, /node_modules/]
        },
        polyfillModulePreload: false,
        cssCodeSplit: false,
    },
    optimizeDeps: {
        exclude: ['@roxi/routify'],
    },
    resolve: {
        dedupe: ['@roxi/routify'],
    },
    plugins: [
        viteMainJs(),
        svelte({
      preprocess: [
        mdsvex({
          remarkPlugins: [slug],
          layout: {
            blog: 'src/components/Card.svelte',
          },
          extension: 'md',
        }),
        autoPreprocess({
          postcss: {
            plugins: [
              tailwind({
                mode: 'jit',
                darkMode: 'class',
                future: {
                  removeDeprecatedGapUtilities: true,
                  purgeLayersByDefault: true,
                },
                plugins: [],
                purge: {
                  content: ['./src/**/*.svelte'],
                  enabled: production,
                },
              }),
              postcssImport,
            ],
          },
        }),
      ],
      emitCss: true,
      hot: !production,
      extensions: ['.md', '.svelte'],
    }),
  ],
}
