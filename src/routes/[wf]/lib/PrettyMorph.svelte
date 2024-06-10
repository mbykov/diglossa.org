<script>
    import { prettyFLS } from "@mbykov/anthrax/prettyFLS"
    import { prettyIndecl } from "@mbykov/anthrax/prettyIndecl"

    export let chain


    let morphs = []

    $: {
        if (chain.indecl) morphs = prettyIndecl(chain)
        else morphs = prettyFLS(chain)
    }

    $: {
        console.log('_PRETTY-chain', chain)
        console.log('_PRETTY-MORPH', morphs)
    }


</script>

<ul>
    {#if morphs.length}
      <div class="pretty-morphs bg-white p-4">
          {#each morphs as morph, index}
            <li on:click lidx={index} class="pretty-morph">{@html morph}</li>
          {/each}
        </div>
      {/if}
</ul>
