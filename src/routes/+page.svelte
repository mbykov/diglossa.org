<script>
    import { page } from '$app/state';
    import { Button } from 'flowbite-svelte';

    const log = console.log

    function pasteButton() {
        log('_paste_button')
    }

    function onPaste() {
        log('_on_paste')
    }

</script>

<svelte:window onpaste={onPaste} />


<div class="p-8">

    <h2 class="text-green-600 font-bold p-4"></h2>

    <p> 1. copy some ancient greek text (unicode, utf-8), anywhere </p>
    <p> 2. press control-v, as if you "paste" it here </p>
    <p> 2-a. or just press button "Paste" </p>
    <p class="py-4"> click on any word on the left panel </p>

    <p class="py-4">
        <Button color="green" class="float-right_ " on:click={pasteButton}>Paste</Button>
    </p>

</div>
