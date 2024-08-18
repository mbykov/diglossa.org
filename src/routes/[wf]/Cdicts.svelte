<script>
  import Cdict from './Cdict.svelte'

  export let cdicts

</script>


  <div id="cdicts" class="cdicts overflow-auto h-full " >
    {#each cdicts as cdict}
      <Cdict {cdict} />
      <!-- cdict: {JSON.stringify(cdict)} -->
    {/each}
  </div>
