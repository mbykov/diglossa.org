<script>
  export let wf
  export let chain
  import Cdict from './Cdict.svelte'

  $: console.log('_MAIN wf', wf)
  $: console.log('_MAIN chain', chain)

  let morph, pref

  $: segs = chain.map(seg=> seg.seg).join('-')
  $: mainseg = chain.find(seg=> seg.mainseg)
  $: fls = chain.find(seg=> seg.fls)?.fls

</script>

<div>
  <div class="title flex flex-cols ">
    <div class="wf w-1/2">wf: <b>{wf}</b></div> <div class="segs w-1/2 text-right">segments: {segs}</div>
  </div>

    {#if morph}
      <div class="morph py-2">
        morph: {morph}
        <!-- {#each pref.cdicts as cdict} -->
          <!-- pref: {cdict.rdict} trns: {cdict.trns} -->
        <!-- {/each} -->
      </div>
    {/if}

      {#if pref}
        <div class="pref py-2">

        {#each pref.cdicts as cdict}
          prefix: <b>{cdict.rdict}</b>
        <div class="trns max-h-24 overflow-y-auto bg-gray-100 px-4">

          {#each cdict.trns as trn}
            {trn}<br>
          {/each}
        </div>
      {/each}
    </div>
  {/if}

    {#if mainseg}
      <div class="mainseg py-2">
        {#each mainseg.cdicts as cdict}
          <svelte:component this={Cdict} {cdict} {fls} />
        {/each}
      </div>
    {/if}
</div>
