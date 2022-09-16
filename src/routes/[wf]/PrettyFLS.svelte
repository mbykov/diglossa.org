<script>
  import _ from 'lodash'

  export let chain
  // $: fls = chain.find(seg=> seg.fls).fls
  // $: console.log('_Pretty FLS', chain)

  $: morphs = prettyFLS(chain)
  // $: console.log('_Pretty MORPHS', morphs)

  function prettyFLS(chain) {
      console.log('_PRETTY CHAIN', chain)
      let morphs = ''
      let fls = []
      let indecl = chain.find(seg=> seg.indecl)
      if (indecl) {
          let probe = indecl.cdicts.find(cdict=> cdict.dname == 'wkt') || indecl.cdicts[0]
          fls = probe.fls || []
          morphs = prettyName(fls)
      } else {
          let mseg = chain.find(seg=> seg.mainseg)
          fls = chain.find(seg=> seg.fls).fls
          if (mseg.name) morphs = prettyName(fls)
          else if (mseg.verb) morphs = prettyVerb(fls)
          else morphs = prettyVerb(fls)
      }
      return morphs
  }

  function prettyVerb(fls) {
      return fls.map(flex=> {
          let str
          // if (flex.part) str =[ [flex.tense, flex.numper].join('.'),  [flex.gend, 'sg.nom'].join('.') ].join(', ')
          if (flex.part) str = [flex.tense,  [flex.gend, flex.numcase].join('.') ].join(', ')
          else str =[flex.tense, flex.numper].join(' ')
          return str
      })
  }

  function prettyName(fls) {
      let morphs = fls.map(flex=> {
          return  [flex.gend, flex.numcase].join('.')
      })
      return _.uniq(morphs).sort()
  }

</script>

<div class="bg-gray-100 p-2">

  <ul class="morph">
  {#each morphs as morph}
    <li class=""> {morph}</li>
  {/each}
  </ul>

</div>
