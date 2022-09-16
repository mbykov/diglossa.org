<script>

  import { onMount } from 'svelte'
  import { goto } from '$app/navigation';
  // import Anthrax from '../Anthrax.svelte'
  // import Examples from '../Examples.svelte'
  import Main from './Main.svelte'

  // import Segments from './Segments.svelte'
  import PrettyFLS from './PrettyFLS.svelte'
  import Cdicts from './Cdicts.svelte'
  import Forms from './Forms.svelte'
  import ClipContent from './ClipContent.svelte'
  import _ from 'lodash'

  const log = console.log
  let clipkey = ''

  export let data

  onMount(async () => {
      let oclip = document.querySelector('#clip-results')
      if (!oclip.textContent) {
          clipkey = 'empty-click'
          log('_EMPTY CLIP', clipkey)
      }
  })

  // $: segments = data.segments
  $: cdicts = data.cdicts

  $: chains = data.chains
  $: wf = data.wf
  $: console.log('_[WF]:', wf, '[CHAIN]', chains.length)

  $: chain = chains[0]
  $: mainseg = chain.find(seg=> seg.mainseg)
  $: console.log('_mainseg:', mainseg)

  $: cognates = mainseg ? mainseg.cognates : []
  $: console.log('_cognates:', cognates)
  $: probe = cdicts.find(cdict=> cdict.dname == 'wkt') || cdicts[0]
  $: console.log('_PROBE', probe)


  // $: console.log('_cdicts:', cdicts)

  $: cdicts = data.cdicts

  function showCdicts(seg) {
      let segment = seg.detail
      console.log('_PARENT showDicts', segment)
      cdicts = segment.cdicts || [segment.pref]
  }

    let forms = []

  // function showCognates(cdict) {
  //     // let cognates = cdict.cognates
  //     console.log('_PARENT COGNATES', cognates)
  // }

 async function handleClick(ev) {
     let owf = ev.target
     if (!owf.classList.contains('wf')) return
     wf = owf.textContent
     if (!wf) return
     goto(wf)
 }

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

        {#if (mainseg)}
          <Main {chains} {wf} />
        {/if}

        <!-- <div class="title flex px-4"> -->
        <!--   <div class="w-1/2 px-4 text-green-600">wordform: <b>{wf}</b></div> -->
        <!--   <div class="w-1/2 px-4 text-right text-green-600 clickable cognates" > -->
        <!--     <span class="clickable forms px-2" title="key F">forms</span> -->
        <!--     <span class="clickable cognates" title="key C">cognates</span> -->
        <!--   </div> -->
        <!-- </div> -->

        <!-- <div class="title flex flex-cols px-4"> -->
        <!--     <div class="wf w-1/3"> -->
        <!--         <svelte:component this={PrettyFLS} {chain}  /> -->
        <!--     </div> -->
        <!--     <div class="wf w-1/3">   </div> -->
        <!--     <div class="segs w-1/3 text-right"> -->
        <!--         <svelte:component this={Segments} {segments} on:segment={showCdicts} /> -->
        <!--     </div> -->
        <!-- </div> -->

        <svelte:component this={Cdicts} {cdicts}  />

      </div>
    </div>

    {#key cognates}
    <div id="popup-cognates" class="hidden popup absolute w-1/3 right-4 top-4 -my-4 h-screen p-4 pr-1">
      <div class="h-full bg-[#EBEBCC] shadow-2xl overflow-y-auto">
        <div class="main-title text-right px-2">
            <span class="esc w-1/3 text-right"> [x]</span>
        </div>

        <div class="wf px-4 text-green-600">cognates: <b>{wf}</b></div>

        <svelte:component this={Cdicts} {cognates}   />

      </div>
    </div>
    {/key}

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
