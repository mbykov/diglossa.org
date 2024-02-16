<script>
    import { onMount } from 'svelte'
    import { textChunk } from '$lib/store.js';
    import { goto } from '$app/navigation';

    let savedTexts = []
    try {
        savedTexts = JSON.parse($textChunk)
        // console.log('_savedTexts', savedTexts)
    } catch(err) {
        console.log('_can_not_parse savedTexts')
    }

    function handleClick(ev) {
        console.log('_CLICK', ev.target.getAttribute('index'))
    }

</script>

<div id="savedTexts" class="savedTexts pt-12 px-8" on:click={handleClick}>
    <div class="flex justify-between ">
        <div class="left font-bold text-pink-700">
            early pasted texts:
        </div>

        <div class="right font-bold cursor-pointer text-pink-700">
            <b>clear all</b>
        </div>
    </div>
    {#each savedTexts.reverse() as chunk, index}
      <div class="chunk ">
          <p class="cursor-pointer" index: {index}> - {chunk[0].slice(0,25)} ...</p>
        </div>
      {/each}
</div>
