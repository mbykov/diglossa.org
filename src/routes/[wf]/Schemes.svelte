<script>
    import _ from 'lodash'

    const log = console.log

    let { conts } = $props()

    let schemes = $derived.by(() => {
		let schemes = []
		for (let cont of conts) {
            for (let scheme of cont.schemes) {
                let htmls = scheme.map(segment=> segment.seg)
                let htmls_ = scheme.map(segment=> {
                    return '<span class=">' + segment.seg + '</span>'
                })
                let html = htmls.join('-')
			    schemes.push(html)
            }
		}
		return schemes
	});

    $inspect('_schms conts', conts)
    $inspect('_schemes', schemes)

    function showSegment() {
        log('_showSegment')
    }

</script>

<div class="bg-white px-4 w-60 flex justify-between" on:click={showSegment}>
    <ul class="pr-8_">
        {#each schemes as html}
          <li>
              {@html html}
          </li>
        {/each}
      </ul>
</div>
