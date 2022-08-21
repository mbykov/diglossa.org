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
  $: console.log('_TERM', term)

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
    <div class="title flex flex-cols ">
      <div class="wf w-1/2">wf: <b>{wf}</b></div> <div class="segs w-1/2 text-right">segments: {segs}</div>
    </div>
    {#if morph}
      <div class="morph py-2">
        morph: {morph}
        <!-- {#each pref.cdicts as cdict} -->
          <!-- pref: {cdict.rdict} trns: {cdict.trns} -->
        <!-- {/each} -->
      </div>
    {/if}

      {#if pref}
        <div class="pref py-2">

        {#each pref.cdicts as cdict}
          prefix: <b>{cdict.rdict}</b>
        <div class="trns max-h-24 overflow-y-auto bg-gray-100 px-4">

          {#each cdict.trns as trn}
            {trn}<br>
          {/each}
        </div>
      {/each}
    </div>
  {/if}

    {#if mainseg}
      <div class="mainseg py-2">
        {#each mainseg.cdicts as cdict}
          <div class="flex">
            <div class="w-1/2"> <b>dict</b>: {cdict.rdict}        </div>
            <div class="w-1/2 text-right text-green-600">              {cdict.dname}            </div>
          </div>
          <div class="trns max-h-24 overflow-y-auto bg-gray-100 px-4">
            {#each cdict.trns as trn}
              {trn}<br>
            {/each}
          </div>
        {/each}
      </div>
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
