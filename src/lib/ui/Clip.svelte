<script>
    import { chunks, fontsize, locale } from "$lib/shared.svelte";
    import { Button } from 'flowbite-svelte';
    import { getContext } from 'svelte';
    import _ from 'lodash';
    import { onMount } from 'svelte'
    import { setfontsize } from "$lib/ui/setFontSize.js";

    const log = console.log

    let { cchunk } = $props()
    // let cchunk = {}
    let unique = {}
    // let ctext = $state({rows: [], title: ''})
    // let ctext = { ...cchunk };
    // let ctext = $derived(cchunk)

    // let date = now.toLocaleDateString(locale.current)
    // cchunk = {date, title, rows}
    // let stexts = $state(chunks.current)
    // let stexts = {...chunks.current.chunks}

    // $effect(()=> {
    //     // log('_CHUNKS', chunks.current)
    //     // let stexts = JSON.parse(JSON.stringify(chunks.current))
    //     // let ctext = stexts.find(stext=> stext.current)
    //     // log('_CTEXT EFF', ctext.title)
    //     // if (ctext) setCtext(ctext)
    //     // unique = {}
    // })

    // let stexts = $state(chunks.current)
    // log('_STEXTS', JSON.parse(JSON.stringify(stexts)))

    onMount(async () => {
        setfontsize()
        // let stexts = JSON.parse(JSON.stringify(chunks.current))
        // log('____________CLIP ONMOUNT ', stexts)
        // let ctext = stexts.find(stext=> stext.current)
        // ctext = JSON.parse(JSON.stringify(ctext))
        // if (ctext) setCtext(ctext)
    })

    function setCtext_(param) {
        // ctext = param
        log('_OUTER', ctext)
        unique = {}
    }

    function onPaste(ev) {
        log('______________________CLIP onPaste')
        const copiedText = ev.clipboardData.getData('text/plain');
        let rows = copiedText.trim().split('\n')
        if (!rows.length) return
        let title = rows[0].slice(0, 25)
        if (!title) return
        let now = new Date()
        let date = now.toLocaleDateString(locale.current)
        ctext = {date, title, rows}
        ctext = JSON.parse(JSON.stringify(ctext))
        log('_clip onPaste ctext', ctext)
    }

    function saveCurrent(ev) {
        log('______________________saveCurrent')
    }

</script>

<svelte:window onpaste={onPaste} />

{#await cchunk then ctext}
  <!-- {#key unique} -->
    <!-- ================== {JSON.stringify(ctext)} -->
  <div class="p-4 h-[calc(100vh-86px)] h-screen_ overflow-y-scroll" >
      <Button color="green" class="float-right" on:click={saveCurrent}>Save</Button>

      <div class="stext flex flex-row justify-between py-2 px-4 cursor-pointer" >
          <div class="stext-head px-2">
              <span class="bg-green-500 rounded p-1">{ctext.date}</span> - <span class="font-bold">{ctext.title}</span>
          </div>
      </div>

      <div class="stext-body px-2">
          <!-- ---{ctext.rows} -- -->
          {#each ctext.rows as row}
          <!-- {#each [] as row} -->
            <p class="text pb-2">{@html row.replace(/([^\p{P} \n]+)/ug, " <span class=\"wf\">$1</span>")}</p>
          {/each}
      </div>
  </div>

  <!-- {/key} -->
{/await}
