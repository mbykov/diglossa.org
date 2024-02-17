//

import { writable } from "svelte/store";
import { browser } from "$app/environment";

export const clip = writable('');

//string
export const textChunk = writable(
    (browser && localStorage.getItem("textChunk")) || '[["ἀντιπαραγράφω"]]'
);
textChunk.subscribe((val) => browser && (localStorage.textChunk = val));
