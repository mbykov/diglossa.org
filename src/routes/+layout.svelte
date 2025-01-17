<script>
	import '../app.css';
    import { ParaglideJS } from "@inlang/paraglide-sveltekit"
    import { i18n } from "$lib/i18n.js"
    import Header from "$lib/ui/Header.svelte"

    export const prerender = true
    const log = console.log
	let { children } = $props();

</script>

<div class="flex flex-col min-h-screen p-4">

    <ParaglideJS {i18n}>
        <Header />
        <div class="flex flex-row flex-grow bg-gray-200 ">

            <left class="w-1/2 p-4 bg-gray-300 hidden sm:block">left, texts</left>

            <main class="w-1/2 p-4">
                Content
	            {@render children()}
            </main>

        </div>

    </ParaglideJS>

    <footer class="bg-gray-100 p-1">Footer</footer>
</div>
