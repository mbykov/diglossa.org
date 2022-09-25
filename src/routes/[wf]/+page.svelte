<script>

  import { onMount } from 'svelte'
  import { goto } from '$app/navigation';
  import _ from 'lodash'

  import ClipContent from './ClipContent.svelte'

  import Main from './Main.svelte'
  import NoResult from './NoResult.svelte'
  import Cdicts from './Cdicts.svelte'

  import Forms from './Forms.svelte'
  import Cognates from './Cognates.svelte'

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

  const mainpops = {
      main: Main,
      nores: NoResult
  }

  $: {
      chains = data.chains
      let chain = data.chains[0]
      wf = data.wf
      mainpop = (chain) ? mainpops.main : mainpops.nores
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
        {#key clipkey}
        <svelte:component this={ClipContent} />
        {/key}
      </div>
    </div>
  </div>

  <div class="flex flex-col w-3/5 overflow-y-auto px-8 ">
    <!-- <p>RIGHT========================</p> -->
  </div>
</div>


<div id="popup-morphs" class="popup absolute w-1/2 right-4 top-4 -my-4 h-screen p-4 pr-1">
  <div class="h-full bg-[#FAFAD2] shadow-2xl overflow-y-auto">

    <div class="main-title text-right px-2">
      <span class="dict">wkt</span> <span class="dict">dvr</span> <span class="esc w-1/3 text-right"> [x]</span>
    </div>

    <svelte:component this={mainpop} {wf} {chains}/>

  </div>
</div>



<style>
</style>
