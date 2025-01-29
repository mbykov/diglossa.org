<script>
    // import DefLocale from "$lib/ui/DefLocale.svelte"
    import SetDefaultFontSize from "$lib/ui/SetDefaultFontSize.svelte"
    import SetDefaultLocale from "$lib/ui/SetDefaultLocale.svelte"

    import { page } from '$app/state';
    import { onMount } from 'svelte'
    import _ from 'lodash'

    import { locale, odicts } from "$lib/shared.svelte";
    import { Radio, Helper, Button } from 'svelte-5-ui-lib';

    import {dndzone} from "svelte-dnd-action";

    const log = console.log

    // let dicts = $derived(odicts.current)
    let dictionary

    let defaultDicts = [
        {key: 'wkt', lang: 'en', name: 'Wiktionary', active: true, href: 'https://en.wiktionary.org/wiki/Ancient_Greek'},
        {key: 'lsj', lang: 'en', name: 'Liddell, Sckott', active: true, href: 'https://en.wiktionary.org/wiki/Ancient_Greek'},
        {key: 'dvr', lang: 'ru', name: 'И.Х.Дворецкий', active: true, href: 'https://en.wiktionary.org/wiki/Ancient_Greek'},
        {key: 'bbh', lang: 'en', name: 'BibleHub', active: true, href: 'https://en.wiktionary.org/wiki/Ancient_Greek'},
        {key: 'bll', lang: 'fr', name: 'xx Bailly', active: false, href: 'https://en.wiktionary.org/wiki/Ancient_Greek'},
        {key: 'suda', lang: 'en', name: 'Souda', active: false, href: 'https://en.wiktionary.org/wiki/Ancient_Greek'},
    ]

    onMount(async () => {
        // odicts.current = defaultDicts
        // log('_settings: odicts.current', odicts.current.length)

        log('_settings: dicts', odicts.current.length)
        for await (let dict of odicts.current) {
            log('_d', dict.key)
        }

    });

    function setDictionaries(ev) {
        let btn = ev.target
        log('_B', btn.key)
    }

      let items = [
        {id: 1, name: "item1"},
        {id: 2, name: "item2"},
        {id: 3, name: "item3"},
        {id: 4, name: "item4"}
      ];

    function handler(ev) {
        items = ev.detail.items;
        log('_items', items)
    }

    function handleDndConsider(e) {
        items = e.detail.items;
    }
    function handleDndFinalize(e) {
        items = e.detail.items;
    }


</script>

<div class="p-4 px-8 h-[calc(100vh-86px)] h-screen_ overflow-y-scroll">
    <h2 class="font-bold px-4 text-2xl"> dictionaries </h2>

    <!-- <div use:dndzone="{{items: odicts.current}}" on:consider="{handler}" on:finalize="{handler}"> -->
    <!--     <\!-- <div> -\-> -->
    <!--     {#each odicts.current as dict} -->
    <!--       <div class="dict-button p-2"> -->
    <!--           <Button onclick={setDictionaries} class="w-48" color="green" key={dict.key}> {dict.name} </Button> -->
    <!--       </div> -->
    <!--     {/each} -->

    <!-- </div> -->

    <section use:dndzone="{{items}}" on:consider="{handleDndConsider}" on:finalize="{handleDndFinalize}">
        {#each items as item(item.id)}
          <div >{item.name}</div>
        {/each}
      </section>


</div>
