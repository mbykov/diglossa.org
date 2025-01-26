<script>

    import Morphs from './Morphs.svelte'
    const log = console.log

    let { chain } = $props()
    // log('______CHAIN chain', chain)

    function toggle(ev) {
      let target = ev.target
      if (!target.classList.contains('trns')) return
      target.classList.toggle('overflow-y-auto')
      target.classList.toggle('max-h-24')
    }

    let morphs = {}

</script>


<div class="anthrax-chain">

    {#each chain.cdicts as cdict}

      <div class="cdict-head flex justify-between py-4">
          <div class="cdict-rdict ">
              dict: <span class="text-green-800 font-bold">{cdict.rdict}</span>
          </div>
          <div class="cdict-morphs">
              <!-- morphs: {cdict.morphs} -->
              {#if cdict.morphs}
                <Morphs {cdict} />
              {/if}
          </div>
      </div>

      <!-- {#each Object.entries(cdict.trn) as [dname, trns]} -->
        <!-- <p> dict key: {dname}</p> -->
        <!-- <p> trns: {trns}</p> -->
      <!-- {/each} -->
      {#each Object.entries(cdict.trn) as [dname, trns]}

          <div class="flex justify-between sticky_ border_ border-green-500_ px-2">
              <div class="grow trns max-h-24 overflow-y-auto bg-gray-200 p-4 w-full my-2" on:click="{toggle}">
                  {#each cdict.trn[dname] as trn}
                    {@html trn}<br>
                  <!-- {@html trn.replace(/([^\p{P} \n]+)/ug, " <span class=\"wf\">$1</span>")}<br> -->
                {/each}
              </div>

              <div class="cursor-pointer border_ border-blue-500_ text-green-500 font-bold p-2" >
                  {dname}
              </div>
          </div>

        {/each}

      {/each}
</div>
