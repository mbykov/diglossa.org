
import { writable } from "svelte/store";
import { browser } from "$app/environment";

export const clip = writable('');

// export const chunkIdx = writable(0);

//string
export const textChunk = writable(
    (browser && localStorage.getItem("textChunk")) || '[["ἀντιπαραγράφω"]]'
);

textChunk.subscribe((val) => browser && (localStorage.textChunk = val));

//string
export const currentClip = writable(
    (browser && localStorage.getItem("currentClip")) || 'παραγράφω'
);

currentClip.subscribe((val) => browser && (localStorage.currentClip = val));

export const chunkIdx = writable(
    (browser && localStorage.getItem("chunkIdx")) || '0'
);

chunkIdx.subscribe((val) => browser && (localStorage.chunkIdx = val));
