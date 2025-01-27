import { LocalStorage } from "./storage.svelte";

export const locale = new LocalStorage("deflocale", 'en');
export const chunks = new LocalStorage("chunks", []);
export const fontsize = new LocalStorage("fontsize", 'base');
