<script>
  import Clip from '../clip/+page.svelte';

  import {flip} from "svelte/animate";
  import {dndzone} from "svelte-dnd-action";
  let items = [
    {id: 1, name: "wkt", active: true},
    {id: 2, name: "lsj", active: true},
    {id: 3, name: "dvr", active: true},
    {id: 4, name: "bbl", active: true}
  ];
  const flipDurationMs = 300;
  function handleDndConsider(e) {
    items = e.detail.items;
    console.log('_C', e.detail)
  }
  function handleDndFinalize(e) {
    items = e.detail.items;
    console.log('_F', e.detail)
  }

  function onClick(e) {
    let dname = e.target.textContent
    let db = items.find(item=> item.name == dname)
    console.log('_CLICK', db)
    db.active = !db.active
  }

</script>

<p> </p>

<div class="h-fit_ flex w-full justify-between gap-2 relative">

  <div class="p-4 md:w-1/2 overflow-auto">

    <Clip />

  </div>


  <div class="md:w-1/2 w-full h-full absolute top-0 right-0  ">

    <h3 class="p-4 text-xl font-medium text-gray-900 dark:text-white">Dictionaries</h3>

    <div class="px-8 ">
      <section use:dndzone="{{items, flipDurationMs}}" on:consider="{handleDndConsider}" on:finalize="{handleDndFinalize}" >
        {#each items as item(item.id)}
          <div animate:flip="{{duration: flipDurationMs}}" class="!p-2 w-full m-2 hover:bg-sky-100 hover:text-slate-900 active:bg-violet-700" on:click="{onClick}">{item.name}</div>
        {/each}
      </section>

    </div>
  </div>

</div>

<style>
  section {
    /* width: 50%; */
    /* padding: 0.3em; */
    /* border: 1px solid black; */
    /* this will allow the dragged element to scroll the list although starting in version 0.9.41 the lib would detect any scrollable parent*/
    /* overflow: scroll; */
    /* height: 200px; */
  }
  div {
    /* width: 50%; */
    /* padding: 0.2em; */
    /* border: 1px solid blue; */
    /* margin: 0.15em 0; */
  }
</style>
