<script>

    import { onMount } from 'svelte'
    import { dbs } from '$lib/store.js';
 // export let dbs
    // let items = [{id: 1, dname: 'wkt', act: true}, {id: 2, dname:  'bbl', act: true}, {id: 3, dname: 'dvr', act: false}]
    // $: console.log('_component-DBS', dbs)

    let items = $dbs

    import {flip} from "svelte/animate";
    import {dndzone} from "svelte-dnd-action";

    let containerWidth = '47vw'
    let itemWidth = '4em'
    const flipDurationMs = 300;

    function handleDndConsider(e) {
        items = e.detail.items;
    }
    function handleDndFinalize(e) {
        items = e.detail.items;
        dbs.update(dbs => {
            return items
        });
    }

    // console.log('_dbs.svelte - $dbs', $dbs)

    let dbkey
    import { createEventDispatcher } from 'svelte'
    const dispatch = createEventDispatcher()

    function eventDname(db) {
        let item = items.find(ddb=> ddb.dname == db.dname)
        item.act = !item.act
        console.log('_DNAME CLICK', item)
        dbkey = JSON.stringify(items)
        dbs.update(dbs => {
            return items
        });

        dispatch('dname', items)
    }

    let parent
    onMount(async () => {
        parent = document.querySelector('#somenode')
  })

</script>

{#key dbkey}
<section style="width:{containerWidth}" use:dndzone={{items, flipDurationMs}} on:consider={handleDndConsider} on:finalize={handleDndFinalize}>
    {#each items as item(item.id)}
        <div class="flake" style="color: {item.act ? 'maroon' : 'grey'}" style_="flex: 0 0 {itemWidth}" animate:flip="{{duration: flipDurationMs}}" on:click={() => eventDname(item)}>
            {item.dname}
        </div>
    {/each}
</section>
{/key}

<!-- {#key dbkey} -->
<!-- <div class="px-4"> -->
<!--   {#each items as item} -->
<!--     {#if item.act} -->
<!--       <\!-- <span class="dict"  on:click={() => eventDname(db)}> {db.dname} </span> -\-> -->
<!--     {:else} -->
<!--       <\!-- <span class="cdict"  on:click={() => eventDname(db)}> {db.dname} </span> -\-> -->
<!--     {/if} -->
<!--   {/each} -->
<!--   <span class="esc w-1/3 text-right"> [x]</span> -->
<!-- </div> -->
<!-- {/key} -->

<style>
    section {
        /* height: 45px; */
        padding: 0.3em;
        /* border: 1px solid black; */
        display: flex;
        overflow-x: scroll;
        /* width: 200px; */
        justify-content: flex-end;
        align-items: top;
        /* justify-content: space-between; */
}
    div.flake {
        height: 40px;
        display: inline-block;
        padding: 0.9em;
        /* border: 1px solid blue; */
        margin: 0 0.15em;
        text-align: center;
        /* vertical-align: text-top; */
        background-color: #eee8aa;
        /* align-content: center; */
    }
</style>
