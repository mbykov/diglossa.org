<script>
    import { page } from '$app/state';
    import { Button } from 'flowbite-svelte';
    import { chunks } from "$lib/shared.svelte";
    import { textToChunk } from "$lib/textToChunk.js";
    // import { setContext } from 'svelte';
    // import { createEventDispatcher } from 'svelte';
    // const dispatch = createEventDispatcher();

	let { value = $bindable(), ...props } = $props();

    const log = console.log

    async function onButtonPaste(ev) {
        log('_paste_button')
        // const copiedText = ev.clipboardData.getData('text/plain');
        const text = await navigator.clipboard.readText();
        log('_paste_button text', text)
        if (!text) return
        let newchunk = textToChunk(text)
        if (!newchunk) return

        value = newchunk
    }

</script>

<svelte:window onpaste={onButtonPaste} />


<div class="p-8">

    <h2 class="text-green-600 font-bold p-4"></h2>

    <p> 1. copy some ancient greek text (unicode, utf-8), anywhere </p>
    <p> 2. press control-v, as if you "paste" it here </p>
    <p> 2-a. or just press button "Paste" </p>
    <p class="py-4"> click on any word on the left panel </p>

    <!-- <input bind:value={value} {...props} /> -->

    <p class="py-4">
        <Button color="green" class="float-right_ " onclick={onButtonPaste}>Paste</Button>
    </p>

</div>
