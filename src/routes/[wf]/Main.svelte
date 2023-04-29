<script>

    import { fade } from "svelte/transition"
    import { onMount } from 'svelte'
    import { invalidateAll } from '$app/navigation';
    import _ from 'lodash'

    import PrettyFLS from './PrettyFLS.svelte'
    import Schemes from './Schemes.svelte'
    import Cdicts from './Cdicts.svelte'

    import DBS from './DBS.svelte'

    import Forms from './Forms.svelte'
    import Cognates from './Cognates.svelte'

    let cognActive = false

    export let wf
    export let chains
    let cdicts = []
    let rels = []

    let unique = {}
    let chain
    let main
    // let cognates = []

    $: {
        // TODO: cdicts нужно по-другому. Если разные схему в глаголах, компаундах, то показать первый cdicts в схеме, тут верно
        // а если noun / adjective, то можно их показать сразу ζωὴν => ζωή ; ζωός
        // или всегда сразу все ?

        // console.log('_dbs:', dbs)
        // console.log('_cdicts:', cdicts)

        chain = _.first(chains) // это после segments
        main = chain.find(seg=> seg.main)

        let indecl = chain.find(seg=> seg.indecl)
        if (indecl) cdicts  = indecl.cdicts
        else {
            cdicts = chain.find(seg=> seg.main).cdicts
            // rels = chain.find(seg=> seg.main).rels
        }
        // console.log('_main', main)
    }

    function showSegment(ev) {
        console.log('_SHOW SEGMENT')
    }

    function onKeyDown(e) {
        if (e.ctrlKey) return
        switch(e.key) {
        case 'r':
            showRels()
            break;
        case 'f':
            // forms
            break;
        case 'Escape':
            closeAll()
            break;
        }
    }

  async function showRels(ev) {
      if (!main) return
      rels = main.rels || []
      console.log('_showRels', rels)
      cognActive = true
  }

  function closeAll() {
      let oforms = document.querySelector('#popup-forms')
      if (oforms && !oforms.classList.contains('hidden')) {
          oforms.classList.add('hidden')
      }

      cognActive = false
      // let ocogns = document.querySelector('#popup-cognates')
      // if (ocogns && !ocogns.classList.contains('hidden')) {
      //     ocogns.classList.add('hidden')
      // }
  }

  function changeDname(e) {
      unique = {}
      invalidateAll()
      console.log('_changeDname', e.detail)
  }

    // let relatives = [1,1,1]

</script>

<div id="popup-morphs" class="popup absolute w-1/2 right-4 top-4 -my-4 h-screen p-4 pr-1">
    <div class="h-full bg-[#FAFAD2] shadow-2xl overflow-y-auto">

        <div class="main-title text-right px-2">
            <span class="esc w-1/3 text-right"> [x]</span>
            <DBS on:dname={changeDname}/>
        </div>

        <div class="mainseg">

            <div class="title flex px-4">
                <div class="w-1/2 px-4 text-green-600 px-4">wordform: <b><span class="wordform">{wf}</span></b></div>
                <div class="w-1/2 px-4 text-right text-green-600 clickable cognates" >
                    <span class="clickable forms px-2_" title="key F">forms</span>
                    <span class="clickable cognates" title="key R" on:click={showRels}>relatives</span>
                </div>
            </div>

            <div class="title flex flex-cols p-4">
                <div class="wf w-1/3">
                    <PrettyFLS {chain} />
                </div>
                <div class="wf w-1/3">   </div>
                <div class="segs w-1/3 text-right">
                    <Schemes {chains} on:segment={showSegment} />
                </div>
            </div>
        </div>

        {#key unique}
        <Cdicts {cdicts}  />
        {/key}

    <!-- {#key cognkey} -->
    <!-- {#if (cognates.length)} -->
    <!--     <Cognates {cognates} {wf} /> -->
    <!-- {/if} -->
    <!-- {/key} -->

    </div>
</div>

<!-- {#key unique} -->
<!-- <Cognates {rels} /> -->
<!-- {/key} -->

{#if cognActive}
    <!-- <div transition:fade class="fixed inset-0 bg-base-200 bg-opacity-95 overflow-y-auto h-full w-full z-20 flex justify-center items-center"> -->
    <div id="popup-relatives" transition:fade class="popup absolute min-w-full_ w-1/2 right-4 top-4 -my-4 h-screen p-4 pl-32 pr-1">
        <Cognates {rels} />
    </div>
{/if}



<svelte:window on:keydown={onKeyDown} />
