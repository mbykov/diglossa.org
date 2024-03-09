<script>
    import Cdict from './Cdict.svelte'
    export let rels

    let stem = rels[0].stem
    // console.log('REL', rels)

</script>

<div>
    <div class="text-xl font-semibold "><span class="text-amber-700">Relatives</span>, stem: <span>{stem}</span> </div>
    <div class="cdicts">
        {#each rels as cdict}
            <Cdict {cdict} />
        {/each}
    </div>

</div>
