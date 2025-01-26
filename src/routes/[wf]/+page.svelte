<script>

    import Chain from './Chain.svelte'
    const log = console.log
    let { data } = $props()

    // log('__________________anthrax DATA', data)
    // $effect(() => {
    //     log('__________________anthrax eff WF', data.wf)
    //     // log('__________________anthrax chains', data.chains)
    //     for (let chain of data.chains) {
    //         for (let cdict of chain.cdicts) {
    //             log('__________________anth cdict', cdict)
    //         }
    //         // log('__________________chain', chain)
    //     }
    // })

    // выбрать по клику
    // let chain = $state(data.chains[0])
    let chain = $derived(data.chains[0])

</script>

<div class="p-4 px-8 h-screen rounded overflow-y-scroll bg-gray-100 shadow-[rgba(0,0,55,0.5)_-13px_0px_10px_0px] mr-4">
    <div class="anthrax-head flex justify-between font-bold">
        <div class="head-wf text-green-500"> {data.wf} </div>
        <div class="head-delete text-red-800"> == SCHEMES == </div>
    </div>

    {#if data.chains.length}
      <Chain {chain}  />
    {/if}

</div>
