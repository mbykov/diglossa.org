import {preprocessMeltUI, sequence} from "@melt-ui/pp";
import {mdsvex} from "mdsvex";
import adapter from "@sveltejs/adapter-node";
import {vitePreprocess} from '@sveltejs/vite-plugin-svelte';
/** @type {import('mdsvex').MdsvexOptions}*/
const mdsvexOptions = {
  extensions: ['.md']
};
/** @type {import('@sveltejs/kit').Config}*/
const config = {
  kit: {
    // adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
    // If your environment is not supported, or you settled on a specific environment, switch out the adapter.
    // See https://svelte.dev/docs/kit/adapters for more information about adapters.
    adapter: adapter()
  },
  alias: {
    'ru-about': 'about',
    'ru-about/*': 'about/*'
  },
  // preprocess: [mdsvex()],
  preprocess: sequence([vitePreprocess(), mdsvex(mdsvexOptions), preprocessMeltUI()]),
  extensions: [".svelte", ".svx", ".md"]
};
export default config;
