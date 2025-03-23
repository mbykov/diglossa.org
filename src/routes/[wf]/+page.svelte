<script>
    import {oxia, comb, plain, strip} from 'orthos'
    import Cdict from './Cdict.svelte'
    import Relative from './Relative.svelte'
    import _ from 'lodash'

    // import Chain from './Chain.svelte'
    import Schemes from './Schemes.svelte'

    const log = console.log

    let { data } = $props()

    let wf = $derived(data.wf)
    // $inspect('_+page_data.wf', wf);
    let newwf = $state('')

    // $inspect('_+page_conts', data.conts);

    let cdicts = $state([])
    let cdicts_ = $derived.by(() => {
		let cdicts = []
		for (let cont of data.conts) {
            cdicts.push(...cont.cdicts)
		}
		return cdicts
	});

    $effect(()=> {
        cdicts = cdicts_
    })

    $inspect('_+page_cdicts', cdicts);

    let rels = $derived(_.uniq(_.flatten(data.conts.map(cont=> cont.rels))))
    let morels = $derived(_.uniq(_.flatten(data.conts.map(cont=> cont.morels))))
    // $inspect('_+page_rels', rels);

    async function showRelative(ev) {
        if (!ev.target.classList.contains('query-dict')) return
        let wf = ev.target.textContent
        let cwf = comb(wf)
        log('_R', ev.target.textContent)

        cdicts.forEach(cdict=> cdict.show = false)

        let dict = cdicts.find(cdict=> cdict.dict == cwf)
        if (!dict) {
            let newcdicts = await queryDict(wf)
            log('_NO D', newcdicts)
            cdicts.push(...newcdicts)
        } else {
            dict.show = true
            log('_YES D', dict)
        }

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

    function showSegment(ev) {
        if (!ev.target.classList.contains('segment')) return
        // log('_showSegment', ev.target)
        newwf = ev.target.getAttribute('dict')
    }

</script>

<div class="p-4 px-8 h-screen rounded overflow-y-scroll bg-gray-100 shadow-[rgba(0,0,55,0.5)_-13px_0px_10px_0px] mr-4">

    <div class="anthrax-head flex justify-between font-bold_">
        <div class="head-wf text-green-500 wordform"> {data.wf} </div>
        <div class="head-schemes" onclick={showSegment}>
            <!-- <Schemes {conts} /> -->
        </div>
    </div>

    {#await cdicts}
      <div> waiting...</div>
    {:then}
      {#each cdicts as cdict, idx}
        {#if cdict.show}
          <div onclick={showRelative}>
              <Relative {rels} {morels} />
          </div>
          <Cdict {cdict} />
        {/if}
      {/each}

    {:catch error}
	  <p style="color: red">{error.message}</p>
    {/await}

    <!-- {#await conts} -->
    <!--   <div> waiting...</div> -->
    <!-- {:then} -->
    <!--   {#each conts as cont} -->
    <!--   <\!-- <Chain {cont} {newwf} /> -\-> -->
    <!--   <div onclick={showRelative}> -->
    <!--       <Relative {cont} /> -->
    <!--   </div> -->

    <!--   {#each cont.cdicts as cdict, idx} -->
    <!--     {#if cdict.show} -->
    <!--       <Cdict {cdict} /> -->
    <!--     {/if} -->
    <!--   {/each} -->

    <!--   {/each} -->
    <!-- {:catch error} -->
	<!--   <p style="color: red">{error.message}</p> -->
    <!-- {/await} -->

</div>
