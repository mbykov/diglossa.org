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
    let fetchImage = new Promise(() => {});

    let chains = $state([])
    let chain = $state({})

    $effect(async ()=> {
        log('_____________________________effect dnames', dnames)
        log('_____________________________effect wf', wf)
		const response = await fetch('/api?dnames=' + dnames + '&wf=' + wf)
        let json = await response.json()
        log('_____here_response', json)
        // fetchImage = json // await response.json()
        chains = json.chains
        chain = chains[0]
        log('_____here_chain', chain.cdicts)
    })

    // let chain = $derived(chains[0])

    onMount(async () => {
        // log('_ON M wf', wf)
        // const response = await fetch('/api?dkeys=ssss')
        // let chains = await response.json()
        // log('_API chains', chains)
    })

    // fetchImage = (async () => {
    //     log('_____________________________here wf', data.wf)
    //     log('_____________________________here dnames', dnames)
	// 	const response = await fetch('/api?dnames=' + dnames + '&wf=' + wf)
    //     let json = await response.json()
    //     log('_____here_response', json)
    //     return await response.json()
	// })()

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
        <Chain {chain}  />
      {/if}

</div>

<!-- ====fetchImage -->
<!-- {#await fetchImage} -->
<!-- 	<p>...waiting</p> -->
<!--   {:then res} -->
<!--     RES={JSON.stringify(res)} -->
<!-- {:catch error} -->
<!-- 	<p>An error occurred! {error}</p> -->
<!--   {/await} -->
