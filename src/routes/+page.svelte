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


<div class="sm:grid grid-cols-1 sm:grid-cols-2 gap-1_ h-screen w-screen overflow-hidden">

  <div class="p-4 md:w-1/2_ overflow-auto_ w-screen_ md:order-last order-first_ h-screen_">

    <!-- <Anthrax {chains} {wf} /> -->

  </div>

  <div class="p-4 md:w-1/2_ overflow-auto h-full ">
    <Clip />
  </div>

</div>
