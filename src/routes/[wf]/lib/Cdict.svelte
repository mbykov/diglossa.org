<script>
    export let toggle = () => {}
    export let cdict

    // let pos = 'kuku'
    $: pos = (cdict.name) ? 'name' : (cdict.verb) ? 'verb' : ''
    if (cdict.gend) pos = [pos, cdict.gend].join('; ')
    // console.log('_CDICT', cdict)

    $: trns = cdict.trns || []

    let greekUnicode = /[\u{0370}-\u{03FF}\u{1F00}-\u{1FFF}]/u
    $: trns = trns.map(trn=> {
        if (!trn) return ''
        // return trn.replace(/([^\p{P} \n]+)[\u{0370}-\u{03FF}\u{1F00}-\u{1FFF} ]/ug, " <span class=\"wf\">$1</span>")
        return trn.replace(/([\u{0370}-\u{03FF}\u{1F00}-\u{1FFF}]+)/ug, "<span class=\"wf\">$1</span>")
    })

</script>

<div class="cdict pb-4">
    <div class="flex pt-1">
        <div class="w-1/2"> <b>dict</b>: <span class="wf">{cdict.rdict}</span> <span class="text-green-400">{pos}</span></div>
        <div class="w-1/2 text-right text-green-600"> {cdict.dname}  </div>
    </div>

    <!-- let html = row.replace(/([^\p{P} \n]+)/ug, " <span class=\"wf\">$1</span>") -->
            <!-- {trn}<br> -->

    <div class="trns max-h-24 overflow-y-auto bg-gray-100 p-4" on:click="{toggle}">
        {#each trns as trn}
            {@html trn}<br>
            <!-- {@html trn.replace(/([^\p{P} \n]+)/ug, " <span class=\"wf\">$1</span>")}<br> -->
        {/each}
    </div>

</div>
