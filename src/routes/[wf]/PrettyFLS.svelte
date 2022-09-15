<script>
  import _ from 'lodash'

  export let chain
  // $: fls = chain.find(seg=> seg.fls).fls
  // $: console.log('_Pretty FLS', chain)

  $: morphs = prettyFLS(chain)
  // $: console.log('_Pretty MORPHS', morphs)

  function prettyFLS(chain) {
      let mseg = chain.find(seg=> seg.mainseg)
      let fls = chain.find(seg=> seg.fls).fls
      let morphs = ''
      if (mseg.name) morphs = prettyName(fls)
      else if (mseg.verb) morphs = prettyVerb(fls)
      else morphs = prettyVerb(fls)
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

<div class="bg-gray-100 px-4">

        {#each morphs as morph}
          <p class="segments"> {morph}      </p>
        {/each}

</div>
