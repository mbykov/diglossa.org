
<script>
  import Clip from '../clip/+page.svelte';
  import { Listgroup, ListgroupItem } from 'flowbite-svelte';
  import { TrashBinSolid } from 'flowbite-svelte-icons';
  import { textChunk, chunkIdx } from '$lib/store.js';
  import { Button } from 'flowbite-svelte';
  import { invalidateAll } from "$app/navigation";


  const log = console.log

  let textindex = 0
  let rows = []
  let savedTexts = []

  function getText(ev) {
    try {
      savedTexts = JSON.parse($textChunk)
      log('_______________________________savedTexts', savedTexts)
    } catch(err) {
      console.log('_can_not_parse savedTexts')
    }
  }

  getText()

  // let headers = savedTexts.map((rows, idx)=> {
  //   return {idx, str: rows[0].slice(0, 50)}
  // })

  let headers = savedTexts.map(rows=> rows[0].slice(0, 50))

  log('_______________________________HEADERS', headers)

  function deleteText(ev) {
    console.log('_DEL', ev)
  }

  function showText(ev) {
    textindex = ev.target.getAttribute('index')
    console.log('_texts GO TO textindex', textindex)
    invalidateAll('/')
  }


</script>

<!-- <svelte:window on:keydown={onKeyDown} on:paste={onPaste} on:click={onWinClick} /> -->
<!-- <svelte:window on:paste={onPaste} /> -->


<div class="border-2 border-red-500 h-fit_ flex w-full justify-between gap-2 relative">

  <div class="p-4 border-2 md:w-1/2 overflow-auto">
    <Clip {textindex} />
  </div>


  <div class="md:w-1/2 w-full border-green-500_ absolute top-0 right-0 bg-white p-8">

    <h3 class="p-1 text-xl font-medium text-gray-900 dark:text-white">My texts</h3>

    {#each headers as header, index}
      <Button outline={true} class="!p-2 w-full m-2 hover:bg-sky-100 hover:text-slate-900"  size="lg">

        <div class="flex w-full justify-between text-base w-full">
          <div {index} on:click={showText}>
            {header}
          </div>
          <div on:click={deleteText}>
            <TrashBinSolid class="w-6 h-6 ms-1 me-2 text-red-600"  />
          </div>
        </div>

      </Button>

    {/each}

  </div>

</div>
