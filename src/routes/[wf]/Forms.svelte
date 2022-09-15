<script>
  export let probe
  $: console.log('_FORMS-probe', probe)
  let cdicts = []

</script>


<div class="px-4">
  {#each cdicts as cdict}
    <div class="cdict">
      <div class="flex pt-4">
        <div class="w-1/2"> <b>dict</b>: {cdict.rdict}</div>
        <div class="w-1/2 text-right text-green-600"> {cdict.dname} </div>
      </div>
      <!-- {#if cdict.fls} -->
      <!--   <div class="p-2 text-green-700"> morph: {prettyMorph(cdict.fls)} </div> -->
      <!-- {/if} -->
      <div class="trns max-h-24 overflow-y-auto bg-gray-100 p-4">
        {#each cdict.trns as trn}
          {trn}<br>
        {/each}
      </div>
    </div>

  {/each}


</div>
