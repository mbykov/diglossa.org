<script>

    import { onMount } from 'svelte'
    import { goto } from '$app/navigation';
    // import { Dictionaries } from "@mbykov/anthrax/config"
    import { examples } from "$lib/examples"

    console.log('_examples', examples)

</script>



<p> ======================== EXAMPLES ====================</p>

<div class="pt-12 font-bold text-pink-700">
    keys with control
</div>
<div id="controlKeys" class=" px-8" >
    <!-- {#each savedTexts as chunk, index} -->
      <!-- <div class="chunk " on:click={handleChunk}> -->
        <p class="" > - ctrl-c - copy wordform under consideration, do not select </p>
        <p class="" > - ctrl-v - as if you paste some text here  </p>
        <!-- </div> -->
      <!-- {/each} -->
</div>
