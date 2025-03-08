<script>
    import Morphs from './Morphs.svelte'
    import _ from 'lodash'
    const log = console.log

    let { cdict } = $props()

    $inspect('_Cdict', cdict)

    function toggle(ev) {
        let target = ev.target
        let otrns = target.closest('.trns')
        if (!otrns) return
        otrns.classList.toggle('overflow-y-auto')
        otrns.classList.toggle('max-h-24')
    }

</script>

<div class="translations rdict={cdict.rdict} px-2" rdict={cdict.rdict}>

    <div class="cdict-head flex justify-between py-4">
        <div class="cdict-rdict ">
            dict: <span class="text-green-800 font-bold">{cdict.rdict}</span> <span class="px-4">{cdict.pos}</span>
        </div>
        <div class="cdict-morphs">
            {#if cdict.morphs}
              <Morphs {cdict} />
            {/if}
          </div>
    </div>

    {#each cdict.trns as trn}
      <div class="trns grow_ max-h-24 overflow-y-auto bg-gray-200 p-4 w-full my-2 " onclick="{toggle}">
          <div class="text-green-500 font-bold float-right">{trn.dname}</div>
          <div >
              {#each trn.trns || trn.strs as row}
                <p>{row}</p>
              {/each}
            </div>

      </div>
    {/each}

  </div>
