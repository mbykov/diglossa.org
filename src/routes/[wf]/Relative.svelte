<script>
    import _ from 'lodash'
    import {oxia, comb, plain, strip} from 'orthos'

    const log = console.log

    let { rels, morels } = $props()

    // let rels = $derived(cont.rels)
    // let morels = $derived(cont.morels)

    let showRels = $state(false)
    let showMore = $state(false)

    let contrels = $derived(rels.map(rel=> ('<span class="relat query-dict cursor-pointer px-1_ ">' + rel + '</span>')).join(', ') )
    let morerels = $derived(morels.map(rel=> ('<span class="morel query-dict cursor-pointer px-1_ ">' + rel + '</span> ')).join(', ') )

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

</script>

<!-- onclick="{showDict}" -->
<div class="dicts-list pt-2 max-w-96_ overflow-x-scroll_" >
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
