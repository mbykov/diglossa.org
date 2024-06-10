<script>
    // import Cdict from './Cdict.svelte'
    // export let rels

    // let stem = rels[0].stem
    // console.log('REL', rels)

    let dicts = ['dict1', 'dict2']

</script>

<div>
    <div class="text-xl font-semibold "><span class="text-amber-700">Dictionaries</span> </div>
    <div class="cdicts">
        {#each dicts as dict}
            <!-- <Cdict {cdict} /> -->
        <p> {dict} </p>
        {/each}
    </div>

</div>
