<script>
    import { createEventDispatcher } from 'svelte'
    const dispatch = createEventDispatcher()

    export let chains
    console.log('_SCHEMES', chains)

    function eventSegment(seg) {
        dispatch('segment', seg)
    }

</script>

<div class="bg-gray-100 p-2">

    <ul class="morph">
        {#each chains as chain, idy}
            <li class="segments together">
                {#each chain as seg, idx}
                    {#if (seg.pref && !seg.main)}
                        <span class="seg" on:click={eventSegment(seg)}>{seg.pref} -</span>
                        {#if (seg.conn)}
                            <!-- -<span class="seg" on:click={eventSegment(seg)}>{seg.conn}</span> -->
                        {/if}
                    {/if}
                    {#if (seg.main)}
                        <span class="seg" on:click={eventSegment(seg)}>{seg.cdicts[0].rdict}</span>
                    {:else if (seg.fls)}
                        <!-- <span class="">{seg.seg}</span> -->
                    {/if}
                    {#if idx < chain.length-1 }
                        <span class=""> &nbsp;</span>
                    {/if}

                {/each}
            </li>
        {/each}
    </ul>

</div>
