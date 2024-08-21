<script>

  import { examples } from "$lib/examples"
  import { browser } from "$app/environment";
  import { onMount } from 'svelte'
  import { textChunk, chunkIdx, currentClip } from '$lib/store.js';
  // import { invalidateAll } from "$app/navigation";


  const log = console.log

  // log('_CLIP example', example)
  onMount(async () => {
      console.log('_CLIP ON_MOUNT_ ')
      showClip()
  })

  // $: if (params && browser) {
  // }

  function showClip() {
      if (!document) return
      let oclip = document.querySelector('#clip-results')
      if (!oclip) return
      oclip.replaceChildren()

      // log('_SC____', $currentClip)

      if (!$currentClip) return
      let rows = $currentClip.split("\n")
      // log('_ROWS!', rows)
      let ochunk = createChunkEl(rows)
      oclip.replaceChildren()
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
