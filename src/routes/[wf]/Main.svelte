<script>

  import { onMount } from 'svelte'

  import PrettyFLS from './PrettyFLS.svelte'
  import Schemes from './Schemes.svelte'
  import Cdicts from './Cdicts.svelte'

  import Forms from './Forms.svelte'
  import Cognates from './Cognates.svelte'

  export let wf
  export let chains
  let chain, mainseg, probe, indecl, cdicts = [], cognates = [], keys = {}

  let newcognates = []
  let newprobe = {}

  let cognkey
  let formkey = null
  let cdictskey
  const log = console.log

  const addpops = {
      forms: Forms,
      cognates: Cognates
   }
  let addpop

  $: {
      newcognates = []
      newprobe = null
      chain = chains[0]
      mainseg = chain.find(seg=> seg.mainseg)
      indecl = chain.find(seg=> seg.indecl)
      if (mainseg) {
          cdicts = mainseg.cdicts
          // cognates = mainseg.cognates
          cdictskey = mainseg.seg
          probe = mainseg.cdicts.find(cdict=> cdict.dname == 'wkt') || mainseg.cdicts[0]
      } else if (indecl) {
          cognates = []
          cdicts = indecl.cdicts
      }
  }

  function showSegment(ev) {
      formkey = null
      let seg = ev.detail
      if (!seg) return
      let pref = {}
      if (seg.pref) {
          pref = seg.pref
          cdicts = [pref]
      } else if (seg.cdicts) {
          cdicts = seg.cdicts
      }
      if (!cdicts) return
      // mainseg = seg.mainseg // нельзя!
      newcognates = seg.cognates
      cdictskey = seg.seg
      newprobe = cdicts.find(dict=> dict.dname == 'wkt') || cdicts[0]
  }

  function onKeyDown(e) {
      if (!mainseg) return
      if (e.ctrlKey) return
      switch(e.key) {
      case 'c':
          if (!newcognates) return
          cognates = (newcognates.length) ? newcognates : mainseg.cognates
          if (!cognates.length) return
          cognkey = {}
          break;
      case 'f':
          if (!probe) return
          if (newprobe) probe = newprobe
          if (!probe.keys) return
          formkey = {}
          break;
    case 'Escape':
          closeAll()
          break;
      }
  }

  async function showCognates(ev) {
      let owf = ev.target
      if (!ev.target.classList.contains('cognates')) return
      console.log('_CLICK COGN XXXXXXXXXXXXXXXXXXXXXXXXxxx')
      if (!newcognates) return
      cognates = (newcognates.length) ? newcognates : mainseg.cognates
      if (!cognates.length) return
      cognkey = {}
  }

  function closeAll() {
      let oforms = document.querySelector('#popup-forms')
      if (oforms && !oforms.classList.contains('hidden')) {
          oforms.classList.add('hidden')
      }

      let ocogns = document.querySelector('#popup-cognates')
      if (ocogns && !ocogns.classList.contains('hidden')) {
          ocogns.classList.add('hidden')
      }
  }

</script>

<div id="popup-morphs" class="popup absolute w-1/2 right-4 top-4 -my-4 h-screen p-4 pr-1">
  <div class="h-full bg-[#FAFAD2] shadow-2xl overflow-y-auto">

    <div class="main-title text-right px-2">
      <span class="dict">wkt</span> <span class="dict">dvr</span> <span class="esc w-1/3 text-right"> [x]</span>
    </div>



<div class="mainseg">
  <div class="title flex px-4">
      <div class="w-1/2 px-4 text-green-600 px-4">wordform: <b><span id="wordform">{wf}</span></b></div>
      <div class="w-1/2 px-4 text-right text-green-600 clickable cognates" >
          <span class="clickable forms px-2_" title="key F">forms</span>
          <span class="clickable cognates" title="key C" on:click={showCognates}>cognates</span>
      </div>
  </div>

  <div class="title flex flex-cols p-4">
    <div class="wf w-1/3">
        <PrettyFLS {chain} />
    </div>
    <div class="wf w-1/3">   </div>
    <div class="segs w-1/3 text-right">
      <Schemes {chains} on:segment={showSegment} />
    </div>
  </div>
</div>

{#key cdicts}
<Cdicts {cdicts}  />
{/key}

{#key cognkey}
{#if (cognates.length)}
<Cognates {cognates} {wf} />
{/if}
{/key}

{#key formkey}
<!-- {#if (formkey && probe && probe.keys && Object.keys(probe.keys).length)} -->
{#if (formkey && probe && probe.keys)}
<Forms {probe} {wf} />
{/if}
{/key}




  </div>
</div>



<svelte:window on:keydown={onKeyDown} />
