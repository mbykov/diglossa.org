<script>
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  export let chains

  function eventSegment(seg) {
    dispatch('segment', seg)
  }

</script>

<div class="bg-gray-100 p-2">

  <ul class="morph">
  {#each chains as chain}
    <li class="segments together">
    {#each chain as seg, idx}
      {#if (seg.cdicts || seg.pref)}
        <span class="seg" on:click={eventSegment(seg)}>{seg.seg}</span>
      {:else}
        <span class="">{seg.seg}</span>
      {/if}
      {#if idx < chain.length-1 }
        <span class="">-</span>
      {/if}

    {/each}
  </li>
  {/each}
  </ul>

</div>
