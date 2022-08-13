<script>
 export let chain
 export let wf

  // title: wf -----------> segs: seg-seg-seg
 // rdict --------> dname
 // morph
 // trns
  $: segs = chain.map(seg=> seg.seg).join('-')
  $: mainseg = chain.find(seg=> seg.mainseg)
  $: fls = chain.find(seg=> seg.fls)?.fls

  $: term = chain.find(seg=> seg.term)
  $: pref = chain.find(seg=> seg.pref)
  $: console.log('_MS', mainseg)

  $: rdict = mainseg?.cdict?.rdict || term?.cdict.rdict
  $: trns = mainseg?.cdict?.trns || term?.cdict.trns

  $: console.log('_FLS', fls)
  $: morph = prettyMorph(mainseg, fls)

  function prettyMorph(mainseg, fls) {
    if (!mainseg) return 'no-mainseg'
    if (mainseg.cdict.verb) {
      return prettyVerbFLS(fls)
    } else if (mainseg.cdict.name) {
      return prettyNameFLS(fls)
    } else {
      return 'other'
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

<div class="h-screen">
  Anthrax
  <div class="chain border border-solid p-4">
    <div class="title flex ">
      <div class="title w-1/2">wf: {wf}</div> <div class="title w-1/2">segments: {segs}</div>
    </div>
    {#if morph}
      <div class="morph p-2">
        morph: {morph}
        <!-- {#each pref.cdicts as cdict} -->
          <!-- pref: {cdict.rdict} trns: {cdict.trns} -->
        <!-- {/each} -->
      </div>
    {/if}

    {#if pref}
    <div class="pref p-2">
      {#each pref.cdicts as cdict}
        pref: {cdict.rdict} trns: {cdict.trns}
      {/each}
    </div>
    {/if}
    <div class="rdict p-2">
      rdict: {rdict}

      <div class="trns">
        trns: {trns}
      </div>

    </div>
  </div>

</div>
