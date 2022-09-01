export { matchers } from './client-matchers.js';

export const components = [
	() => import("../../src/routes/__layout.svelte"),
	() => import("../runtime/components/error.svelte"),
	() => import("../../src/routes/Anthrax.svelte"),
	() => import("../../src/routes/[wf].svelte"),
	() => import("../../src/routes/index.svelte"),
	() => import("../../src/routes/widgets/Cdict.svelte"),
	() => import("../../src/routes/widgets/Main.svelte"),
	() => import("../../src/routes/widgets/Term.svelte")
];

export const dictionary = {
	"": [[0, 4], [1]],
	"Anthrax": [[0, 2], [1]],
	"widgets/Cdict": [[0, 5], [1]],
	"widgets/Main": [[0, 6], [1]],
	"widgets/Term": [[0, 7], [1]],
	"[wf]": [[0, 3], [1], 1]
};