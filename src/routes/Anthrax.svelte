<script>
 export let chains
 export let wf

 // title: seg-seg-seg
 // wf --------> dname
 // morph
 // trns

  function segs(chain) {
    return chain.map(seg=> seg.seg).join('-')
  }

  function trns(chain) {
    let cdict = chain.slice(-2)[0].cdict
    if (!cdict) return []
    let trns = cdict.trns
    return trns
  }

</script>

<div class="h-screen_">
    Anthrax
    <p>wf: {wf}</p>

    {#each chains as chain}
      <p>segs: {segs(chain)}</p>
      <p>trns: {trns(chain)}</p>
    {(console.log( '_chain_', { chain }), '')}
    {/each}

</div>

<div class="mt-8 h-screen_">
    <!-- {(console.log( '_chains', { chains }), '')} -->
</div>
