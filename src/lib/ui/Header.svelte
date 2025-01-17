<script>
    import { i18n } from "$lib/i18n";
    import LanguageSwitcher from "./LanguageSwitcher.svelte"
    import { page } from "$app/stores";
    import * as m from "$lib/paraglide/messages.js"
    import { base } from "$app/paths"
    import { goto } from '$app/navigation';
	import { get } from "svelte/store"
    import { availableLanguageTags, languageTag } from "$lib/paraglide/runtime";

    import { createListbox } from 'svelte-headlessui'
    import Transition from 'svelte-transition'

    const log = console.log

    const routes = [
		{ name: m.home(), href: '/' },
		{ name: m.about(), href: '/about/'  },
		{ name: m.code(), href: '/code/'  },
		{ name: m.texts(), href: '/texts/'  },
		{ name: 'settings', href: '/settings'  },
		{ name: 'Hellen Schmidt', href: '/'  },
	]

    const listbox = createListbox({ label: 'Actions', selected: routes[0] })

    async function onChangeRoute(ev) {
        if (!ev.detail || !ev.detail.selected) return
        let href = ev.detail.selected.href
        if (!href) return
        let clang = languageTag()
        log('_cur_lang', clang)
        const localisedPath = i18n.resolveRoute(href, clang)
        log('_localisedPath', localisedPath)
        let chref = href.replace(/\//g, '')

        // let apath = localisedPath + ''
        goto(localisedPath)
        // goto(href)

        return

        let sectionUrl = '/api?href=' + chref +'&clang=' + clang
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
        goto(localisedPath)
    }

</script>

<!-- <div class="header flex justify-between p-4"> -->
<!--     <div class="nav"> -->
<!--         <a href="{base}/" aria-current={$page.route.id === "/" ? "page" : undefined}>{m.home()}</a> -->
<!--         <a href="{base}/about/" aria-current={$page.route.id === "/about" ? "page" : undefined}>{m.about()}</a> -->
<!--         <\!-- <a href="{base}/users/1" aria-current={$page.route.id === "/users/[id]" ? "page" : undefined}>{m.users()}</a> -\-> -->
<!--         <a href="{base}/texts/">{m.texts()}</a> -->
<!--     </div> -->
<!--     <span>{$page.url.pathname}</span> -->
<!--     <\!-- <LanguageSwitcher /> -\-> -->
<!-- </div> -->

<div class="header flex justify-between w-full px-4 relative ">
    <div>
        <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">anthrax 1.1.1</span>
    </div>

    <!-- <div class="w-full_"><LanguageSwitcher /></div> -->

    <div class="flex flex-col pr-8_ w-48 text-end">
        <div class="fixed top-16_ top-1 w-48 ">
            <div class="relative_ mt-1 w-full ">

                <button
                    use:listbox.button
                    onchange={onChangeRoute}
                    class="realtive z-10 w-8 h-8 rounded-full overflow-hidden border-4 border-gray-400 hover:border-gray-300 focus:border-gray-300 focus:outline-none mb-2 text-end "
                    >
                    <!-- <span class="block truncate">{$listbox.selected.name}</span> -->
                </button>

                <Transition
                    show={$listbox.expanded}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    >
                    <ul
                        use:listbox.items
                        class="absolute top-100 left-0 mt-1 max-h-60 w-full_ overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none w-48_ "
                        >

                        <!-- <li class="w-full"><LanguageSwitcher /></li> -->

                        {#each routes as value, i}
                          {@const active = $listbox.active === value}
                        {@const selected = $listbox.selected === value}
                        <li
                            class="relative_ cursor-default select-none py-2 pl-10 pr-4 {active
                                   ? 'bg-amber-100 text-amber-900'
                                   : 'text-gray-900'}"
                            use:listbox.item={{ value }}
                            >
                            <span class="block truncate {selected ? 'font-medium' : 'font-normal'}"
                                  >{value.name}</span
                                                   >
                            {#if selected}
                              <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
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
