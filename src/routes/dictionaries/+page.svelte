<script>
    // import DefLocale from "$lib/ui/DefLocale.svelte"
    import SetDefaultFontSize from "$lib/ui/SetDefaultFontSize.svelte"
    import SetDefaultLocale from "$lib/ui/SetDefaultLocale.svelte"

    import { page } from '$app/state';
    import { onMount } from 'svelte'
    import _ from 'lodash'

    // import { Checkbox } from 'svelte-5-ui-lib';
    import { locale, odicts } from "$lib/shared.svelte";


    import {dndzone} from "svelte-dnd-action";

    const log = console.log

    // let dictionary
    // let currentCheckBox = {idx: null, checked: false}

    let defaultDicts = [
        {id: 1, key: 'wkt', lang: 'en', name: 'Wiktionary', active: true, href: 'https://en.wiktionary.org/wiki/Category:Ancient_Greek_language'},
        {id: 2, key: 'lsj', lang: 'en', name: 'Liddell, Sckott', active: true, href: 'https://perseids-project.github.io/lsj-js/'},
        {id: 3, key: 'dvr', lang: 'ru', name: 'И.Х.Дворецкий', active: true, href: 'https://en.wiktionary.org/wiki/Ancient_Greek'},
        {id: 4, key: 'bbh', lang: 'en', name: 'BibleHub', active: true, href: 'https://biblehub.com/greek/'},
        {id: 5, key: 'bll', lang: 'fr', name: 'xx Bailly', active: false, href: 'http://gerardgreco.free.fr/IMG/pdf/bailly-2020-hugo-chavez-2023-02-28.pdf'},
        {id: 6, key: 'suda', lang: 'en', name: 'Souda', active: false, href: 'http://www.physics.ntua.gr/mourmouras/ilias_odysseia/Lexiko/souida.html'},
    ]

    let items_ = [
        {id: 1, name: "item1"},
        {id: 2, name: "item2"},
        {id: 3, name: "item3"},
        {id: 4, name: "item4"}
    ];

    let items = odicts.current

    onMount(async () => {
        if (!odicts.current.length) odicts.current = defaultDicts
        // odicts.current = defaultDicts
        let dictkeys = odicts.current.map(dict=> dict.key)
        // log('_dictkeys', dictkeys)

        for await (let dict of odicts.current) {
            // log('_d', dict.id, dict.key, dict.active)
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
    <div class="header flex_ p-4 pb-4">
        <h2 class="font-bold text-2xl px-4"> dictionaries
            <span class="text-sm text-gray-500 py-1"> draggable </span>
            </h2>

            <h2 class="font-bold px-4 text-red-500"> dictionary ordering is not ready yet  </h2>
    </div>

    <section use:dndzone="{{items}}" on:consider="{handleDndConsider}" on:finalize="{handleDndFinalize}">
        {#each items as item (item.id)}
          <div class="flex justify-between langbox rounded bg-gray-300 my-4 w-full border_ border-black_ shadow-lg p-2 px-4" >
              <div>
                  <input idx={item.id} key={item.key} type="checkbox" checked={item.active} class="checkbox" on:click={checkInput}>
                  <span class="px-2"> {item.name} </span>
              </div>
              <div>
                  <a href={item.href} class="cursor-pointer text-blue-500" target="_blank" >source</a>
              </div>
        </div>

      {/each}
    </section>

</div>
