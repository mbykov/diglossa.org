<script>

  // import Cdict from './Cdict.svelte'
  import Cdicts from './Cdicts.svelte'
  import Schemes from './Schemes.svelte'
  import { onMount } from 'svelte'
  import { browser } from "$app/environment"

  export let chains
  export let wf

  $: console.log('_anthrax', wf, chains)

  $: visible = wf
  let showr = false
  let showf = false

  let chain
  let best
  let cdicts = []

  let lidx = 0
  let sidx = 0
  let schemes = []
  let relatives = []
  let forms = []


  $: {
      chain = chains[lidx] || []
      best = selectBest(chains)
      console.log('_best', best)
      cdicts = best.cdicts || []
      console.log('_best chains', chains)
      schemes = chains.map((chain, chidx)=> {
          if (!browser) return ''
          let scheme = []
          chain.scheme.forEach((segment, segidx)=> {
              let html = ''
              let oseg = document.createElement('span')
              oseg.classList.add('seg')
              oseg.textContent = segment.seg
              oseg.setAttribute('chidx', chidx)
              oseg.setAttribute('segidx', segidx)
              if (segment.stem) oseg.setAttribute('dict', segment.dict)
              scheme.push(oseg.outerHTML)
          })
          return scheme.join('-')
      })
      console.log('_scheeeeem', schemes)
  }

  onMount(async () => {
      console.log('_ONM ', chains)
      best = selectBest(chains)
      cdicts = best.cdicts || []

  })

  function selectBest(chains) {
      best = chains[0]
      for (let chain of chains) {
          if (chain.scheme.length <= best.scheme.length) best = chain
      }
      return best
  }


  function closeAnthrax(ev) {
    console.log('_CLOSE')
    visible = false
  }

  function onKeyDown(ev) {
    switch(ev.key) {
        case 'Escape':
          visible = false
          break;
        case 'r':
            showRels()
            break;
        case 'f':
            showForms()
            break;
        case '_x':
          break;
    }
  }

  function showRels() {
      relatives = chain.rels
      relatives = relatives.slice(0, 10)
      console.log('_showRels', relatives)
      showr = true
  }

  function showForms() {
      console.log('_showForms', chain)
      forms = [] //chain.rels
      showr = false
      showf = true
  }

  function showSegment(ev) {
      let target = ev.target
      if (!target) return
      let chidx = target.getAttribute('chidx')*1
      cdicts = chains[chidx].cdicts
  }

</script>

<svelte:window on:keydown={onKeyDown} />


{#if visible}
  <div class="m-4 p-4 shadow-md h-full h-screen w-full w-screen_ overflow-scroll_ md:block_ "  >

    <div class="p-1 flex justify-between ">
      <div class="font-bold text-green-500">
        <span class="wordform">{wf}</span>
      </div>
      <div class="flex close-anthrax cursor-pointer " >
        <div>
          ===
        </div>
        <div>R-F   <span on:click={closeAnthrax}>[x]</span></div>
      </div>
    </div>

    <div class="p-1 flex justify-between sticky_ w-full border border-green-500 ">
      <div class="w-1/2_ border border-blue-500">
        +++++++
      </div>
      <div class="w-1/2_ cursor-pointer border_ border-blue-500" on:click={showSegment}>
        <Schemes {schemes} />
      </div>
    </div>

    {#if showr}
      ==SHOW R ======================================
    <Cdicts cdicts={relatives} />
  {:else if showf}
    ==SHOW F ======================================
  {:else}
    <Cdicts {cdicts} />
  {/if}


</div>
{/if}
