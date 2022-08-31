<script>
  export let chain
  export let wf

  import Term from './widgets/Term.svelte'

  $: console.log('_CHAIN', chain)

  // title: wf -----------> segs: seg-seg-seg
  // rdict --------> dname
  // morph
  // trns
  $: segs = chain.map(seg=> seg.seg).join('-')

  $: term = chain.find(seg=> seg.indecl)

  $: mainseg = chain.find(seg=> seg.mainseg)
  $: fls = chain.find(seg=> seg.fls)?.fls


  $: pref = chain.find(seg=> seg.pref)

  // $: rdict = mainseg?.cdict?.rdict || term?.cdict.rdict
  // $: trns = mainseg?.cdict?.trns || term?.cdict.trns
  // $: console.log('_TRNS', trns)

  $: console.log('_MS', mainseg)
  $: console.log('_FLS', fls)
  $: morph = [] //mainseg ? prettyMorph(mainseg, fls) : prettyTerm(term)

  function prettyTerm(term) {
    let fls = term.cdict.fls
    $: console.log('_TERM FLS', fls)
    if (!fls) return 'kuku'
    return prettyNameFLS(fls)
  }

  function prettyMorph(mainseg, fls) {
    // if (!mainseg) return 'no-mainseg'
    if (mainseg.cdict.verb) {
      return prettyVerbFLS(fls)
    } else if (mainseg.cdict.name) {
      return prettyNameFLS(fls)
    } else {
      return null
    }
  }

  function prettyVerbFLS(fls) {
    return fls.map(flex=> {
      let str
      if (flex.part) str = [flex.tense,  [flex.gend, flex.numcase].join('.') ].join(', ')
      else str =[flex.tense, flex.numper].join(' ')
      return str
    })
  }

  function prettyNameFLS(fls) {
    return fls.map(flex=> {
      return  [flex.gend, flex.numcase].join('.')
    })
  }

</script>

<div class="">
  <div class="chain p-4">

    {#if term}
      <svelte:component this={Term} {term} />
    {/if}


<div class="rdict py-2">
  <!-- dict: <b>{rdict}</b> -->
  <div class="trns max-h-24 overflow-y-auto bg-gray-100 px-4">
    <!-- {#each trns as trn} -->
      <!-- {trn}<br> -->
    <!-- {/each} -->
  </div>
</div>

  </div>

</div>
