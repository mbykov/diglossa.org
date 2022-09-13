<script>
  export let cdict
  export let fls
  import _ from 'lodash'
  // $: console.log('_Cdict ', cdict)
  // $: console.log('_cdict export fls ', fls)

  $: if (fls) cdict.fls = fls
  // $: console.log('_Cdict.FLS ', cdict.fls)

  function prettyMorph(fls) {
    return _.uniq(fls.map(flex=> [flex.gend, flex.numcase].join('.'))).join('; ')
  }

</script>

<div class="cdict">
  <div class="flex pt-4">
    <div class="w-1/2"> <b>dict</b>: {cdict.rdict}        </div>
    <div class="w-1/2 text-right text-green-600">              {cdict.dname}            </div>
  </div>
  {#if cdict.fls}
    <div class="p-2 text-green-700"> morph: {prettyMorph(cdict.fls)} </div>
  {/if}
  <div class="trns max-h-24 overflow-y-auto bg-gray-100 px-4">
    {#each cdict.trns as trn}
      {trn}<br>
    {/each}
  </div>
</div>
