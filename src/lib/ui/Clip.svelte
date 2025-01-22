<script>
    import { chunks, locale } from "$lib/shared.svelte";
    import { Button } from 'flowbite-svelte';

    const log = console.log

    log('_CLIP chunks.current', chunks.current)
    // const target_copy = Object.assign({}, chunks.current);
    // log('_CLIP target_copy', target_copy[0])

    let stexts = JSON.parse(JSON.stringify(chunks.current))
    log('_CLIP stexts', stexts)

    // let newchunk = stexts.find(chunk=> chunk.new)
    // log('_CHUNK NEW', newchunk)

    function saveCurrent(ev) {
        log('______________________saveCurrent')
        // chunks.current.push(newchunk)
        // goto('/texts')
    }



</script>

<div class="p-4" >
    <Button color="green" class="float-right" on:click={saveCurrent}>Save</Button>
    <div id="clip-results" >
        CLIP clip-results stexts ===================== {stexts.length}
    </div>
</div>
