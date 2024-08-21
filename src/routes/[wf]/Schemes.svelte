<script>
  export let schemes
  // $: console.log('_SCHM_', schemes)
</script>

<div>
  {#each schemes as scheme, index}
    <p {index} class="scheme">{@html scheme}</p>
  {/each}
  </div>
