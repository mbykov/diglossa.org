<script>

    import { onMount } from 'svelte'
    import { goto } from '$app/navigation';

</script>

<div class="attention p-4 m-4 bg-white">
    <p>select and copy ctrl-C any Ancient Greek text (UTF-8) anywhere,</p>
    <p>then ctrl-V here, as if you pasting it</p>
    <p>click a greek word</p>
    <p></p>
</div>


<p> ======================== hot keys ====================</p>

<div class="pt-12 font-bold text-pink-700">
    keys with control
</div>
<div id="controlKeys" class=" px-8" >
    <!-- {#each savedTexts as chunk, index} -->
        <p class="" > - ctrl-c - copy wordform under consideration, do not select </p>
        <p class="" > - ctrl-v - as if you paste some text here  </p>
        <!-- </div> -->
      <!-- {/each} -->
</div>

<div class="pt-12 font-bold text-pink-700">
    keys without control, just press a key to open...
</div>

<div id="controlKeys" class=" px-8" >
    <p class="" > - h - home</p>
    <p class="" > - r - relatives</p>
    <p class="" > - d - dictionaries</p>
    <!-- <p class="" > - f - forms ?</p> -->
    <p class="" > - w - wictionary.org</p>
    <p class="" > - p - perseus.tufts.edu</p>
    <p class="" > - s - strong, biblehub.com</p>
    <!-- <p class="" > - u - souda, http://www.cs.uky.edu/~raphael/sol/sol-html/</p> -->
</div>
