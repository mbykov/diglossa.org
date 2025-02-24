import { LocalStorage } from "./storage.svelte";

export const locale = new LocalStorage("deflocale", 'en');
export const chunks = new LocalStorage("chunks", []);
export const fontsize = new LocalStorage("fontsize", 'base');

let defaultDicts = [
    {key: 'wkt', lang: 'en', name: 'Wiktionary', active: true, href: 'https://en.wiktionary.org/wiki/Ancient_Greek'},
    {key: 'lsj', lang: 'en', name: 'Liddell, Sckott', active: true, href: 'https://perseids-project.github.io/lsj-js/'},
    {key: 'dvr', lang: 'ru', name: 'И.Х.Дворецкий', active: true, href: 'https://en.wiktionary.org/wiki/Ancient_Greek'},
    {key: 'bbh', lang: 'en', name: 'BibleHub', active: true, href: 'https://en.wiktionary.org/wiki/Ancient_Greek'},
    {key: 'bll', lang: 'fr', name: 'xx Bailly', active: false, href: 'https://en.wiktionary.org/wiki/Ancient_Greek'},
    {key: 'suda', lang: 'en', name: 'Souda', active: false, href: 'https://en.wiktionary.org/wiki/Ancient_Greek'},
]

export const odicts = new LocalStorage("dicts", []);
export const oexample = new LocalStorage("example", {});

// if (!odicts.current.length) odicts.current = defaultDicts
