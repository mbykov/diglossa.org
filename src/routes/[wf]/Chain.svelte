<script>
    import Morphs from './Morphs.svelte'
    import _ from 'lodash'
    const log = console.log

    let { cont } = $props()
    // log('______Data keys', _.keys(cont))

    // let cont = $derived(data.conts[0])
    // log('______CONT.svelte cont', cont)

    let contrels = $derived(cont.rels.map(rel=> ('<span class="rel cursor-pointer px-1_ ">' + rel + '</span>')).join(', ') )
    let morerels = $derived(cont.morels.map(rel=> ('<span class="rel cursor-pointer px-1_ ">' + rel + '</span> ')).join(', ') )

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
        // if (!showRels) showMore = false
        showMore = false
        log('_T', showRels, showMore)
    }

    function toggleMoreList(ev) {
        let target = ev.target
        if (!target.classList.contains('more-list')) return
        showMore = !showMore
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

<!-- {#each Object.entries(cdict.trn) as [dname, trns]} -->
<div class="anthrax-container overflow-x-auto)">

    <div class="dicts-list pt-2 max-w-96_ overflow-x-scroll" onclick="{toggleDict}">
        <span class="text-green-400">dicts</span>:
        {#each cont.rdicts as rdict}
          <span class="rdict cursor-pointer px-1">{rdict}</span>
        {/each}
        <span class="text-green-400 cursor-pointer rels-list" onclick="{toggleRelsList}">relatives</span>:
        {#if showRels}
          {@html contrels}
          {#each cont.rels as rdict}
            <!-- <span class="rel cursor-pointer px-1 "> {rdict} </span> -->
          {/each}
          <span class="px-1 text-green-400 cursor-pointer more-list" onclick="{toggleMoreList}"> more...</span>
          {#if showMore}
            {@html morerels}
            {#each cont.morels as rdict}
              <!-- <span class="morel cursor-pointer px-1"> {rdict} </span> -->
            {/each}
          {/if}
        {:else}
          {cont.rels.length}
        {/if}
      </div>

    {#each cont.cdicts as chain, idx}

        <div class="translations rdict={chain.cdict.rdict} px-2" rdict={chain.cdict.rdict}>

            <div class="cdict-head flex justify-between py-4">
                <div class="cdict-rdict ">
                    dict: <span class="text-green-800 font-bold">{chain.cdict.rdict}</span>
                </div>
                <div class="cdict-morphs">
                    {#if chain.morphs}
                      <Morphs {chain} />
                    {/if}
                  </div>
            </div>

            {#each chain.cdict.trns as trn}
              <div class="trns grow_ max-h-24 overflow-y-auto bg-gray-200 p-4 w-full my-2 " onclick="{toggle}">
                  <div class="text-green-500 font-bold float-right">{trn.dname}</div>
                  <!-- <div >{@html trn.trns}</div> -->
                  <div >
                      {#each trn.trns as row}
                        <p>{row}</p>
                      {/each}
                    </div>

              </div>
            {/each}

          </div>

      {/each}

</div>
