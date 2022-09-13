<script>
  export let segments
  $: console.log('_SGS', segments)
</script>

================ segments

<div class="bg-white">

  {#each Object.entries(segments) as [segs, chain]}
    <p>{segs}</p>
{/each}

</div>
