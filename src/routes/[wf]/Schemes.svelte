<script>
    import _ from 'lodash'

    const log = console.log

    let { conts } = $props()

    let schemes = $derived.by(() => {
		let schemes = []
		for (let cont of conts) {
            for (let scheme of cont.schemes) {
                let htmls = scheme.map(segment=> {
                    let span = ''
                    if (segment.type == 'pref') span = '<span class="segment cursor-pointer seg-pref" dict='+segment.seg+'>' + segment.seg + '</span>'
                    else if (segment.type == 'stem') span = '<span class="segment cursor-pointer seg-dict" dict='+segment.dict+'>' + segment.seg + '</span>'
                    else span = '<span class=" ">' + segment.seg + '</span>'
                    return span
                })
                let html = htmls.join('-')
			    schemes.push(html)
            }
		}
		return schemes
	});

    // $inspect('_schms conts', conts)
    // $inspect('_schemes', schemes)

</script>

<div class="bg-white px-4 w-60 flex justify-between">
    <ul class="pr-8_">
        {#each schemes as html}
          <li>
              {@html html}
          </li>
        {/each}
      </ul>
</div>
