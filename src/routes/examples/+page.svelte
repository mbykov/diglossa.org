
<script>

  import Clip from '../clip/+page.svelte';
  import { examples } from "$lib/examples"
  import { textChunk, chunkIdx } from '$lib/store.js';

  let exindex
  let example
  function handleChunk(ev) {
    let ochunk = ev.target.closest('.chunk')
    exindex = ochunk.getAttribute('index') // *1 + 1
    example = examples[exindex]
    console.log('_Example', example)
  }

  console.log('_Ex', exindex, example)

</script>


<div class="h-fit_ flex w-full justify-between gap-2 relative">

  <div class="p-4 md:w-1/2 overflow-auto">
    <Clip {example} {exindex} />
  </div>


  <div class="md:w-1/2 w-full absolute_ top-0_ right-0 p-8">

    <h3 class="pl-4 text-xl font-medium text-gray-900 dark:text-white">Examples</h3>

    <div id="examples" class=" px-8" >
      {#each examples as example, index}
        <div class="chunk " index: {index} on:click={handleChunk}>
          <p class="font-bold text-pink-700 cursor-pointer" > {example.name} </p>
          <!-- {#each example.text.trim().split('\n').slice(0,3) as row} -->
            <!--   <p class="" > - {row} </p> -->
          <!-- {/each} -->
        </div>
      {/each}
    </div>

  </div>

</div>
