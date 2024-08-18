<script>
  // import { Indicator } from 'flowbite-svelte';
  // import { onMount } from 'svelte';
  // import Anthrax from './anthrax/+page.svelte';
  import Clip from './clip/+page.svelte';

  import Anthrax from './\[wf\]/Anthrax.svelte';
  // export let component
  // $: console.log('_COMP', component)

  let wf = ''
  let chains = []

</script>

<!-- <svelte:window on:paste={onPaste} /> -->


<!-- <div class=" h-fit_ flex w-full justify-between gap-2 relative"> -->

<!--   <div class="p-4  md:w-1/2 overflow-auto"> -->
<!--     <Clip /> -->
<!--   </div> -->

<!--   <div class="md:w-1/2 w-full absolute top-0 right-0 bg-white "> -->
<!--     =============================== +PAGE ROTES -->
<!--   <\!-- {#key unique} -\-> -->
<!--   <\!-- <Anthrax {str} /> -\-> -->
<!--   <\!-- {/key} -\-> -->
<!--   </div> -->

<!-- </div> -->


<!-- <div class="h-full_ md:flex flex-wrap_ w-full md:justify-between gap-2_"> -->
<div class="sm:grid grid-cols-1 sm:grid-cols-2 gap-1_ h-screen overflow-hidden">

  <!-- <div class="md:w-1/2 w-full absolute_ top-0 right-0 overflow-auto h-full_x bg-white" > -->
  <div class="p-4 md:w-1/2_ overflow-auto_ md:order-last order-first_ h-screen_">

    <Anthrax {chains} {wf} />

  </div>

  <div class="p-4 md:w-1/2_ overflow-auto h-full ">
    <Clip />
  </div>


</div>
