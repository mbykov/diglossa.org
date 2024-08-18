<script>

  import Clip from '../clip/+page.svelte';
  import Anthrax from './Anthrax.svelte';
  import { onMount } from 'svelte'

  export let data

  let wf = data.wf
  let chains = data.chains //, cdicts = []

  $: {
    chains = data.chains
    wf = data.wf
    // console.log('_$: +page CHS', chains)
    // console.log('_$: WF', wf)
  }

</script>


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
