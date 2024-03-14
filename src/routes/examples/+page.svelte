<script>

    import { onMount } from 'svelte'
    import { goto } from '$app/navigation';
    import { examples } from "$lib/examples"

    console.log('_examples', examples)

    function handleChunk(ev) {
        console.log('_E')
    }

</script>

<div class="pt-12 font-bold text-pink-700">
    Examples:
</div>
<div id="examples" class=" px-8" >
    {#each examples as example, index}
      <div class="chunk index: {index} " on:click={handleChunk}>
          <p class="font-bold  text-pink-700" > {example.name} </p>
          {#each example.text.trim().split('\n').slice(0,3) as row}
            <p class="" > - {row} </p>
          {/each}
      </div>
    {/each}
</div>
