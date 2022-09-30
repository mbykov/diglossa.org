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

  let html = ''

  const addpops = {
      forms: Forms,
      cognates: Cognates
  }
  let addpop

  const log = console.log
  let clipkey = ''

  export let data
  $: console.log('_[WF]: data', wf)
  let wf = ''
  let chains = []

  let mainpop
  let body

  const mainpops = {
      main: Main,
      nores: NoResult
  }

  const bodies = {
      compounds: Compounds,
      nores: NoResult
  }


  $: {
      // html = getContext('clippedHTM')
      // log('_GRT HTML', html)
      chains = data.chains
      let chain = data.chains[0]
      wf = data.wf
      log('_XXXXX', wf, chains)
      mainpop = (chain) ? mainpops.main : mainpops.nores
      if (wf == 'compounds') mainpop = null
      if (wf == 'compounds') body = bodies.compounds
  }


  function showDicts(seg) {
      let segment = seg.detail
      // console.log('_PARENT showDicts', segment)
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
          log('_EMPTY CLIP', clipkey)
      }
  })



</script>

<div class="flex h-full bg-[#F7F6EE]">
  <div class="w-2/5 p-4">

    <div class="overflow-y-auto">
      <div id="clip-results" class="px-8" on:click={handleClick} >
        <!-- {#if (html)} -->
          <!-- {@html html} -->
          <!-- {/if} -->
        <!-- {#key clipkey} -->
        <!-- <\!-- <svelte:component this={ClipContent} /> -\-> -->
        <!-- {/key} -->
          <svelte:component this={body} {wf}/>

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
