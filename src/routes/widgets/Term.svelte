<script>
  export let term
  // $: console.log('_TERM-term', term)
  import Cdict from './Cdict.svelte'

</script>

<div>
  <div class="title flex flex-cols ">
      <div class="wf w-1/2 text-green-500"><b>{term.seg}</b></div> <div class="segs w-1/2 text-right"></div>
    </div>

  {#each term.cdicts as cdict}
    <svelte:component this={Cdict} {cdict}  />
  {/each}

</div>
