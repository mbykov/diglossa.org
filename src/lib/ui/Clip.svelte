<script>
    import { chunks, fontsize } from "$lib/shared.svelte";
    import { Button } from 'flowbite-svelte';
    import { getContext } from 'svelte';
    import _ from 'lodash';
    import { onMount } from 'svelte'
    import { setfontsize } from "$lib/ui/setFontSize.js";

    const log = console.log

    let { cchunk } = $props()

    // let ctext = { ...cchunk };
    let ctext = JSON.parse(JSON.stringify(cchunk))

    onMount(async () => {
        setfontsize()
    })

    function saveCurrent(ev) {
        log('______________________saveCurrent')
    }

</script>


{#await cchunk then ctext}

  <div class="p-4 h-[calc(100vh-86px)] h-screen_ overflow-y-scroll" >
      <Button color="green" class="float-right" on:click={saveCurrent}>Save</Button>

      <div class="stext flex flex-row justify-between py-2 px-4 cursor-pointer" >
          <div class="stext-head px-2">
              <span class="bg-green-500 rounded p-1">{ctext.date}</span> - <span class="font-bold">{ctext.title}</span>
          </div>
      </div>

      <div class="stext-body px-2">
          <!-- {ctext.rows} -->
          {#each ctext.rows as row}
            <p class="text pb-2">{@html row.replace(/([^\p{P} \n]+)/ug, " <span class=\"wf\">$1</span>")}</p>
          {/each}
      </div>
</div>

{/await}
