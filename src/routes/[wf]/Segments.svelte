<script>
  export let segments
  $: console.log('_SGS', segments)

</script>

<div class="bg-gray-100 px-4">

  {#each Object.entries(segments) as [segs, chain]}
      <p>
      {#each chain as seg}
        {#if (seg.cdicts || seg.pref)}
          <span class="px-1 seg">{seg.seg}</span>
        {:else}
          <span class="px-1">{seg.seg}</span>
        {/if}
      {/each}
      </p>
  {/each}

</div>
