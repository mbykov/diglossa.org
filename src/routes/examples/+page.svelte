<script>
    import { goto } from '$app/navigation';
    import { page } from '$app/state';
    import _ from 'lodash'

    import { chunks } from "$lib/shared.svelte";
    // import { onMount } from 'svelte'
    const log = console.log

    let { data } = $props()
    let examples = $derived(data.examples)

    // $inspect('_ex data', examples)

    let stexts = $derived.by(()=> {
        let texts = chunks.current.filter(chunk=> chunk.example)
        return texts
    })

    function gotoChunk(ev) {
        let ochunk = ev.target.closest('.stext')
        if (!ochunk) return
        // let index = ochunk.getAttribute('index')
        let title = ochunk.getAttribute('title')
        // log('_goto', title)
        // log('_examples', examples)

        for (let chunk of chunks.current) {
            chunk.current = false
        }

        let byTitle = examples.find(stext=> stext.title == title)
        byTitle.current = true
        byTitle.example = true

        chunks.current.push(byTitle)

        // if (!chunks.current[index]) return
        // chunks.current[index].current = true
        // log('________E, chunks.current', chunks.current)
    }

</script>

<div class="p-4 px-8 h-[calc(100vh-86px)] h-screen_ overflow-y-scroll">
    <h2 class="font-bold px-4">examples</h2>

    {#each [...examples].reverse() as example, index}
      {@const reverseIndex = examples.length - 1 - index}
    <div class="stext flex flex-row justify-between py-2 px-4 cursor-pointer" title={example.title} index={reverseIndex} onclick={gotoChunk}>
        <div class="stext-head px-2">
            <span class="bg-green-300 rounded p-1 px-2">{example.date}</span> - <span class="font-bold">{example.title}</span>
        </div>
        <div class="float-right font-bold text-red-700 delete cursor-pointer" >  </div>
    </div>

    <div class="stext-body px-2">
        {@html example.rows[0]}
    </div>
  {/each}
</div>
