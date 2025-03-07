<script>
    import Cdict from './Cdict.svelte'
    import Morphs from './Morphs.svelte'
    import _ from 'lodash'
    import {oxia, comb, plain, strip} from 'orthos'
    const log = console.log

    let { cont, wf } = $props()

    let cdicts = $derived(cont.cdicts)
    // let cdicts = $state(cont.cdicts)
    // let cdicts = cont.cdicts
    // cdicts = cdicts
    // let rdicts = $derived(cdicts.map(cdict=> cdict.dict))
    cdicts.forEach(cdict=> cdict.show = true)

    $inspect('_Chain_cont', cont);
    $inspect('_Chain_cdicts', wf, cdicts);

    let contrels = $derived(cont.rels.map(rel=> ('<span class="relat query-dict cursor-pointer px-1_ ">' + rel + '</span>')).join(', ') )
    let morerels = $derived(cont.morels.map(rel=> ('<span class="morel query-dict cursor-pointer px-1_ ">' + rel + '</span> ')).join(', ') )

    let showDicts = true
    let showRels = $state(false)
    let showMore = $state(false)
    // onMount(async () => {
    // })
    let unique = {}

    function toggleRelsList(ev) {
        let target = ev.target
        if (!target.classList.contains('rels-list')) return
        showRels = !showRels
        // if (!showRels) showMore = false
        showMore = false
    }

    function toggleMoreList(ev) {
        let target = ev.target
        if (!target.classList.contains('more-list')) return
        showMore = !showMore
    }

    async function showDict(ev) {
        let target = ev.target
        if (!target.classList.contains('query-dict')) return
        let wf = target.textContent
        log('_showDICT', wf)
        log('_ALREADY_cdicts', wf, $state.snapshot(cdicts))
        let cwf = comb(wf)
        let dict = cdicts.find(cdict=> cdict.dict == cwf)
        log('_exists', wf, dict)
        log('_exists_snap', $state.snapshot(dict))

        cdicts.forEach(cdict=> cdict.show = false)
        if (!dict ) {
            let newcdicts = await queryDict(wf)
            cdicts.push(...newcdicts)
            log('_EST newcdicts', $state.snapshot(cdicts))
        } else {
            dict.show = true
            log('_EST', $state.snapshot(cdicts))
        }
        // cdicts = cdicts
        unique = {}
    }

    async function queryDict(wf) {
        let query_url = '/api/dict?wf=' +wf
        let getresp = await fetch(query_url)
        let response = await getresp.json()
        let newcdicts = response.cdicts
        // log('_FETCH RESP', response)
        newcdicts.forEach(cdict=> cdict.show = true)
        return newcdicts
    }


</script>

<div class="chain-container overflow-x-auto_">

    <div class="dicts-list pt-2 max-w-96_ overflow-x-scroll_" onclick="{showDict}">
        <!-- <span class="text-green-400">dicts:</span> -->
        <!-- {#each rdicts as rdict} -->
        <!--   <span class="query-dict cursor-pointer px-1">{rdict}</span> -->
        <!-- {/each} -->
        <span class="text-green-400 cursor-pointer rels-list" onclick="{toggleRelsList}">relatives:</span>
        {#if showRels}
          {@html contrels}
          <span class="px-1 text-green-400 cursor-pointer more-list" onclick="{toggleMoreList}"> more...</span>
          {#if showMore}
            {@html morerels}
          {/if}
        {:else}
          {cont.rels.length}/{cont.morels.length}
        {/if}
      </div>

    <!-- {#key unique} -->
      {#each cdicts as cdict, idx}
        {#if cdict.show}
          <Cdict {cdict} />
        {/if}
      {/each}
    <!-- {/key} -->

</div>
