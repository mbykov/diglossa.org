<script>
    export let chains
    export let wf
    // import Chain from './Chain.svelte'
    import Cdict from './Cdict.svelte'
    import PrettyScheme from './PrettyScheme.svelte'

    let cdicts = []
    let pos = 'name'

    $: {
        console.log('_$:cdicts', cdicts)
        chain = chains[lidx]
        if (chain) cdicts = parseCdicts(chain)
        else console.log('_no_chain', wf)
    }

    let lidx = 0
    let sidx = 0
    $: chain = chains[lidx]

    function showSegment(ev) {
        if (!ev.target) return
        let parent = ev.target.closest('.scheme')
        if (!parent) return
        let lidx = parent.getAttribute('lidx')
        let sidx = ev.target.getAttribute('sidx')
        console.log('_seg', ev.target.textContent, lidx, sidx)
        chain = chains[lidx]
        cdicts = parseCdicts(chain)
    }

    function parseCdicts(chain) {
        let cdicts = []
        let main = chain.find(segment=> segment.main)
        // console.log('_MAIN', !!main)
        let indecl = chain.find(segment=> segment.indecl)
        if (main) {
            cdicts = main.cdicts // , rels = main.rels, fls = chain.find(segment=> segment.fls).fls
            // console.log('_cdicts', cdicts)
            let probe = cdicts[0]
            console.log('_PROBE', probe.rdict)
            pos = (probe.verb) ? 'verb' : 'name'
            // morphs = prettyFLS(pos, fls)
        } else if (indecl) {
            pos = ''
            cdicts = indecl.cdicts
            // let probe = indecl.cdicts[0]
            // let fls = probe.fls
            // if (fls) morphs = prettyFLS('name', fls)
            // console.log('_INDECL-MORPHS', morphs)
        }

        return cdicts
    }

</script>

<!-- =============== ANTHRAX ========== -->

<div class="h-full bg-[#FAFAD2] shadow-2xl overflow-y-auto px-4">
    <div class=" p-2 my-4 bg-white  flex justify-between ">
        <div class="">
            <span class="wordform font-bold text-amber-700">{wf}</span>
        </div>
        <div class="">
            dictionaries
        </div>
    </div>

    <div class="flex justify-between py-4">
        <div class="pretty-morphs bg-white p-4">
            pretty-morphs
        </div>
        <div class="pretty-scheme bg-white p-4">
            <PrettyScheme {chains} on:click={showSegment}/>
        </div>
    </div>

    <!-- <Chain { chain } {wf} /> -->
    <div class="cdicts">
        {#each cdicts as cdict}
            <Cdict {cdict} {pos} />
        {/each}
    </div>

</div>
