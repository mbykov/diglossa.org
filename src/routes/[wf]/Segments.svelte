<script>
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  export let segments

  function showDicts(seg) {
    dispatch('segment', seg)
  }

</script>

<div class="bg-gray-100 px-4">

  {#each Object.entries(segments) as [segs, chains]}
      {#each chains as chain}
    <p class="segments together">
        {#each chain as seg, idx}
          {#if (seg.cdicts || seg.pref)}
            <span class="seg" on:click={showDicts(seg)}>{seg.seg}</span>
          {:else}
            <span class="">{seg.seg}</span>
          {/if}
          {#if (idx < chain.length -1)}
            <span class="">-</span>
          {/if}
        {/each}
      </p>
        {/each}
    {/each}

</div>
