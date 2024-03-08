<script>
    export let chains

    let schemes = []

    $: {
        schemes = chains.map(chain=> {
            return chain.map((segment, sidx)=> {
                if (segment.seg.conn) return segment.seg
                else return '<span class="seg" sidx=' + sidx + '>' + segment.seg + '</span>'
            }).join('-')
        })
    }

    $: {
        // console.log('_$:pretty_morph', chains)
    }

    function showSegment_(ev) {
        console.log('_seg', ev.target.textContent)
    }


</script>


<ul>
    {#each schemes as scheme, index}
        <li on:click lidx={index} class="scheme">{@html scheme}</li>
    {/each}
</ul>
