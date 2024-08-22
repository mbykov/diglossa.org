<script>
  import { AngleDownOutline, AngleUpOutline } from 'flowbite-svelte-icons'
  export let cdict
  // $: morphs = cdict.morphs
  // $: console.log('_CM', cdict.morphs)

  let mains, stuffs
  $: {
      mains = cdict.morphs.filter(morph=> !/\.du\./.test(morph) && !/\.voc/.test(morph))
      stuffs = cdict.morphs.filter(morph=> /\.du\./.test(morph) || /\.voc/.test(morph))
  }

  let showStuff = false

  function toggleStuff(ev) {
      showStuff = !showStuff
      console.log('______________________________________MMMMM', cdict.morphs, mains)
  }

</script>

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
      {#if showStuff}
        <AngleUpOutline />
      {:else}
        <AngleDownOutline />
      {/if}
    {/if}
  </div>
</div>
