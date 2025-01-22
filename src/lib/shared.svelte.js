import { LocalStorage } from "./storage.svelte";

export const locale = new LocalStorage("deflocale", 'en');
export const newChunk = new LocalStorage("newtext", '');
export const chunks = new LocalStorage("chunks", []);
