<script>

  // import Cdict from './Cdict.svelte'
  import Cdicts from './Cdicts.svelte'
  import { onMount } from 'svelte'

  export let chains
  export let wf

  // $: console.log('_anthrax', wf, chains)
  $: visible = wf
  let showr = false
  let showf = false

  let chain
  let cdicts = []

  let lidx = 0
  let sidx = 0
  let schemes
  let relatives = []
  let forms = []


  $: {
      chain = chains[lidx] || []
      cdicts = chain.cdicts || []
      // console.log('_chain', chain)
      // console.log('_cdicts', cdicts)
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
        case 'r':
            showRels()
            break;
        case 'f':
            showForms()
            break;
        case '_x':
          break;
    }
  }

  function showRels() {
      relatives = chain.rels
      relatives = relatives.slice(0, 10)
      console.log('_showRels', relatives)
      showr = true
  }

  function showForms() {
      console.log('_showForms', chain)
      forms = [] //chain.rels
      showr = false
      showf = true
  }

</script>

<svelte:window on:keydown={onKeyDown} />


{#if visible}
<div class="m-2_ p-4_ shadow-md h-full h-screen overflow-scroll_ md:block_ "  >

  <div class="p-1 flex justify-between sticky_ border border-green-500 ">
    <div class="font-bold text-green-500">
      <span class="wordform">{wf}</span>
    </div>
    <div class="flex close-anthrax cursor-pointer " on:click={closeAnthrax}>
      <div>
        ===
      </div>
      <div>R-F   [x]</div>
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

  {#if showr}
    ==SHOW R ======================================
  <Cdicts cdicts={relatives} />
  {:else if showf}
    ==SHOW F ======================================
  {:else}
    <Cdicts {cdicts} />
  {/if}


  {#key wf}
  <!-- <Cdicts {cdicts} /> -->
  {/key}



</div>
{/if}
