<script>

  import Cdict from './Cdict.svelte'
  import { onMount } from 'svelte'

  export let chains
  export let wf
  // $: console.log('_anthrax', wf, chains)
  $: visible = wf

  let chain
  let cdicts = []
  let lidx = 0
  let sidx = 0

  $: {
    chain = chains[lidx] || []
    cdicts = chain.cdicts || []
  }

  onMount(async () => {
    chain = chains[0] || []
    cdicts = chain.cdicts
  })

  function closeAnthrax(ev) {
    console.log('_CLOSE')
    visible = false
  }

  function onKeyDown(ev) {
    switch(ev.key) {
        case 'Escape':
          visible = false
          break;
        case '_x':
          break;
    }
  }

</script>

<svelte:window on:keydown={onKeyDown} />


{#if visible}
<div class="m-2_ p-4_ shadow-md h-full h-screen overflow-scroll_ md:block_ "  >

  <div class="p-1 flex justify-between sticky_ border border-green-500 ">
    <div class="font-bold text-green-500">
      <span class="wordform">{wf}</span>
    </div>
    <div class="close-anthrax cursor-pointer " on:click={closeAnthrax}>
      R-F-dicts   [x]
    </div>
  </div>

  <div class="p-1 flex justify-between sticky_ border border-green-500 ">
    <div class="w-1/2_ border border-blue-500">

    </div>
    <div class="w-1/2_ cursor-pointer border border-blue-500" on:click={closeAnthrax}>
      <p>κα-καλ-έω</p>
      <p>κα-καλ-έω</p>
      <p>κα-καλ-έω</p>
    </div>
  </div>

  <!-- <div id="chains" class="h-full_ px-8_ border-red-500_ border_ overflow-auto overflow-scroll h-full " > -->
  <!--   {#each chains as chain, index} -->
  <!--     <div class="chain" index: {index} > -->
  <!--       <p class="text-pink-700" > {JSON.stringify(chain.probe)} </p> -->
  <!--     </div> -->
  <!--   {/each} -->
  <!-- </div> -->

  {#key wf}
  <div id="cdicts" class="cdicts overflow-auto h-full " >
    {#each cdicts as cdict}
      <Cdict {cdict} />
      <Cdict {cdict} />
      <Cdict {cdict} />
      <Cdict {cdict} />
      <Cdict {cdict} />
      <Cdict {cdict} />
      <Cdict {cdict} />
      <!-- cdict: {JSON.stringify(cdict)} -->
    {/each}
  </div>
  {/key}



</div>
{/if}
