<script>

    import { page } from '$app/state';
    import Chain from './Chain.svelte'
    import { onMount } from 'svelte'
    import { odicts } from "$lib/shared.svelte";
    import _ from 'lodash'

    const log = console.log

    let { data } = $props()

    let wf = $derived(data.wf)
    let dnames = _.compact(odicts.current.map(dict=> dict.active ? dict.key : false))

    let chains = $state([])
    let chain = $state({})
    let rawtdicts = $state([])
    let dicts = $state([])

    $effect(async ()=> {
        // log('_____________________________effect dnames', dnames)
        // log('_____________________________effect wf', wf)
		const response = await fetch('/api?dnames=' + dnames + '&wf=' + wf)
        let json = await response.json()
        // log('_____here_response', json)

        chains = json.chains
        dicts = json.tdicts
        chain = chains[0]
        // log('_____here_chain cdicts', chain.cdicts)
        // log('_____here_chain dicts', dicts)
        // log('_____here_chain dnames', dnames)
        for (let dict of dicts) {
            // log('_____here_dict', dict.rdict, dict.dname)
        }

    })

    // let chain = $derived(chains[0])

    // onMount(async () => {
    // })

    // выбрать по клику
    // let chain = $state(data.chains[0])
    // let chain = $derived(data.chains[0])

</script>

<div class="p-4 px-8 h-screen rounded overflow-y-scroll bg-gray-100 shadow-[rgba(0,0,55,0.5)_-13px_0px_10px_0px] mr-4">
    <div class="anthrax-head flex justify-between font-bold">
        <div class="head-wf text-green-500 wordform"> {data.wf} </div>
        <div class="head-delete text-red-800"> == SCHEMES == </div>
    </div>

    <!-- {#if data.chains.length} -->
      {#if chains.length}
        <Chain {chain} {dicts} />
      {/if}

</div>
