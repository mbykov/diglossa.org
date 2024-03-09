<script>
    export let wf
    export let chain
    export let sidx

    // import Cdict from './Cdict.svelte'
    import { prettyFLS } from './pretty.js'

    let hidemore = true
    let cdicts = []
    let rels = []
    let fls = []
    let morphs = []
    let more = []
    let pos = ''
    $: {
        // console.log('_$:CHAIN.svelte', chain)
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

<div class="cdicts">
    {#each cdicts as cdict}
        cdict: {pos}
        <!-- <Cdict {cdict} toggle={toggleTRNS} {pos} /> -->
    {/each}
</div>
