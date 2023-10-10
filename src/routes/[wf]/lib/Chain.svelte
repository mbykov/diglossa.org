<script>
    export let chain
    export let wf

    import Cdict from './Cdict.svelte'
    // import PrettyFLS from './PrettyFLS.svelte'
    import { prettyName, prettyVerb } from './pretty.js'

    let hidemore = true
    let cdicts = []
    let rels = []
    let fls = []
    let morph = {}
    let morphs = []
    let more = []
    let scheme = ''
    let pos = ''
    $: {
        scheme = chain.map(segment=> segment.seg).join('-')
        let main = chain.find(segment=> segment.main)
        let indecl = chain.find(segment=> segment.indecl)
        if (main) {
            cdicts = main.cdicts, rels = main.rels, fls = chain.find(segment=> segment.fls).fls
            let probe = cdicts[0]
            // console.log('_PROBE', probe)
            pos = (probe.verb) ? 'verb' : 'name'
            if (pos == 'name') morph = prettyName(fls)
            else if (pos == 'verb') morph = prettyVerb(fls)
            else morph = {}
        } else if (indecl) {
            pos = ''
            cdicts = indecl.cdicts
            let probe = indecl.cdicts[0]
            // console.log('_INDECL', probe)
            let fls = probe.fls
            if (fls) morph = prettyName(fls)
            else morph = {}
            // console.log('_INDECL-MORPH', morph)
        }
        if (!morph.morphs) morph.morphs = []
        if (!morph.more) morph.more = []

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
            {#if morph.morphs.length}
                <div class="bg-white p-2 px-8" on:click={toggleMore}>
                <ul class="morph">
                    {#each morph.morphs as morph}
                        <li class=""> {morph} </li>
                    {/each}
                </ul>
                {#if morph.more.length}
                    <ul class="morph" class:hidden={!hidemore}>
                        ...
                    </ul>
                {/if}
                <ul class="morph" class:hidden={hidemore}>
                    {#each morph.more as morph}
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
