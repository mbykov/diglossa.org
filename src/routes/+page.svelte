<script>
  import { Indicator } from 'flowbite-svelte';
  import { onMount } from 'svelte';
  // import Anthrax from './anthrax/+page.svelte';
  import Clip from './clip/+page.svelte';

  // export let component
  // $: console.log('_COMP', component)

  let str = ''

</script>

<!-- <svelte:window on:paste={onPaste} /> -->


<div class=" h-fit_ flex w-full justify-between gap-2 relative">

  <div class="p-4  md:w-1/2 overflow-auto">

    <!-- <Clip /> -->

  </div>


  <div class="md:w-1/2 w-full absolute top-0 right-0 bg-white ">

  <!-- {#key unique} -->
  <!-- <Anthrax {str} /> -->
  <!-- {/key} -->

  </div>

</div>
