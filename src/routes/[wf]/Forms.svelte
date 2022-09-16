<script>
  export let probe
  // $: console.log('_FORMS-probe', probe.rdict, probe.keys.length)
  $: stem = probe.stem + '-'
  $: aug = probe.aug ? probe.aug + '-' : ''

  if (!probe) probe = {}
  if (!probe.keys) probe.keys = []

  // console.log('_PROBE-KEYS', probe.keys)
  // console.log('_PROBE', probe.rdict, probe.verb)

  $: keys = []
  $: if (probe.verb) {
      keys = probe.keys.map(key=> JSON.parse(key))
  }
  // console.log('_F-KEYS', keys)

</script>


<div class="px-4">
  <div class="px-4"> <b>dict</b>: {probe.rdict} <b>stem</b>: {probe.stem} </div>
  <div class="px-4">

    {#if (probe.verb)}
    {#each keys as key}
      <p><b>{key.tense}:</b></p>
      {#if (!/inf/.test(key.tense))}
      <ul>
        {#each Object.entries(key.terms) as [morph, term] }
          <li>{morph}: {probe.stem}-{term}</li>
        {/each}
      </ul>
      {:else}
        <ul>
          <li>{probe.stem}-{key.terms}</li>
        </ul>
      {/if}
    {/each}

  {:else}

  {#each Object.entries(probe.keys) as [gend, json]}
      <p><b>{gend}</b>:</p>
      <ul>
        {#each Object.entries(JSON.parse(json)) as [morph, term]}
          <li>{morph}: {aug}{stem}{term}</li>
        {/each}
      </ul>
    {/each}

  {/if}

  </div>

</div>
