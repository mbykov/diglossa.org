<script>
  import _ from 'lodash'

  export let fls
  $: console.log('_FLS', fls)

  function prettyName(fls) {
      let morphs = fls.map(flex=> {
          return  [flex.gend, flex.numcase].join('.')
      })
      return _.uniq(morphs).sort()
  }
  $: morphs = prettyName(fls)
  $: console.log('_MORPHS', morphs)

</script>

<div class="bg-gray-100 px-4">

        {#each morphs as morph}
          <p class="segments"> {morph}      </p>
        {/each}

</div>
