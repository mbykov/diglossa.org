<script>
  export let cdict
  export let fls

  if (cdict.fls) fls = cdict.fls
  $: console.log('_Cdict fls', fls)

  function prettyMorph(fls) {
    return fls.map(flex=> [flex.gend, flex.numcase].join('.')).join('; ')
  }

</script>

<div class="cdict">
  <div class="flex pt-4">
    <div class="w-1/2"> <b>dict</b>: {cdict.rdict}        </div>
    <div class="w-1/2 text-right text-green-600">              {cdict.dname}            </div>
  </div>
  {#if fls}
    <div class="p-2 text-green-700"> morph: {prettyMorph(fls)} </div>
  {/if}
  <div class="trns max-h-24 overflow-y-auto bg-gray-100 px-4">
    {#each cdict.trns as trn}
      {trn}<br>
    {/each}
  </div>
</div>
