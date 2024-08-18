<script>

  import { examples } from "$lib/examples"
  import { browser } from "$app/environment";
  import { onMount } from 'svelte'
  import { textChunk, chunkIdx } from '$lib/store.js';
  // import { invalidateAll } from "$app/navigation";


  const log = console.log
  // export let example
  export let textindex
  export let exindex

  // log('_CLIP example', example)
  // $: log('_CLIP_ textindex', textindex)
  // $: console.log('_exindex', exindex)

  onMount(async () => {
      // console.log('_ON_MOUNT_LAYOUT ')
      showStore(0)
  })

  $: if (exindex && browser) {
      showExample(exindex)
  }

  $: if (textindex && browser) {
      // showStore(textindex)
  }

  function showStore(textindex) {
      if (!document) return
      let oclip = document.querySelector('#clip-results')
      if (!oclip) return
      oclip.replaceChildren()

      let rows = []
      if (!$textChunk) return
      let idx = $chunkIdx || 0

      try {
          let savedTexts = JSON.parse($textChunk)
          rows = savedTexts[idx*1]
          if (!rows) rows = savedTexts[0] || []
      } catch(err) {
          console.log('_can_not_parse savedTexts')
          return
      }


      let ochunk = createChunkEl(rows)
      oclip.replaceChildren()
      oclip.appendChild(ochunk)
  }

  function showExample(exindex) {
      if (!document) return
      let oclip = document.querySelector('#clip-results')
      if (!oclip) return
      oclip.replaceChildren()
      let example = examples[exindex]

      let rows = example.text.split("\n")
      let ochunk = createChunkEl(rows)
      oclip.appendChild(ochunk)
  }


  function createChunkEl(rows) {
      let ochunk = document.createElement('div')
      // let rows = str.split("\n")
      for (let row of rows) {
          let html = row.replace(/([^\p{P} \n]+)/ug, " <span class=\"wf\">$1</span>")
          let opar = document.createElement('p')
          opar.innerHTML = html
          ochunk.appendChild(opar)
      }
      return ochunk
  }


  </script>


<div class="border_ border-green-500_ m-2 p-4 h-full_ h-screen"  >
  <div class="p-4 md:w-1/2_ overflow-auto" id="clip-results">
  </div>
</div>
