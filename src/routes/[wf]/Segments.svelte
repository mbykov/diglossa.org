<script>
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  export let segments
  $: console.log('_SGS', segments)

  function showDicts(seg) {
    console.log('_CHILD showDicts', seg)
    dispatch('segment', seg)
  }

</script>

<div class="bg-gray-100 px-4">

  {#each Object.entries(segments) as [segs, chain]}
      <p>
      {#each chain as seg}
        {#if (seg.cdicts || seg.pref)}
          <span class="px-1 seg" on:click={showDicts(seg)}>{seg.seg}</span>
        {:else}
          <span class="px-1">{seg.seg}</span>
        {/if}
      {/each}
      </p>
  {/each}

</div>
