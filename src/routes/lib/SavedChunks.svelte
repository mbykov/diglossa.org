<script>
    import { onMount } from 'svelte'
    import { textChunk, chunkIdx } from '$lib/store.js';
    // import { goto } from '$app/navigation';
    import { invalidateAll } from "$app/navigation";


    let selected

    $: if (textChunk) {
        // console.log('_textChunk CHANGED', textChunk)
        try {
            savedTexts = JSON.parse($textChunk) // .reverse()
            savedTexts = savedTexts
            // console.log('_CHUNKS_savedTexts', savedTexts)
        } catch(err) {
            console.log('_can_not_parse savedTexts')
        }
    }

    $: chunkIdx
        selected = $chunkIdx

    $: chunkIdx, console.log('_chunkIdx', chunkIdx)

    let savedTexts = []

    onMount(async () => {
        // console.log('_ON_MOUNT_CHUNKS ')
        try {
            savedTexts = JSON.parse($textChunk)
            savedTexts = savedTexts
            // console.log('_CHUNKS_savedTexts', savedTexts)
        } catch(err) {
            console.log('_can_not_parse savedTexts')
        }
    })

    function handleClear(ev) {
        // console.log('_CLICK CLEAR')
        let oclip = document.querySelector('#clip-results')
        textChunk.update(text => {
            text = ''
            return text
        });
        savedTexts = savedTexts
        oclip.replaceChildren()
        invalidateAll('/')
    }

    function handleChunk(ev) {
        let oclip = document.querySelector('#clip-results')
        if (!oclip) return
        let index = ev.target.getAttribute('index')
        // console.log('_CLICK INDEX', index)
        if (index < 0) return
        selected = index

        chunkIdx.update(idx => {
            idx = index
            return idx
        });

        // let currentRows = savedTexts[index]
        // savedTexts.splice(index, 1)
        // savedTexts.unshift(currentRows)
        // textChunk.update(text => {
        //     text = JSON.stringify(savedTexts)
        //     return text
        // });
        // savedTexts = savedTexts
        // oclip.replaceChildren()
        invalidateAll('/')
    }

    function removeChunk(ev) {
        let oclip = document.querySelector('#clip-results')
        if (!oclip) return
        let index = ev.target.getAttribute('index')
        console.log('_REMOVE INDEX', index)
        if (index < 0) return

        // let currentRows = savedTexts[index]
        // if (!currentRows) return
        // console.log('_currentRows', currentRows)
        let currentRows = savedTexts[index]
        savedTexts.splice(index, 1)
        // savedTexts.unshift(currentRows)
        textChunk.update(text => {
            text = JSON.stringify(savedTexts)
            return text
        });
        savedTexts = savedTexts
        oclip.replaceChildren()
        invalidateAll('/')
    }




</script>

<div id="savedTexts" class="savedTexts pt-12 px-8 " >
    <div class="flex justify-between pb-4">
        <div class="left font-bold text-pink-700">
            early pasted texts:
        </div>

        <div class="clearAll font-bold cursor-pointer text-pink-700" on:click={handleClear}>
            clear all
        </div>
    </div>
    {#each savedTexts as chunk, index}
      <div class="chunk flex justify-between {(index == selected) ? "bg-slate-200": ""}" >
          <p class="cursor-pointer" index: {index} on:click={handleChunk}> - {chunk[0].slice(0,25)} ...</p>
          <p class="cursor-pointer remove text-pink-700 pr-2" index: {index} on:click={removeChunk}> [x]</p>
      </div>
    {/each}


</div>
