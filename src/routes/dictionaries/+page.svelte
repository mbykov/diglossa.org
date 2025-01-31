<script>
    // import DefLocale from "$lib/ui/DefLocale.svelte"
    import SetDefaultFontSize from "$lib/ui/SetDefaultFontSize.svelte"
    import SetDefaultLocale from "$lib/ui/SetDefaultLocale.svelte"

    import { page } from '$app/state';
    import { onMount } from 'svelte'
    import _ from 'lodash'

    import { locale, odicts } from "$lib/shared.svelte";
    // import { Radio, Helper, Button } from 'svelte-5-ui-lib';
    // import { Checkbox } from 'svelte-5-ui-lib';

    import {dndzone} from "svelte-dnd-action";

    const log = console.log

    let dictionary
    let currentCheckBox = {idx: null, checked: false}

    let items = odicts.current

    onMount(async () => {
        for await (let dict of odicts.current) {
            // log('_d', dict.key, dict.active)
        }
    });

    function handleDndConsider(ev) {
        items = ev.detail.items;
    }

    function handleDndFinalize(ev) {
        items = ev.detail.items;
        odicts.current = items
    }

    function checkInput(ev) {
        if (!ev.target.classList.contains('checkbox')) return
        let oinput = ev.target
        let key = oinput.getAttribute('key')
        let changed = items.find(item=> item.key == key)
        // log('_____changed', changed.id, changed.key)
        changed.active = oinput.checked
        odicts.current = items
    }


</script>

<div class="p-4 px-8 h-[calc(100vh-86px)] h-screen_ overflow-y-scroll">
    <div class="header flex p-4 pb-4">
        <h2 class="font-bold text-2xl px-4"> dictionaries </h2>
        <span class="text-gray-500 py-1"> draggable </span>
    </div>

    <section use:dndzone="{{items}}" on:consider="{handleDndConsider}" on:finalize="{handleDndFinalize}">
        {#each items as item (item.id)}
        <div class="langbox rounded bg-gray-300 my-4 w-full border_ border-black_ shadow-lg p-2 px-4" >
            <input idx={item.id} key={item.key} type="checkbox" checked={item.active} class="checkbox" on:click={checkInput}> <span class="px-2"> {item.name} </span>
        </div>

      {/each}
    </section>

</div>
