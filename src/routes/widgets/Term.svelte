<script>
  export let term
  $: console.log('_TERM-term', term)

  function prettyMorph(fls) {
    return fls.map(flex=> [flex.gend, flex.numcase].join('.')).join('; ')
  }

  </script>

<div>
  <div class="title flex flex-cols ">
      <div class="wf w-1/2 text-green-500"><b>{term.seg}</b></div> <div class="segs w-1/2 text-right"></div>
    </div>

  {#each term.cdicts as cdict}
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

  {/each}

</div>
