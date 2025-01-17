<script>
	import { i18n } from "$lib/i18n";
    import { availableLanguageTags, languageTag } from "$lib/paraglide/runtime";

	import { ParaglideJS } from "@inlang/paraglide-sveltekit";
	import '../app.css';
    import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Avatar, Dropdown, DropdownItem, DropdownHeader, DropdownDivider } from 'flowbite-svelte';

    import { createListbox } from 'svelte-headlessui'
    import Transition from 'svelte-transition'
    // import Selector from './Selector.svelte'
    // import Check from './Check.svelte'
    import { goto } from '$app/navigation';

    const log = console.log

	let { children } = $props();

    import { page } from '$app/state';
    import * as m from '$lib/paraglide/messages.js';
    import { base } from "$app/paths"


    const labels = {
        en: "🇬🇧 English",
        de: "🇩🇪 Deutsch",
        fr: "🇩🇪 French",
        ru: "🇷🇺 Russian"
    }



    /**
     * @param {import("$lib/paraglide/runtime").AvailableLanguageTag} newLanguage
     */
    function switchToLanguage(newLanguage) {
        const canonicalPath = i18n.route(page.url.pathname);
        const localisedPath = i18n.resolveRoute(canonicalPath, newLanguage);
        goto(localisedPath);
    }

    const people = [
		{ name: 'home', hrep: 'home' },
		{ name: 'about', href: 'about' },
		{ name: 'code', href: 'code' },
		{ name: 'Tom Cook' },
		{ name: 'Tanya Fox' },
		{ name: 'Hellen Schmidt' },
	]

    const listbox = createListbox({ label: 'Actions', selected: people[2] })

    async function onChange(ev) {
        log('_____LIST BOX', listbox)
        console.log('_select', ev.detail)
        // log('_href', ev.detail.selected)
        if (!ev.detail || !ev.detail.selected) return
        let href = ev.detail.selected.href
        if (!href) return
        log('_href', href)
        // goto(href)
        let sectionUrl = '/api?href=' + href
        const req = await fetch(sectionUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        })
        // log('_req', req)
        const results = await req.json()
        log('_RESULTS', results)
    }

</script>

<div class="flex flex-col min-h-screen p-4">
    <Navbar rounded color="form" class="flex flex-col justify-between w-full px-4">
            <NavBrand href="/">
                <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">anthrax 1.1.1</span>
            </NavBrand>

            <div>
                <div class="flex w-full flex-col items-center_ justify-center_ pr-100 relative">
                    <button
                        use:listbox.button
                        onchange={onChange}
                        class="realtive z-10 w-12 h-12 rounded-full overflow-hidden border-4 border-gray-400 hover:border-gray-300 focus:border-gray-300 focus:outline-none mb-2"
                        >
                    </button>

                    <div class="fixed top-12 right-8 w-72">
                        <div class="relative mt-1">

                            <Transition
                                show={$listbox.expanded}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                                >

                                <div class="max-h-60 w-full bg-white py-1 text-sm shadow-lg ">
                                    <select onchange={e => switchToLanguage(/** @type {any} */ (e).target.value)}>
                                        {#each availableLanguageTags as langTag}
                                          <option
                                              value={langTag}
                                              selected={languageTag() === langTag}
                                              >{labels[langTag]}</option>
                                            {/each}
                                          </select>
                                </div>

                                <ul
                                    use:listbox.items
                                    class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                    >
                                    {#each people as value, i}
                                      {@const active = $listbox.active === value}
                                      {@const selected = $listbox.selected === value}
                                    <li
                                        class="relative cursor-default select-none py-2 pl-10 pr-4 {active
                                               ? 'bg-amber-100 text-amber-900'
                                               : 'text-gray-900'}"
                                        use:listbox.item={{ value }}
                                        >
                                        <span class="block truncate {selected ? 'font-medium' : 'font-normal'}"
                                              >{value.name} {m.about()}</span
                                                               >
                                        {#if selected}
                                          <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                              <!-- <Check class="h-5 w-5" /> -->
                                          </span>
                                        {/if}
                                      </li>
                                    {/each}
                                  </ul>
                            </Transition>
                        </div>
                    </div>
                </div>

            </div>
    </Navbar>

    <h1>{m.hello_world({ name: 'SvelteKit User' })}</h1>
    <div>
        <button onclick={() => switchToLanguage('en')}>en</button>
        <button onclick={() => switchToLanguage('ru')}>ru</button>
        <button onclick={() => switchToLanguage('fr')}>fr</button>
        <button onclick={() => switchToLanguage('de')}>de</button>
    </div>

    <select onchange={e => switchToLanguage(/** @type {any} */ (e).target.value)}>
        {#each availableLanguageTags as langTag}
          <option
              value={langTag}
              selected={languageTag() === langTag}
              >{labels[langTag]}</option>
            {/each}
    </select>


    <nav>NAV:
        <a href="{base}/">{m.home()}</a>
        <a href="{base}/about/">{m.about()}</a>
        <a href="{base}/code/">{m.code()}</a>
    </nav>
    <!-- <span>{$page.url.pathname}</span> -->


    <ParaglideJS {i18n}>
	    {@render children()}
    </ParaglideJS>

    <footer class="bg-gray-100 p-1">Footer</footer>
</div>
