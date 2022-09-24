<script>

  export let cdicts
  // export let cognates
  // $: if (!cdicts) cdicts = cognates
  $: console.log('_component-CDICTS', cdicts)

</script>

<div class="px-4">
  {#each cdicts as cdict}
    <div class="cdict">

      <div class="flex pt-4">
        <div class="w-1/2"> <b>dict</b>: {cdict.rdict}</div>
        <div class="w-1/2 text-right text-green-600"> {cdict.dname} </div>
      </div>

      <div class="trns max-h-24 overflow-y-auto bg-gray-100 p-4" on:click={console.log('kuku')}>
        {#each cdict.trns as trn}
          {trn}<br>
        {/each}
      </div>

    </div>
  {/each}
</div>
