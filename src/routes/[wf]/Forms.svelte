<script>
  export let probe

  let keys = [], aug, stem
  let vkeys = []
  $: {
      // console.log('_FORMS-keys', probe.rdict, probe.keys)
      if (!probe.aug) probe.aug = ''
      aug = probe.aug ? probe.aug + '-' : ''
      stem = probe.stem + '-'
      if (probe.verb) {
          console.log('_VERB KEYS', probe.keys)
          if (!probe.keys) probe.keys = {}
          for (let tense in probe.keys) {
              let arrterms = probe.keys[tense]
              for (let terms of arrterms) {
                  let vkey = {tense, terms: JSON.parse(terms)}
                  vkeys.push(vkey)
              }
          }
      }
      // console.log('_VK', vkeys)
      console.log('_AUG', aug)
  }

  // $: stem = probe.stem + '-'

  // if (!probe) probe = {}
  // if (!probe.keys) probe.keys = []

  // // console.log('_PROBE-KEYS', probe.keys)
  // // console.log('_PROBE', probe.rdict, probe.verb)

  // $: keys = []
  // $: if (probe.verb) {
  // }

</script>

<div id="popup-forms" class="popup absolute w-auto right-4 top-4 -my-4 h-screen p-4 pl-16 pr-1">
  <div class="h-full bg-[#EBEBCC] shadow-2xl overflow-y-auto">
    <div class="main-title text-right px-2">
      <span class="esc w-1/3 text-right"> [x]</span>
    </div>



<div class="px-4">
  <div class="px-4"> <b>dict</b>: {probe.rdict} <b>stem</b>: {probe.stem} </div>
  <div class="px-4">

    {#if (probe.verb)}
    {#each vkeys as vkey}
      <p><b>{vkey.tense}:</b></p>
      {#if (!/inf/.test(vkey.tense))}
      <ul>
        {#each Object.entries(vkey.terms) as [morph, term] }
          <li>{morph}: {aug}{probe.stem}-{term}</li>
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
          <li>{morph}: {probe.aug}{stem}{term}</li>
        {/each}
      </ul>
    {/each}
  {/if}

  </div>
</div>

  </div>
</div>
