<script>
    import Cdict from './Cdict.svelte'
    import _ from 'lodash'
    import {oxia, comb, plain, strip} from 'orthos'

    const log = console.log

    // let { cdicts: _cdicts, rels, morels, cont } = $props()
    let { cont, newwf } = $props()

    let cdicts_ = $derived(cont.cdicts.map(cdict=> {
        cdict.show = true
        return cdict
    }))

    let cdicts = $state([])
    cdicts.forEach(cdict=> cdict.show = true)

    let rels = $derived(cont.rels)
    let morels = $derived(cont.morels)

    $effect(()=> {
        cdicts = cdicts_
    })

    $effect(()=> {
        if (!newwf) return
        // log('____EFFF', newwf)
        let cwf = comb(newwf)
        let cdict = cdicts.find(cdict=> cdict.dict == cwf)
        newwf = null
        if (!cdict) return
        cdicts.forEach(cdict=> cdict.show = false)
        cdict.show = true
        // log('____EFFF cdict', cdict)
    })

    // $inspect('_chain cont', cont)
    $inspect('_chain newwf', newwf)
    // $inspect('_chain_cdicts', cdicts);

    let contrels = $derived(rels.map(rel=> ('<span class="relat query-dict cursor-pointer px-1_ ">' + rel + '</span>')).join(', ') )
    let morerels = $derived(morels.map(rel=> ('<span class="morel query-dict cursor-pointer px-1_ ">' + rel + '</span> ')).join(', ') )

    let showDicts = true
    let showRels = $state(false)
    let showMore = $state(false)

    function toggleRelsList(ev) {
        let target = ev.target
        if (!target.classList.contains('rels-list')) return
        showRels = !showRels
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

        cdicts.forEach(cdict=> cdict.show = false)

        let wf = target.textContent
        let cwf = comb(wf)
        let dict = cdicts.find(cdict=> cdict.dict == cwf)

        if (!dict ) {
            let newcdicts = await queryDict(wf)
            cdicts.push(...newcdicts)
        } else {
            dict.show = true
            // log('_EST', $state.snapshot(cdicts))
        }
        showRels = false
        showMore = false
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
          {rels.length}/{morels.length}
        {/if}
      </div>

      {#each cdicts as cdict, idx}
        {#if cdict.show}
          <Cdict {cdict} />
        {/if}
      {/each}

</div>
