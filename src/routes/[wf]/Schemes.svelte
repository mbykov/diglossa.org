<script>
  export let schemes
  // $: console.log('_SCHM_', schemes)
</script>

<div class="bg-white px-4">
  {#each schemes as scheme, index}
    <p {index} class="scheme">{@html scheme}</p>
  {/each}
</div>
