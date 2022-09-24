<script>

  export let wf
  export let chains
  let chain, mainseg, indecl, cdicts = []
  $: {
      chain = chains[0]
      mainseg = chain.find(seg=> seg.mainseg)
      indecl = chain.find(seg=> seg.indecl)
      console.log('_IND', indecl)
      if (mainseg) {
          cdicts = mainseg.cdicts
      } else if (indecl) {
          cdicts = indecl.cdicts
      }
  }

  function kuku(ev) {
      // console.log('KU-KU', ev.detail)
      let seg = ev.detail
      if (ev?.detail?.cdicts) cdicts = ev.detail.cdicts
      else if (ev?.detail?.pref) cdicts = [ev.detail.pref]
      // console.log('_CCCC', cdicts)
  }

  import PrettyFLS from './PrettyFLS.svelte'
  import Schemes from './Schemes.svelte'
  import Cdicts from './Cdicts.svelte'

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
      <Schemes {chains} on:segment={kuku} />
    </div>
  </div>

</div>

{#key (cdicts)}
<Cdicts {cdicts}  />
{/key}
