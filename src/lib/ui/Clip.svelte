<script>
    import { chunks, fontsize, locale, oexample } from "$lib/shared.svelte";
    import { Button } from 'flowbite-svelte';
    // import { getContext } from 'svelte';
    import _ from 'lodash';
    import { onMount } from 'svelte'
    import { setfontsize } from "$lib/ui/setFontSize.js";
    import { getContext } from 'svelte';

    const log = console.log

    let { newchunk } = $props()

    let chunk = $state({})

    onMount(async () => {
        setfontsize()
    })

    // $inspect('_clip C', chunk)
    // $inspect('_clip NC', newchunk)

    $effect(()=> {
        let cchunk = ''
        for (let cchunk of chunks.current) {
            delete cchunk.new
            if (cchunk.current) setCchunk(cchunk)
        }
    })

    $effect(()=> {
        if (newchunk) chunk = newchunk
    })

    function setCchunk(param) {
        chunk = param
    }

    function onClipPaste(ev) {
        const copiedText = ev.clipboardData.getData('text/plain');
        let rows = copiedText.trim().split('\n')
        if (!rows.length) return
        let title = rows[0].slice(0, 100)
        if (!title) return
        let now = new Date()
        let date = now.toLocaleDateString(locale.current)

        chunk = {date, title, rows, current: true, new: true}
    }

    function saveCurrent(ev) {
        let newch = JSON.parse(JSON.stringify(chunk))
        delete newch.new
        for (let chunk of chunks.current) {
            chunk.current = false
        }
        chunks.current.unshift(newch)
    }


</script>

<svelte:window on:paste={onClipPaste} />

{#await chunk then ctext}
  <div class="p-4 h-[calc(100vh-86px)] h-screen_ overflow-y-scroll" >
      {#if ctext.new}
        <Button color="green" class="float-right" on:click={saveCurrent}>Save</Button>
      {/if}

      {#if ctext.title}
      <div class="stext flex flex-row justify-between py-2 px-4 cursor-pointer" >
          <div class="stext-head px-2">
              <span class="bg-green-300 rounded p-1 px-2">{ctext.date}</span> - <span class="font-bold">{ctext.title}</span>
          </div>
      </div>

      <div class="stext-body px-2">
          {#each ctext.rows as row}
            <p class="text pb-2">{@html row.replace(/([^\p{P} \n]+)/ug, " <span class=\"wf\">$1</span>")}</p>
          {/each}
      </div>
      {/if}
  </div>

{/await}
