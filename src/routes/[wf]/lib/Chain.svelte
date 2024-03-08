<script>
    export let chain
    export let wf

    import Cdict from './Cdict.svelte'
    import { prettyFLS } from './pretty.js'

    let hidemore = true
    let cdicts = []
    let rels = []
    let fls = []
    let morphs = []
    let more = []
    let scheme = ''
    let pos = ''
    $: {
        // console.log('_$:CHAIN.svelte', chain)
        scheme = chain.map(segment=> segment.seg).join('-')
        let main = chain.find(segment=> segment.main)
        let indecl = chain.find(segment=> segment.indecl)
        if (main) {
            cdicts = main.cdicts, rels = main.rels, fls = chain.find(segment=> segment.fls).fls
            // console.log('_cdicts', cdicts)
            let probe = cdicts[0]
            // console.log('_PROBE', cdicts.length)
            pos = (probe.verb) ? 'verb' : 'name'
            morphs = prettyFLS(pos, fls)
        } else if (indecl) {
            pos = ''
            cdicts = indecl.cdicts
            let probe = indecl.cdicts[0]
            // console.log('_INDECL', probe)
            let fls = probe.fls
            if (fls) morphs = prettyFLS('name', fls)
            // console.log('_INDECL-MORPHS', morphs)
        }
    }

    function toggleTRNS(ev) {
        if (ev.shiftKey) return
        let target = ev.target
        if (target.classList.contains('trns')) {
            target.classList.toggle('overflow-y-auto')
            target.classList.toggle('max-h-24')
        }
    }

    function toggleMore(ev) {
        hidemore = !hidemore
    }

</script>

<div class="chain ">
    <div class="py-2 flex w-full justify-between">
        <div class="morphs">
            {#if morphs.length}
                <div class="bg-white p-2 px-8" on:click={toggleMore}>
                <ul class="morph">
                    {#each morphs as morph}
                        <li class=""> {morph} </li>
                    {/each}
                </ul>
                {#if more.length}
                    <ul class="morph" class:hidden={!hidemore}>
                        ...
                    </ul>
                {/if}
                <ul class="morph" class:hidden={hidemore}>
                    {#each more as morph}
                        <li class=""> {morph} </li>
                    {/each}
                </ul>
            </div>
          {/if}
    </div>

        <div class="scheme ">
            <span class="text-gray-400">scheme</span>: {scheme}
        </div>
    </div>
    {#each cdicts as cdict}
        <Cdict {cdict} toggle={toggleTRNS} {pos} />
    {/each}


</div>
