<script>
    export let chains

    let schemes = []

    $: {
        schemes = chains.map(chain=> chain.schstr || '')
    }

    $: {
        // console.log('_$:pretty_schemes', chains)
    }

</script>


<ul>
    {#each schemes as scheme, index}
        <li on:click lidx={index} class="scheme">{@html scheme}</li>
    {/each}
</ul>
