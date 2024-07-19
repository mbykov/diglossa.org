<script>

  import { examples } from "$lib/examples"
  import { browser } from "$app/environment";
  import { onMount } from 'svelte'
  import { textChunk, chunkIdx } from '$lib/store.js';
  // import { invalidateAll } from "$app/navigation";

  const log = console.log
  export let example
  export let textindex

  // log('_CLIP example', example)
  // log('_CLIP textindex', textindex)

  $: if (browser) {
    showStore(textindex)
  }

  function showStore(textindex) {
    // console.log('_showStore start', textindex)
    // console.log('_show_Chunk Example', data)
    if (!document) return
    let oclip = document.querySelector('#clip-results')
    // console.log('_after_goto_2', oclip)
    if (!oclip) return
    oclip.replaceChildren()

    // console.log('_showStore rows start')
    let rows = []
    let idx = 0
    if (!$textChunk) {
      console.log('_NO TEXT CHUNK, let example')
      // let lastChunk = data.example.trim()
      // currentRows = lastChunk.split('\n')
      // textChunk.update(text => {
        // text = JSON.stringify([currentRows])
        // return text
      // });
    } else {
      // console.log('_YES TEXT CHUNK')
      try {
        let savedTexts = JSON.parse($textChunk)
        // console.log('_savedTexts:', savedTexts)
        // console.log('_show store CLIP IDX:', textindex, $chunkIdx)
        idx = textindex || $chunkIdx
        rows = savedTexts[idx*1]
        // console.log('_rows_0', idx, rows)
        if (!rows) rows = []

        chunkIdx.update(text => {
          text = idx
          return text
        });

        // log('_currentRows $chunkIdx', $chunkIdx)
        // log('_currentRows savedTexts', currentRows)
      } catch(err) {
        // console.log('_can_not_parse savedTexts')
        return
      }
    }

    let ochunk = createChunkEl(rows)
    // console.log('_rows__', idx, rows)
    oclip.replaceChildren()
    oclip.appendChild(ochunk)
  }

  onMount(async () => {
    // console.log('_ON_MOUNT_LAYOUT ')
    showStore()
  })

  $: if (example && browser) {
    showExample(example)
  }

  function showExample(example) {
    if (!document) return
    let oclip = document.querySelector('#clip-results')
    if (!oclip) return
    // log('___oclip', oclip)
    oclip.replaceChildren()
    let rows = example.text.split("\n")
    // log('_rows', rows)
    let ochunk = createChunkEl(rows)
    // console.log('_ochunk', ochunk)
    oclip.appendChild(ochunk)
  }

  // $: console.log('_text exindex', exindex)

  function createChunkEl(rows) {
    // console.log('_create chunk for rows', rows)
    let ochunk = document.createElement('div')
    // let rows = str.split("\n")
    for (let row of rows) {
      // console.log('_ROW', row)
      let html = row.replace(/([^\p{P} \n]+)/ug, " <span class=\"wf\">$1</span>")
      let opar = document.createElement('p')
      opar.innerHTML = html
      ochunk.appendChild(opar)
    }
    return ochunk
  }


</script>


<div class="p-4 border-2 md:w-1/2_ overflow-auto" id="clip-results">

  <p>aasdads aasdads aasdads aasdads aasdads aasdads aasdads aasdads aasdads aasdads aasdads aasdads aasdads aasdads aasdads aasdads aasdads aasdads aasdads </p>
  <p>aasdads</p>
  <p>aasdads</p>
  <p>aasdads</p>
  <p>aasdads</p>
  <p>aasdads</p>
  <p>aasdads</p>
  <p>aasdads</p>
  <p>aasdads</p>
  <p>aasdads</p>
  <p>aasdads</p>
  <p>aasdads</p>
  <p>aasdads</p>
  <p>aasdads</p>
  <p>aasdads</p>
  <p>aasdads</p>
  <p>aasdads</p>
  <p>aasdads</p>
  <p>aasdads</p>
  <p>aasdads</p>
  <p>aasdads</p>
  <p>aasdads</p>
  <p>aasdads</p>
</div>
