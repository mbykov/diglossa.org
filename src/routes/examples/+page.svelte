<script>
    import { goto } from '$app/navigation';
    import { page } from '$app/state';
    // import { Button } from 'flowbite-svelte';
    import _ from 'lodash'

    import {prefixes} from '$lib/examples/prefixes.js'

    import { onMount } from 'svelte'

    const log = console.log

    // let { data } = $props()

    let examples = []

    function gotoChunk(ev) {
        let ochunk = ev.target.closest('.stext')
        if (!ochunk) return
        let index = ochunk.getAttribute('index')

        for (let chunk of chunks.current) {
            chunk.current = false
        }
        chunks.current[index].current = true
        // log('_texts goto', index, chunks.current[index])
    }

</script>

  <!-- <div class="p-4 h-[calc(100vh-86px)] h-screen_ overflow-y-scroll" > -->
<div class="p-4 px-8 h-[calc(100vh-86px)] h-screen_ overflow-y-scroll">
    <h1 class="font-bold px-4"> examples</h1>

    {#each examples as text, index}
      <div class="stext flex flex-row justify-between py-2 px-4 cursor-pointer" {index} onclick={gotoChunk}>
          <div class="stext-head px-2">
              <span class="bg-green-500 rounded p-1">{text.date}</span> - <span class="font-bold">{text.title}</span>
          </div>
          <div class="float-right font-bold text-red-700 delete cursor-pointer" onclick={delChunk}> [x] </div>
      </div>

      <div class="stext-body px-2">
          {text.rows.slice(0,2)}
      </div>
    {/each}

  </div>
