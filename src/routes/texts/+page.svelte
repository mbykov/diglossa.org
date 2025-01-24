<script>
    import { goto } from '$app/navigation';
    import { page } from '$app/state';
    import { setContext, getContext } from 'svelte';
    // import { Button } from 'flowbite-svelte';
    import _ from 'lodash'
    import LeftHeader from "$lib/ui/LeftHeader.svelte"
    import RightHeader from "$lib/ui/RightHeader.svelte"
    import Clip from "$lib/ui/Clip.svelte"

    import TextChunk from "$lib/ui/TextChunk.svelte"

    import { locale, chunks } from "$lib/shared.svelte";
    import { onMount } from 'svelte'

    const log = console.log

    // let { data } = $props()
    let stexts = JSON.parse(JSON.stringify(chunks.current))
    // log('_TEXTS_stexts_xxx', stexts)
    // log('_TEXTS_data', data)

    function delChunk(ev) {
        if (!ev.target.classList.contains('delete')) return
        let ochunk = ev.target.closest('.stext')
        let index = ochunk.getAttribute('index')
        // log('_Del index', index)
        chunks.current.splice(index, 1)
    }

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
    <h1 class="font-bold px-4"> saved texts {chunks.current.length}</h1>

    {#each stexts as text, index}
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
