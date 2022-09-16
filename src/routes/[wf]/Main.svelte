<script>

  export let wf
  export let chains
  export let segments
  $: chain = chains[0]

  import Segments from './Segments.svelte'
  import PrettyFLS from './PrettyFLS.svelte'
  import Schemes from './Schemes.svelte'

</script>

<div class="mainseg">
  <div class="title flex px-4">
    <div class="w-1/2 px-4 text-green-600">wordform: <b>{wf}</b></div>
    <div class="w-1/2 px-4 text-right text-green-600 clickable cognates" >
      <span class="clickable forms px-2" title="key F">forms</span>
      <span class="clickable cognates" title="key C">cognates</span>
    </div>
  </div>

  <div class="title flex flex-cols px-4">
    <div class="wf w-1/3">
      <svelte:component this={PrettyFLS} {chain}  />
    </div>
    <div class="wf w-1/3">   </div>
    <div class="segs w-1/3 text-right">
      <!-- <svelte:component this={Segments} {segments} on:segment={showCdicts} /> -->
      <svelte:component this={Schemes} {chains} />
    </div>
  </div>

</div>
