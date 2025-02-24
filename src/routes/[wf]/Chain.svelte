<script>

    // import { odicts } from "$lib/shared.svelte";
    import Morphs from './Morphs.svelte'
    import _ from 'lodash'
    const log = console.log

    let { chain } = $props()
    // chain = {...chain}
    log('______CHAIN.svelte chain', chain)
    // let schemes = $derived(chain.cdicts.map(cdict=> cdict.scheme))
    // schemes = JSON.parse(JSON.stringify(schemes))
    // let json = JSON.stringify(schemes)
    // schemes = JSON.parse(json)
    // log('______schemes', schemes)

    function toggle(ev) {
        let target = ev.target
        let otrns = target.closest('.trns')
        if (!otrns) return
        otrns.classList.toggle('overflow-y-auto')
        otrns.classList.toggle('max-h-24')
    }

</script>


<!-- {#each Object.entries(cdict.trn) as [dname, trns]} -->
<div class="anthrax-chain">

    {#each chain.cdicts as cdict}
      <!-- <p>{JSON.stringify(cdict.trns)}</p> -->
      <div class="cdict-head flex justify-between py-4">
          <div class="cdict-rdict ">
              dict: <span class="text-green-800 font-bold">{cdict.rdict}</span>
          </div>
          <div class="cdict-morphs">
              {#if cdict.morphs}
                <Morphs {cdict} />
              {/if}
          </div>
      </div>

      <!-- {@html trn.replace(/([^\p{P} \n]+)/ug, " <span class=\"wf\">$1</span>")}<br> -->
      <div class="flex_ justify-between_ sticky_ border_ border-green-500_ px-2">
          <div class="" >
              {#each cdict.trns as trn}
                <div class="trns grow max-h-24 overflow-y-auto bg-gray-200 p-4 w-full my-2 flex justify-between" onclick="{toggle}">
                    <div >{@html trn.trns}</div>
                    <div class="cursor-pointer_ border_ border-blue-500_ text-green-500 font-bold p-2 float-right">{trn.dname}</div>
                </div>
              {/each}
            </div>

        <!-- <div class="cursor-pointer border_ border-blue-500_ text-green-500 font-bold p-2" > -->
        <!--   {cdict.dname} -->
        <!-- </div> -->
      </div>

      {/each}

</div>
