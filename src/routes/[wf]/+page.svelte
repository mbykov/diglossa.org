<script>

  import { onMount, setContext, getContext } from 'svelte'
  import { goto } from '$app/navigation';
  import _ from 'lodash'

  import ClipContent from './ClipContent.svelte'
  import Compounds from '../examples/Compounds.svelte'


  import Main from './Main.svelte'
  import NoResult from './NoResult.svelte'
  import Cdicts from './Cdicts.svelte'

  import Forms from './Forms.svelte'
  import Cognates from './Cognates.svelte'

  import { clip } from '$lib/store.js';

  // const log = console.log
  // console.log('_CLIP', $clip)

  const addpops = {
      forms: Forms,
      cognates: Cognates
  }

  let clipkey = ''

  export let data
  $: console.log('_[WF]: data', data)

  let wf = ''
  let chains = []

  let mainpop
  let body

  const mainpops = {
      main: Main,
      nores: NoResult
  }

  // const bodies = {
  //     compounds: Compounds,
  //     // nores: NoResult
  // }


  $: {
      chains = data.chains
      let chain = data.chains[0]
      wf = data.wf
      mainpop = (chain) ? mainpops.main : mainpops.nores
      if (wf == 'compounds') mainpop = null
      // if (wf == 'compounds') body = bodies.compounds
  }


  function showDicts_(seg) {
      let segment = seg.detail
      cdicts = segment.cdicts || [segment.pref]
      cognates = segment.cognates
  }

  async function handleClick(ev) {
      let owf = ev.target
      if (!owf.classList.contains('wf')) return

      wf = owf.textContent
      if (!wf) return
      goto(wf)
  }

  onMount(async () => {
      let oclip = document.querySelector('#clip-results')
      if (!oclip.textContent) {
          clipkey = 'empty-clip'
      }
  })



</script>

<div class="flex h-full bg-[#F7F6EE]">
  <div class="w-2/5 p-4">

    <div class="overflow-y-auto">
      <div id="clip-results" class="px-8" on:click={handleClick} >
        {#if ($clip)}
          {@html $clip}
        {/if}
        <!-- {#key clipkey} -->
        <!-- <\!-- <svelte:component this={ClipContent} /> -\-> -->
        <!-- {/key} -->

          <!-- <svelte:component this={body} {wf}/> -->

      </div>
    </div>
  </div>

  <div class="flex flex-col w-3/5 overflow-y-auto px-8 ">
    <!-- <p>RIGHT========================</p> -->
  </div>
</div>


<svelte:component this={mainpop} {wf} {chains}/>


<style>
</style>
