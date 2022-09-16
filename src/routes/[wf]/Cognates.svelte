<script>
  export let wf
  export let cognates
  import Cdicts from './Cdicts.svelte'
  console.log('_XXX_Cognates')
</script>

<div id="popup-cognates" class="popup absolute w-1/3 right-4 top-4 -my-4 h-screen p-4 pr-1">
  <div class="h-full bg-[#EBEBCC] shadow-2xl overflow-y-auto">
    <div class="main-title text-right px-2">
      <span class="esc w-1/3 text-right"> [x]</span>
    </div>

    <div class="wf px-4 text-green-600">cognates: <b>{wf}</b></div>

    <svelte:component this={Cdicts} {cognates}   />

  </div>
</div>
