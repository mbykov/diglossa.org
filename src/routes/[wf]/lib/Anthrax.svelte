<script>
    export let chains
    export let wf
    import Chain from './Chain.svelte'

</script>

<!-- =============== ANTHRAX ========== -->

<div class="h-full bg-[#FAFAD2] shadow-2xl overflow-y-auto px-4">
    <div class=" p-2 my-4 bg-white  flex justify-between ">
        <div class="">
            <span class="wordform font-bold text-amber-700">{wf}</span>
        </div>
        <div class="">
            dictionaries
        </div>
    </div>

    {#each chains as chain}
        <Chain { chain } {wf} />
    {/each}
</div>
