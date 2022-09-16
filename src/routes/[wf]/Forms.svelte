<script>
  export let probe
  $: console.log('_FORMS-probe', probe.rdict, probe.keys.length)
  $: stem = probe.stem + '-'
  $: aug = probe.aug ? probe.aug + '-' : ''

  $: if (!probe.keys) probe.keys = []

</script>


<div class="px-4">
  <div class="px-4"> <b>dict</b>: {probe.rdict} <b>stem</b>: {probe.stem} </div>

  <div class="px-4">
    {#each Object.entries(probe.keys) as [gend, json]}
      <p><b>{gend}</b>:</p>
      <ul>
    {#each Object.entries(JSON.parse(json)) as [morph, term]}
      <li>{morph}: {aug}{stem}{term}</li>
      {/each}
      </ul>

    {/each}

  </div>
</div>
