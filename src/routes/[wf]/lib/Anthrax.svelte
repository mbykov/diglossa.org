<script>
    export let chains
    export let wf
    // import Chain from './Chain.svelte'
    import Cdict from './Cdict.svelte'
    import Relatives from './Relatives.svelte'
    import PrettyScheme from './PrettyScheme.svelte'
    import { onMount } from 'svelte'

    let cdicts = []
    let rels = []
    let chain = []
    let urel = false
    // let pos = 'name'

    let lidx = 0
    let sidx = 0

    $: {
    chain = chains[lidx]
        if (chain) cdicts = parseCdicts(chain)
        else {
            cdicts = []
            console.log('_no_chain', wf)
        }
        urel = false
        // if (chain) console.log('_new_cdicts ', cdicts)
    }


    onMount(async () => {
        chain = chains[0]
        if (chain) cdicts = parseCdicts(chain)
        else console.log('_no_chain', wf)
        // if (chain) console.log('_mount_cdicts ', cdicts)
    })


    function showSegment(ev) {
        if (!ev.target) return
        let parent = ev.target.closest('.scheme')
        if (!parent) return
        lidx = parent.getAttribute('lidx')
        sidx = ev.target.getAttribute('sidx')
        urel = !urel

        // console.log('_seg', ev.target.textContent, lidx, sidx)
        // chain = chains[lidx]
        // cdicts = parseCdicts(chain)
        // console.log('_cdicts', cdicts)
    }

    function parseCdicts(chain) {
        let cdicts = []
        // console.log('_MAIN', chain)
        let main = chain.find(segment=> segment.main) // || {} здесь нельзя, indecl
        let indecl = chain.find(segment=> segment.indecl)
        if (main) {
            cdicts = main.cdicts || [] // , rels = main.rels, fls = chain.find(segment=> segment.fls).fls
            rels = main.rels || []
            // console.log('_main.cdicts', cdicts)
            // let probe = cdicts[0]
        } else if (indecl) {
            console.log('_indecl', indecl)
            cdicts = indecl.cdicts
            console.log('_INDECL-cdicts', cdicts)
        }

        return cdicts
    }

    // let oclip = document.querySelector('#clip-results')
    function onKeyDown(ev) {
        switch(ev.key) {
            case 'r':
                console.log('_R')
                showRelatives(cdicts)
                break;
            case 'f':
                break;
            case 'Escape':
                urel = false
                break;
            case 'f':
                // forms
                break;
        }
    }

    function showRelatives(cdicts){
        // let probe = cdicts[0]
        console.log('_showRelatives_cdicts', cdicts.length)
        urel = !urel
    }

</script>

<!-- =============== ANTHRAX ========== -->

<svelte:window on:keydown={onKeyDown} />

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
            <Cdict {cdict} />
        {/each}
    </div>

</div>

{#key urel}
{#if urel}
    <!-- <div class="h-full bg-[#FAFAD2] shadow-2xl overflow-y-auto px-4"> -->
    <div class="absolute inset-y-0 right-0 m-20 max-w-full_ overflow-y-auto p-4 p-20 bg-gray-200 w-1/3">
        <Relatives {rels} />
    </div>
{/if}
{/key}
