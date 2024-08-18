<script>
  export let cdict
  let greekUnicode = /[\u{0370}-\u{03FF}\u{1F00}-\u{1FFF}]/u

  // console.log('_TRNS', cdict)
  // $: trns = cdict.trns || [] // .split('; ') || []
  // $: if (typeof trns === 'string') {
    // trns = trns.split('; ') || []
  // }

  let trns = []

  function toggle(ev) {
    let target = ev.target
    if (!target.classList.contains('trns')) return
    target.classList.toggle('overflow-y-auto')
    target.classList.toggle('max-h-24')
  }

  for (let dname in cdict.trn) {
      trns = cdict.trn[dname]
  }

  /*
  $: trns = trns.map(trn=> {
    if (!trn) return ''
    // return trn.replace(/([^\p{P} \n]+)[\u{0370}-\u{03FF}\u{1F00}-\u{1FFF} ]/ug, " <span class=\"wf\">$1</span>")
    return trn.replace(/([\u{0370}-\u{03FF}\u{1F00}-\u{1FFF}]+)/ug, "<span class=\"wf\">$1</span>")
  })
   */

  function eachRow() {
  }


</script>


<div class="cdict pb-4">
  <!-- cdict: {cdict.rdict} - {JSON.stringify(cdict)} -->
  <div class="px-2 flex justify-between sticky_ border_ border-green-500 ">
    <div class="w-1/2_ border_ border-blue-500_">
      <span class="text-red-500 font-bold">{cdict.rdict}</span> {cdict.pos}
    </div>
    <div class="w-1/2_ cursor-pointer border_ border-blue-500_" >
      D P R F
    </div>
  </div>


  {#each Object.entries(cdict.trn) as [dname, trns]}

    <div class="flex justify-between sticky_ border_ border-green-500_ px-2">

        <div class="grow trns max-h-24 overflow-y-auto bg-gray-200 p-4 w-full my-2" on:click="{toggle}">
          {#each cdict.trn[dname] as trn}
            {@html trn}<br>
            <!-- {@html trn.replace(/([^\p{P} \n]+)/ug, " <span class=\"wf\">$1</span>")}<br> -->
          {/each}
        </div>

      <div class="cursor-pointer border_ border-blue-500_ text-green-500 font-bold p-2" >
        {dname}
      </div>
    </div>



  {/each}



</div>
