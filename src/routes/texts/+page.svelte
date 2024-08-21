
<script>
  import Clip from '../clip/+page.svelte';
  // import { Listgroup, ListgroupItem } from 'flowbite-svelte';
  import { TrashBinSolid } from 'flowbite-svelte-icons';
  import { textChunk, chunkIdx, currentClip } from '$lib/store.js';
  import { Button } from 'flowbite-svelte';

  const log = console.log

  let uniq = {}
  let textindex = 0
  let rows = []
  let savedTexts = []

  function getText(ev) {
    try {
      savedTexts = JSON.parse($textChunk)
    } catch(err) {
      console.log('_can_not_parse savedTexts')
    }
  }

  getText()

  // let headers = savedTexts.map((rows, idx)=> {
  //   return {idx, str: rows[0].slice(0, 50)}
  // })

  let headers = savedTexts.map(rows=> rows[0].slice(0, 50))

  function deleteText(ev) {
    let oclip = document.querySelector('#clip-results')
    let target = ev.target.closest('.texthead')
    let index = target.getAttribute('index')
    console.log('_REMOVE ev.target', target)
    console.log('_REMOVE INDEX', index)
    if (index < 0) return

    uniq = {}
    let currentRows = savedTexts[index]
    savedTexts.splice(index, 1)
    textChunk.update(text => {
      text = JSON.stringify(savedTexts)
      return text
    });
    savedTexts = JSON.parse($textChunk)
    headers = savedTexts.map(rows=> rows[0].slice(0, 50))

    // oclip.replaceChildren()
    // invalidateAll('/')

  }

  function selectText(ev) {
      textindex = ev.target.getAttribute('index')
      // console.log('_texts selectText', textindex)

      chunkIdx.update(text => {
          text = textindex + ''
          return text
      });



    // invalidateAll('/')
  }


</script>

<div class="h-fit_ flex w-full justify-between gap-2 relative">

  <div class="p-4 md:w-1/2 overflow-auto">
    {#key textindex}
    <Clip {textindex} />
    {/key}
  </div>


  <div class="md:w-1/2 w-full absolute top-0 right-0 p-8">

    <h3 class="pl-4 text-xl font-medium text-gray-900 dark:text-white">Saved texts</h3>

    {#key textindex}

    {#each headers as header, index}
      <Button outline={true} class="!p-2 w-full m-2 hover:bg-sky-100 hover:text-slate-900"  size="lg">

        <div {index} class="texthead flex w-full justify-between text-base w-full">
          <div {index} on:click={selectText}>
            {header}
          </div>
          <div on:click={deleteText}>
            <TrashBinSolid class="w-6 h-6 ms-1 me-2 text-red-600"  />
          </div>
        </div>
      </Button>

    {/each}
    {/key}

  </div>
</div>
