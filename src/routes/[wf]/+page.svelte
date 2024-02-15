<script>

    import { onMount } from 'svelte'
    import { goto } from '$app/navigation'
    import { textChunk } from '$lib/store.js'
    import Anthrax from './lib/Anthrax.svelte'

    export let data

    let wf = ''
    let chains = [] //, cdicts = []



     $: {
         chains = data.chains
         // console.log('_CHS', chains)
         wf = data.wf
     }

    async function handleClick(ev) {
        let owf = ev.target
        if (!owf.classList.contains('wf')) return

        let wf = owf.textContent
        if (!wf) return
        goto(wf)
    }

    onMount(async () => {
        let oclip = document.querySelector('#clip-results')
        if (!oclip) return
        oclip.innerHTML = $textChunk
    })



</script>

<div class="h-full overflow-x-hidden flex w-full" on:click={handleClick}>
    <div id="clip-results" class="container p-4 ">

    </div>
    <div class="container p-4">

        <Anthrax {chains} {wf} />

    </div>
</div>
