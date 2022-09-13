<script>
  import _ from 'lodash'

  export let cdicts
  $: console.log('_CDICTS', cdicts)

  function prettyMorph(fls) {
    return _.uniq(fls.map(flex=> [flex.gend, flex.numcase].join('.'))).join('; ')
  }

</script>

<div>
  CDICTS
  {#each cdicts as cdict}
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

  {/each}


</div>
