<script>
    import { goto } from '$app/navigation';
    import { page } from '$app/state';
    import { setContext, getContext } from 'svelte';
    // import { Button } from 'flowbite-svelte';
    import _ from 'lodash'

    import { chunks } from "$lib/shared.svelte";
    // import { onMount } from 'svelte'

    const log = console.log

    // let stexts = $derived(chunks.current)
    let stexts = $derived.by(()=> {
        // return chunks.current
        let texts = chunks.current.filter(chunk=> !chunk.example)
        return texts
    })

    function delChunk(ev) {
        if (!ev.target.classList.contains('delete')) return
        let ochunk = ev.target.closest('.stext')
        let index = ochunk.getAttribute('index')
        let title = ochunk.getAttribute('title')

        chunks.current = chunks.current.filter(chunk=> chunk.title != title)
    }

    function gotoChunk(ev) {
        let ochunk = ev.target.closest('.stext')
        if (!ochunk) return
        if (ev.target.classList.contains('delete')) return
        let title = ochunk.getAttribute('title')

        for (let chunk of chunks.current) {
            chunk.current = false
        }

        let byTitle = chunks.current.find(stext=> stext.title == title)
        byTitle.current = true

    }

</script>

<div class="p-4 px-8 h-[calc(100vh-86px)] h-screen_ overflow-y-scroll">
    <h2 class="font-bold px-4">saved texts</h2>

    <!-- {#each [...stexts].reverse() as text, index} -->
    {#each [...stexts] as text, index}
      {@const reverseIndex = stexts.length - 1 - index}
    <div class="stext flex flex-row justify-between py-2 px-4 cursor-pointer" title={text.title} index={reverseIndex} onclick={gotoChunk}>
        <div class="stext-head px-2">
            <span class="bg-green-300 rounded p-1 px-2">{text.date}</span> - <span class="font-bold">{text.title}</span>
        </div>
        <div class="float-right font-bold text-red-700 delete cursor-pointer" onclick={delChunk}> [x] </div>
    </div>

    <div class="stext-body px-2">
        <!-- {text.rows.slice(0,2)} -->
    </div>
  {/each}
</div>
