<script>
  import { Indicator } from 'flowbite-svelte';
  import { onMount } from 'svelte';
  import Anthrax from './anthrax/+page.svelte';
  import Clip from './clip/+page.svelte';

  // export let component
  // $: console.log('_COMP', component)

  // let unique = {}
  let str = ''

  async function showSegment(ev) {
    unique = {}
    // await import('./Anthrax.svelte')
    str = ev.target.textContent
    console.log('_main', str)
  }

</script>


<div class="border-2 border-red-500 h-fit_ flex w-full justify-between gap-2 relative">

  <div class="p-4 border-2 md:w-1/2 overflow-auto">

    <Clip />
  </div>


  <div class="md:w-1/2 w-full border-green-500_ absolute top-0 right-0 bg-white ">

  <!-- {#key unique} -->
  <Anthrax {str} />
  <!-- {/key} -->

  </div>

</div>
