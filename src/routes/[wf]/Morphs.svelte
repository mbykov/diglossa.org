<script>
    import { AngleDownOutline, AngleUpOutline } from 'flowbite-svelte-icons'

    let { chain } = $props()

    const log = console.log

    let cdict = $derived(chain.cdict)
    let mains = $derived(cdict.morphs.filter(morph=> !/\.du\./.test(morph) && !/\.voc/.test(morph)))
    let stuffs = $derived(cdict.morphs.filter(morph=> /\.du\./.test(morph) || /\.voc/.test(morph)))

    let showStuff = $state(false)
    // let gray = $state('text-gray-400')

    function toggleStuff(ev) {
      showStuff = !showStuff
      // log('______________________________________STUFF', showStuff, mains, stuffs)
    }

</script>

{#key showStuff}
<div class="bg-white px-4 w-60 flex justify-between" on:click={toggleStuff}>
    <div class="pr-8_">
        {#each mains as morph}
          <p>{morph}</p>
        {/each}
        {#if showStuff}
          {#each stuffs as morph}
            <p class="text-gray-400">{morph}</p>
          {/each}
        {/if}
      </div>

    <div>
        {#if stuffs.length}
          <div class="cursor-pointer">
              {#if showStuff}
                <AngleUpOutline />
              {:else}
                <AngleDownOutline />
              {/if}
            </div>
          {/if}
        </div>
</div>
{/key}
