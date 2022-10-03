<script>
  export let wf
  export let cognates
  export let probe
  import Cdicts from './Cdicts.svelte'

  let cdicts = []
  $: {
      cdicts = cognates
  }
</script>

<div id="popup-cognates" class="popup absolute min-w-full right-4 top-4 -my-4 h-screen p-4 pl-32 pr-1">
  <div class="h-full bg-[#EBEBCC] shadow-2xl overflow-y-auto">
    <div class="main-title text-right px-2">
      <span class="esc w-1/3 text-right"> [x]</span>
    </div>

    <div class="wf px-4 text-green-600">cognates: <b>{wf}</b></div>

    <svelte:component this={Cdicts} {cdicts}   />

  </div>
</div>
