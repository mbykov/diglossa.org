<script>
    export let toggle = () => {}
    export let cdict
    export let pos

</script>

<div class="cdict pb-4">
    <div class="flex pt-1">
        <div class="w-1/2"> <b>dict</b>: {cdict.rdict} <span class="text-green-400">{pos}</span></div>
        <div class="w-1/2 text-right text-green-600"> {cdict.dname}  </div>
    </div>

    <div class="trns max-h-24 overflow-y-auto bg-gray-100 p-4" on:click="{toggle}">
        {#each cdict.trns as trn}
            {trn}<br>
        {/each}
    </div>

</div>
