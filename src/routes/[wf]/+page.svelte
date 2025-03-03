<script>

    import { page } from '$app/state';
    import Chain from './Chain.svelte'
    import Schemes from './Schemes.svelte'
    import { onMount } from 'svelte'
    import { odicts } from "$lib/shared.svelte";
    import _ from 'lodash'
    import Morphs from './Morphs.svelte'

    const log = console.log

    let unique = {}
    let { data } = $props()

    let wf = $derived(data.wf)
    let dnames = _.compact(odicts.current.map(dict=> dict.active ? dict.key : false))

    // let cont = $derived(data.conts[0])
    let conts = $derived(data.conts)
    // let chain = chains[0]
    // $inspect(wf, chains);
    // $inspect(cont);
    $inspect('conts', conts);

    let showDicts = true
    let showRels = $state(false)
    let showMore = $state(false)
    // onMount(async () => {
    // })

    function toggle(ev) {
        let target = ev.target
        let otrns = target.closest('.trns')
        if (!otrns) return
        otrns.classList.toggle('overflow-y-auto')
        otrns.classList.toggle('max-h-24')
    }

    function toggleRelsList(ev) {
        let target = ev.target
        if (!target.classList.contains('rels-list')) return
        showRels = !showRels
    }

    function toggleDict(ev) {
        let target = ev.target
        if (!target.classList.contains('rdict')) return
        let wf = target.textContent
        log('_xxx DICT', wf)
        let otobehidden = document.querySelectorAll('.translations')
        let selector = ['[rdict="', wf, '"]'].join('')
        // let tobeshown = document.querySelectorAll('[rdict="ὄκλασμα"]')
        let otobeshown = document.querySelectorAll(selector)
        // log('_xxx DICT', tobehidden)
        // log('_xxx DICT', tobeshown)
        otobehidden.forEach(o=> o.classList.add('hidden'))
        otobeshown.forEach(o=> o.classList.remove('hidden'))
    }


</script>

<div class="p-4 px-8 h-screen rounded overflow-y-scroll bg-gray-100 shadow-[rgba(0,0,55,0.5)_-13px_0px_10px_0px] mr-4">

    <div class="anthrax-head flex justify-between font-bold_">
        <div class="head-wf text-green-500 wordform"> {data.wf} </div>
        <div class="head-schemes">
            == SCHEMES
            <Schemes {conts} />
            ==  </div>
    </div>

    {#await conts}
      <div> waiting...</div>
    {:then}
      {#each conts as cont}
        <Chain {cont} />
      {/each}
    {:catch error}
	  <p style="color: red">{error.message}</p>
    {/await}

    <!-- {#if data.conts.length} -->
      <!-- <Chain {data} /> -->
    <!-- {:else} -->
      <div class="anthrax-head font-bold">
          <div class="head-wf text-green-500 wordform"> {data.wf} </div>
          <div class="no-result">no result</div>
      </div>
    <!-- {/if} -->
</div>
