export { matchers } from './client-matchers.js';

export const components = [
	() => import("../../src/routes/__layout.svelte"),
	() => import("../runtime/components/error.svelte"),
	() => import("../../src/routes/Anthrax.svelte"),
	() => import("../../src/routes/Fly-moveable.svelte"),
	() => import("../../src/routes/Fly.svelte"),
	() => import("../../src/routes/[wf].svelte"),
	() => import("../../src/routes/index-copy.svelte"),
	() => import("../../src/routes/index.svelte")
];

export const dictionary = {
	"": [[0, 7], [1]],
	"Anthrax": [[0, 2], [1]],
	"Fly-moveable": [[0, 3], [1]],
	"Fly": [[0, 4], [1]],
	"index-copy": [[0, 6], [1]],
	"[wf]": [[0, 5], [1], 1]
};