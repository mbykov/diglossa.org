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
      <Schemes {chains}  />
    </div>
  </div>

</div>

      <Cdicts {cdicts}  />
