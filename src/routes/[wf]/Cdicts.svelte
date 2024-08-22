<script>
  import Cdict from './Cdict.svelte'

  export let cdicts
  export let verbose

</script>


  <div id="cdicts" class="cdicts overflow-auto h-full w-full">
    {#each cdicts as cdict}
      <Cdict {cdict} {verbose} />
      <!-- cdict: {JSON.stringify(cdict)} -->
    {/each}
  </div>
