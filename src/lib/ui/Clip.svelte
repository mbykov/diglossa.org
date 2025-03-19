<script>
    import { chunks, fontsize, locale, oexample } from "$lib/shared.svelte";
    import { Button } from 'flowbite-svelte';
    // import { getContext } from 'svelte';
    import _ from 'lodash';
    import { onMount } from 'svelte'
    import { setfontsize } from "$lib/ui/setFontSize.js";

    const log = console.log

    // let { cchunk } = $props()

    let chunk = $state({})
    let ctext = $state({})
    let example = $state({})
    // let example = $derived(oexample.current)

    onMount(async () => {
        setfontsize()
    })

    $effect(()=> {
        let cchunk = ''
        for (let cchunk of chunks.current) {
            delete cchunk.new
            if (cchunk.current) setCchunk(cchunk)
        }
    })

    function setCchunk(param) {
        chunk = param
    }

    let chunk_ = $derived.by(() => {
        let cchunk = {}
        for (let chunk of chunks.current) {
            delete chunk.new
            if (chunk.current) cchunk = chunk
        }
		return cchunk
	});

    function onPaste(ev) {
        log('____________________CLIP ON PASTE')
        return
        const copiedText = ev.clipboardData.getData('text/plain');
        let rows = copiedText.trim().split('\n')
        if (!rows.length) return
        let title = rows[0].slice(0, 25)
        if (!title) return
        let now = new Date()
        let date = now.toLocaleDateString(locale.current)

        // let newchunk = {date, title, rows, new: true, current: true}
        // chunks.current.push(newchunk)
        chunk = {date, title, rows, new: true}
        // log('______________________savepaste', chunk)
    }

    function saveCurrent(ev) {
        let newch = JSON.parse(JSON.stringify(chunk))
        log('______________________saveCurrent', newch)
        delete newch.new
        chunks.current.push(newch)
    }

</script>

<!-- <svelte:window onpaste={onPaste} /> -->

{#await chunk then ctext}
  <div class="p-4 h-[calc(100vh-86px)] h-screen_ overflow-y-scroll" >
      {#if ctext.new}
        <!-- === {JSON.stringify(ctext)} === -->
        <Button color="green" class="float-right" on:click={saveCurrent}>Save</Button>
      {/if}

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
  </div>

{/await}
