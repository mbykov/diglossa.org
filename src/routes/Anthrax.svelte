<script>
  export let chain
  export let wf

  import Term from './widgets/Term.svelte'
  import Main from './widgets/Main.svelte'
  // $: console.log('_Anthrax WF', wf)

  $: term = chain.find(seg=> seg.indecl)

  function prettyTerm(term) {
      let fls = term.cdict.fls
      console.log('_TERM FLS', fls)
      if (!fls) return 'kuku'
      return prettyNameFLS(fls)
  }

  function prettyMorph(mainseg, fls) {
    // if (!mainseg) return 'no-mainseg'
    if (mainseg.cdict.verb) {
      return prettyVerbFLS(fls)
    } else if (mainseg.cdict.name) {
      return prettyNameFLS(fls)
    } else {
      return null
    }
  }

  function prettyVerbFLS(fls) {
    return fls.map(flex=> {
      let str
      if (flex.part) str = [flex.tense,  [flex.gend, flex.numcase].join('.') ].join(', ')
      else str =[flex.tense, flex.numper].join(' ')
      return str
    })
  }

  function prettyNameFLS(fls) {
    return fls.map(flex=> {
      return  [flex.gend, flex.numcase].join('.')
    })
  }

</script>

<!-- <div class=""> -->
  <div class="chain p-4">

    {#if term}
      <svelte:component this={Term} {term} />
    {:else}
      <svelte:component this={Main} {wf} {chain} />
    {/if}

  </div>
<!-- </div> -->
