<script>
    import _ from 'lodash'
    export let chain
    export let pos
    export let fls

    $: morphs = prettyFLS(chain)

    function prettyFLS(chain) {
        let morphs = ''
        let main = chain.find(segment=> segment.main)
        let indecl = chain.find(segment=> segment.indecl)
        if (main) {
            probe = main.cdicts[0]
            let pos = (probe.verb) ? 'verb' : 'name'
            let fls = chain.find(segment=> segment.fls).fls
            console.log('_prettyFLS chain', chain)
            if (pos == 'name') morphs = prettyName(fls)
            else if (pos == 'verb') morphs = prettyVerb(fls)
        } else {
            let fls = indecl.cdicts[0].fls
            morphs = prettyName(fls)
        }

        console.log('_fls', fls)
        return morphs
    }


  function prettyVerb(fls) {
    let morphs = fls.map(flex=> {
      let str
      // if (flex.part) str =[ [flex.tense, flex.numper].join('.'),  [flex.gend, 'sg.nom'].join('.') ].join(', ')
      if (flex.part) str = 'participle etc'
      // else str = [[flex.time, flex.voice, flex.mood].join('.'),  [flex.num, flex.per].join('.') ].join(', ')
      else str = [[flex.time, flex.voice, flex.mood].join('.'),  flex.numper ].join(', ')
      return str
      })
    return _.uniq(morphs).sort()
  }

    function prettyName(fls) {
        console.log('_prettyName fls', fls)
        let morphs = fls.map(flex=> {
            let numcase = [flex.num, flex.case].join('.')
            return  [flex.gend, numcase].join('.')
        })
        // console.log('_morphs', morphs)
        return _.uniq(morphs).sort()
    }


        function prettyFLS_(chain) {
        let morphs = ''
        let fls = []
        let indecl = chain.find(seg=> seg.indecl)
        if (indecl) {
            let probe = indecl.cdicts.find(cdict=> cdict.dname == 'wkt' && cdict.fls)
            // console.log('_dddddddddddddddddd', probe.morphs)
            if (!probe) return []
            if (probe.name) morphs = prettyName(probe.fls)
            else if (probe.verb) morphs = prettyVerb(probe.fls)
            else morphs = prettyName(probe.fls)
        } else {
            let mseg = chain.find(seg=> seg.main)
            // console.log('_mseg', mseg)
            fls = chain.find(seg=> seg.fls).fls
            if (mseg.name) morphs = prettyName(fls)
            else if (mseg.verb) morphs = prettyVerb(fls)
            // else morphs = prettyVerb(fls)
        }
        // console.log('_morphs', morphs)
        return morphs
    }

</script>


<div class="bg-gray-100 p-2">
  <ul class="morph">
  {#each morphs as morph}
    <li class=""> {morph} </li>
  {/each}
  </ul>
</div>
