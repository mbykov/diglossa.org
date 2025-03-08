<script>

    // import { page } from '$app/state';
    import Chain from './Chain.svelte'
    import Schemes from './Schemes.svelte'
    // import { odicts } from "$lib/shared.svelte";
    // import _ from 'lodash'

    const log = console.log

    let unique = {}
    let { data } = $props()

    let wf = $derived(data.wf)
    // $inspect('_+page_data.wf', wf);

    let conts = $derived(data.conts)
    $inspect('_+page_conts', conts);

    function showSegment(ev) {
        if (!ev.target.classList.contains('segment')) return
        log('_showSegment', ev.target)
    }


</script>

<div class="p-4 px-8 h-screen rounded overflow-y-scroll bg-gray-100 shadow-[rgba(0,0,55,0.5)_-13px_0px_10px_0px] mr-4">

    <div class="anthrax-head flex justify-between font-bold_">
        <div class="head-wf text-green-500 wordform"> {data.wf} </div>
        <div class="head-schemes" on:click={showSegment}>
            <Schemes {conts} />
        </div>
    </div>

    {#await conts}
      <div> waiting...</div>
    {:then}
      {#each conts as cont}
        <!-- <Chain {cont} {wf} contcdicts={cont.cdicts}/> -->
        <Chain cdicts={cont.cdicts} rels={cont.rels} morels={cont.morels}/>
      {/each}
    {:catch error}
	  <p style="color: red">{error.message}</p>
    {/await}

    <!-- {#if data.conts.length} -->
      <!-- <Chain {data} /> -->
    <!-- {:else} -->
      <div class="anthrax-head font-bold">
          <!-- <div class="head-wf text-green-500 wordform"> {data.wf} </div> -->
          <!-- <div class="no-result">no result</div> -->
      </div>
    <!-- {/if} -->
</div>
