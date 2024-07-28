<script>
  export let cdict
  let greekUnicode = /[\u{0370}-\u{03FF}\u{1F00}-\u{1FFF}]/u

  // console.log('_TRNS', cdict)
  $: trns = cdict.trns // .split('; ') || []
  $: if (typeof trns === 'string') {
    trns = trns.split('; ') || []
  }


  function toggle(ev) {
    let target = ev.target
    if (!target.classList.contains('trns')) return
    target.classList.toggle('overflow-y-auto')
    target.classList.toggle('max-h-24')
  }

  $: trns = trns.map(trn=> {
    if (!trn) return ''
    // return trn.replace(/([^\p{P} \n]+)[\u{0370}-\u{03FF}\u{1F00}-\u{1FFF} ]/ug, " <span class=\"wf\">$1</span>")
    return trn.replace(/([\u{0370}-\u{03FF}\u{1F00}-\u{1FFF}]+)/ug, "<span class=\"wf\">$1</span>")
  })

  function xxx(ev) {
    ///
  }


</script>


<div class="cdict pb-4">
  <!-- cdict: {cdict.rdict} - {JSON.stringify(cdict)} -->
  <div class="p-1 flex justify-between sticky_ border border-green-500 ">
    <div class="w-1/2_ border border-blue-500">
      <span class="text-red-500 font-bold">{cdict.rdict}</span> verb
    </div>
    <div class="w-1/2_ cursor-pointer border border-blue-500" on:click={xxx}>
      dname
    </div>
  </div>

  <div class="p-1 flex justify-between sticky_ border border-green-500 ">
    <div class="w-1/2_ border border-blue-500">
      MORPHS
    </div>
    <div class="w-1/2_ cursor-pointer border border-blue-500" on:click={xxx}>

    </div>
  </div>

  <div class="trns max-h-24 overflow-y-auto bg-gray-200 p-4" on:click="{toggle}">
    {#each trns as trn}
      {@html trn}<br>
    <!-- {@html trn.replace(/([^\p{P} \n]+)/ug, " <span class=\"wf\">$1</span>")}<br> -->
  {/each}
</div>

</div>
