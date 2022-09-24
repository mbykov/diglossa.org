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

  const log = console.log
  let clipkey = ''

  export let data
  $: console.log('_[WF]: data', data)
  let wf = ''
  let chains = []
  let mainpop

  const addpops = {
      forms: Forms,
      cognates: Cognates
  }

  const mainpops = {
      main: Main,
      nores: NoResult
  }

  $: {
      chains = data.chains
      let chain = data.chains[0]
      wf = data.wf
      log('_XXX', wf, chain)
      mainpop = (chain) ? mainpops.main : mainpops.nores
  }

  // let cognshow = false
  // let cognkey = {}

  //  $: cdicts = data.cdicts

 //  $: wf = data.wf
 //  $: chains = data.chains || []
 //  $: console.log('_[WF]:', wf, '[CHAIN]', chains, '<=')

 //  $: if (data.chains?.length) {
 //    // let chain = data.chains[0] || []
 //    // let mainseg = chain.find(seg=> seg.mainseg)
 //    // // $: console.log('_mainseg:', mainseg)
 //    // let cognates = mainseg ? mainseg.cognates : []
 //    // // $: console.log('_cognates:', cognates)
 //  }

 // $: probe = cdicts.find(cdict=> cdict.dname == 'wkt') || cdicts[0]
 //  // $: console.log('_PROBE', probe)
 //  // $: console.log('_cdicts:', cdicts)

 // /* $: cdicts = data.cdicts */

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

      document.body.addEventListener("keydown", function(e) {
          // let key = e.which || e.keyCode; // keyCode detection // v = 67
          if (e.key == 'Escape_') {
              closeAll()
          } else if (e.key == 'c') {
              if (e.ctrlKey) return
              log('___C KEY')
              if (!chain) return
              cognkey = {}
              let ocogns = document.body.querySelector('#popup-cognates')
              if (ocogns) ocogns.classList.remove('hidden')
              cognshow = true
          } else if (e.key == 'f') {
              let oforms = document.body.querySelector('#popup-forms')
              if (oforms) oforms.classList.remove('hidden')
          }
      }, false);
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


{#if (false && cognshow)}
  {#key (cognkey)}
<Cognates {cognates} {wf} />
{/key}
{/if}

{#if false}
  {#key probe}
    <div id="popup-forms" class="hidden popup absolute w-1/4 right-4 top-4 -my-4 h-screen p-4 pr-1">
      <div class="h-full bg-[#E1E1C2] shadow-2xl overflow-y-auto">
        <div class="main-title text-right px-2">
            <span class="esc w-1/3 text-right"> [x]</span>
        </div>

        <div class="wf px-4 text-green-600">forms: <b>{wf}</b></div>

        <svelte:component this={Forms} {probe}   />

      </div>
    </div>
    {/key}

{/if}

<style>
 .esc {
   color: maroon;
   cursor: pointer;
 }
 .dict {
   color: maroon;
   cursor: pointer;
 }
</style>
