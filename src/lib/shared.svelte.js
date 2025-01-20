import { LocalStorage } from "./storage.svelte";

export const locale = new LocalStorage("deflocale", 'en');
