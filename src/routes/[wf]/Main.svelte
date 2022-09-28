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

  let cognkey
  let formkey = {}
  let cdictskey
  const log = console.log

  const addpops = {
      forms: Forms,
       cognates: Cognates
   }
  let addpop

  $: {
      newcognates = []
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
          console.log('_INDECL', indecl)
          cdicts = indecl.cdicts
      }
  }

  function showSegment(ev) {
      let seg = ev.detail
      cdicts = seg.cdicts
      // mainseg = seg.mainseg // нельзя!
      newcognates = seg.cognates
      cdictskey = seg.seg
  }

  function onKeyDown(e) {
    if (!mainseg) return
    if (e.ctrlKey) return
	switch(e.key) {
	case 'c':
      cognates = (newcognates.length) ? newcognates : mainseg.cognates
      if (!cognates.length) return
      cognkey = {}
	  break;
	  case 'f':
      formkey = {}
      keys = probe.keys
	  break;
	case 'Escape':
      closeAll()
	  break;
	}
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

<div class="mainseg">
  <div class="title flex px-4">
      <div class="w-1/2 px-4 text-green-600 px-4">wordform: <b><span id="wordform">{wf}</span></b></div>
      <div class="w-1/2 px-4 text-right text-green-600 clickable cognates" >
          <span class="clickable forms px-2_" title="key F">forms</span>
          <span class="clickable cognates" title="key C">cognates</span>
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
{#if (Object.keys(keys).length)}
<Forms {probe} {wf} />
{/if}
{/key}

<svelte:window on:keydown={onKeyDown} />
