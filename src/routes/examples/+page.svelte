
<script>

  import Clip from '../clip/+page.svelte';
  import { examples } from "$lib/examples"
  import { textChunk, chunkIdx } from '$lib/store.js';

  let example
  function handleChunk(ev) {
    let ochunk = ev.target.closest('.chunk')
    let exindex = ochunk.getAttribute('index') // *1 + 1
    example = examples[exindex]
    // console.log('_Ex', example)
  }


</script>


<div class="border-2 border-red-500 h-fit_ flex w-full justify-between gap-2 relative">

  <div class="p-4 border-2 md:w-1/2 overflow-auto">
    <Clip {example} />
  </div>


  <div class="md:w-1/2 w-full border-green-500_ absolute top-0 right-0 bg-white ">

    ==== EXAMPLES ====
    <div class="pt-12 font-bold text-pink-700">
      Examples:
    </div>
    <div id="examples" class=" px-8" >
      {#each examples as example, index}
        <div class="chunk " index: {index} on:click={handleChunk}>
          <p class="font-bold  text-pink-700" > {example.name} </p>
          {#each example.text.trim().split('\n').slice(0,3) as row}
            <p class="" > - {row} </p>
          {/each}
        </div>
      {/each}
    </div>

  </div>

</div>
