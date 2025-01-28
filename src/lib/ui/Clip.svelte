<script>
    import { chunks, fontsize, locale } from "$lib/shared.svelte";
    import { Button } from 'flowbite-svelte';
    import { getContext } from 'svelte';
    import _ from 'lodash';
    import { onMount } from 'svelte'
    import { setfontsize } from "$lib/ui/setFontSize.js";

    const log = console.log

    // let { cchunk } = $props()

    let chunk = $state({})
    let ctext = $state({})

    onMount(async () => {
        setfontsize()
    })

    $effect(()=> {
        let cchunk = ''
        for (let cchunk of chunks.current) {
            // let cc = JSON.parse(JSON.stringify(cchunk))
            // if (cc.current) cchunk = cc
            // else continue
            // log('___________________CUR', cchunk.current, cchunk.title)
            delete cchunk.new
            if (cchunk.current) setCchunk(cchunk)
        }
    })

    function setCchunk(param) {
        chunk = param
    }

    function onPaste(ev) {
        const copiedText = ev.clipboardData.getData('text/plain');
        let rows = copiedText.trim().split('\n')
        if (!rows.length) return
        let title = rows[0].slice(0, 25)
        if (!title) return
        let now = new Date()
        let date = now.toLocaleDateString(locale.current)
        chunk = {date, title, rows, new: true}
    }

    function saveCurrent(ev) {
        let newch = JSON.parse(JSON.stringify(chunk))
        log('______________________saveCurrent', newch)
        delete newch.new
        chunks.current.push(newch)
    }

</script>

<svelte:window onpaste={onPaste} />

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
