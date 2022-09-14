<script>

  import { goto } from '$app/navigation';
  // import Anthrax from '../Anthrax.svelte'
  // import Examples from '../Examples.svelte'
  import Segments from './Segments.svelte'
  import PrettyFLS from './PrettyFLS.svelte'
  import Cdicts from './Cdicts.svelte'
  import _ from 'lodash'

  const log = console.log

  export let data
  $: chains = data.chains
  $: wf = data.wf

  $: chain = chains[0]
  $: console.log('_[WF]:', wf, '[CHAIN]', chain)

  $: fls = chain.find(seg=> seg.fls).fls

  $: segments = data.segments
  // $: console.log('_[WF-segs]:', segments)
  // $: cdicts = _.flatten(chains.map(chain=> chain.find(seg=> seg.mainseg).cdicts))
  $: cdicts = chain.find(seg=> seg.mainseg).cdicts
  // $: cogns = _.flatten(chains.map(chain=> chain.find(seg=> seg.mainseg).cognates))
  $: cognates = chain.find(seg=> seg.mainseg).cognates

  $: console.log('_cdicts:', cdicts)
  $: console.log('_cognates:', cognates)
  $: console.log('_fls:', fls)

  $: cdicts = []
  function xxxx(seg) {
    let segment = seg.detail
    console.log('_PARENT showDicts', segment)
    cdicts = segment.cdicts
  }


 async function handleClick(ev) {
     log('_HC')
     let owf = ev.target
     if (!owf.classList.contains('wf')) return
     wf = owf.textContent
     if (!wf) return
     let oresults = document.querySelector('#anthrax-results')
     oresults.innerHTML = ''
     goto(wf)
 }

</script>

<div class="flex h-full bg-[#F7F6EE]">
  <div class="w-2/5 p-4">

            <div class="overflow-y-auto">
                <div id="clip-results" class="px-8" on:click={handleClick}>
                </div>
            </div>
        </div>

        <div class="flex flex-col w-3/5 overflow-y-auto px-8 ">
            <!-- <p>RIGHT========================</p> -->
            <p id="anthrax-results" class="px-8">anthrax-results</p>
        </div>

</div>

    <div id="popup-morph" class="absolute w-1/2 right-4 top-4 -my-4 h-screen p-4 pr-1">
      <div class="h-full bg-[#FAFAD2] shadow-2xl overflow-y-auto">
        <div class="main-title text-right px-2">
            <span class="dict">wkt</span> <span class="dict">dvr</span> <span class="esc w-1/3 text-right"> [x]</span>
        </div>

        <div class="wf px-4 text-green-600">wordform: <b>{wf}</b></div>

        <div class="title flex flex-cols px-4">
            <div class="wf w-1/3">
                <svelte:component this={PrettyFLS} {fls}  />
            </div>
            <div class="wf w-1/3">   </div>
            <div class="segs w-1/3 text-right">
                <svelte:component this={Segments} {segments} on:segment={xxxx} />
            </div>
        </div>

        <svelte:component this={Cdicts} {cdicts} {wf} />

        <!-- {#each chains as chain} -->
        <!--   <svelte:component this={Anthrax} {chain} {wf} /> -->
        <!-- {/each} -->
      </div>
    </div>

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
