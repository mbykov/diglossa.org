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

    // async function handleClick(ev) {
    //     let owf = ev.target
    //     if (!owf.classList.contains('wf')) return

    //     let wf = owf.textContent
    //     if (!wf) return
    //     goto(wf)
    // }

    onMount(async () => {
        // console.log('_paste new chunk =====')
        // let oclip = document.querySelector('#clip-results')
        // if (!oclip) return
        // let lastText = $textChunk[$textChunk.length-1]
        // console.log('_WF lastText', lastText)

        // oclip.innerHTML = $textChunk
        // oclip.innerHTML = lastText

        // let ochunk = document.createElement('div')
        // let rows = lastText // .split("\n")
        // for (let row of rows) {
        //     let html = row.replace(/([^\p{P} \n]+)/ug, " <span class=\"wf\">$1</span>")
        //     let opar = document.createElement('p')
        //     opar.innerHTML = html
        //     ochunk.appendChild(opar)
        // }

        // oclip.replaceChildren(ochunk)

    })



</script>

<!-- <div class="h-full overflow-x-hidden flex w-full" on:click={handleClick}> -->
<!--     <div id="clip-results" class="container p-4 "> -->

<!--     </div> -->
<!--     <div class="container p-4"> -->

<!--         <Anthrax {chains} {wf} /> -->

<!--     </div> -->
<!-- </div> -->

        <Anthrax {chains} {wf} />
