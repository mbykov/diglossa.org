<script>
    import { page } from "$app/stores";
    // import { base } from "$app/paths"
    import { goto } from '$app/navigation';
	import { get } from "svelte/store"
    import { onMount } from 'svelte'

    import Transition from 'svelte-transition'

    import { Hamburger } from 'svelte-hamburgers';
    import { fly } from 'svelte/transition';

    // let uniq = {}
    let open = $state(false);

    import { locale } from "$lib/shared.svelte";

    const log = console.log

    // $effect(() => {
    //     // console.log('____________________________ooo', open)
    // });

    // let menupath = '$lib/i18/' + `${locale.current}` + '/menu.js'
    // log('____menupath', menupath);


    let routes = []
    onMount(async () => {
        const menu = await import(`../i18/${locale.current}/menu.js`)
        routes = menu.routes
        console.log('____routes', routes);
    })

    $effect(async () => {
        // console.log('____________________________ooo', open)
        const menu = await import(`../i18/${locale.current}/menu.js`)
        routes = menu.routes
		// console.log('____OPEN', open, locale.current);
        // uniq = {}
    })

    // function closeNav(ev) {
    //     log('______________________________ CLOSE NAV')
    //     open = false
    // }

    async function onChangeRoute(ev) {
        log('________________________________________onChangeRoute')
        if (!ev.detail || !ev.detail.selected) return
        let href = ev.detail.selected.href
        if (!href) return

        // let clang = languageTag()
        // log('_cur_lang', clang)
        // const localisedPath = i18n.resolveRoute(href, clang)
        // log('_localisedPath', localisedPath)
        let chref = href.replace(/\//g, '')

        log('_header_locale.current', locale.current)
        // let apath = localisedPath + ''
        // goto(localisedPath)
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

    function onClick(ev) {
        open = false
    }

</script>

<svelte:window on:click={onClick} />

<div class="header flex justify-between w-full px-4 relative " >
    <div>
        <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">anthrax 1.1.1</span>
    </div>
    <nav >
        <Hamburger
            bind:open
            type="collapse"
            title="Toggle nav links"
            ariaControls="nav"
            />

        {#if open}
          <ul
              id="nav"
              transition:fly={{ y: -15 }}
              class="menu absolute top-100 right-0 shadow-lg focus:outline-none w-48 dark:text-white bg-white p-4 shadow-lg "
              >

              <!-- {#key uniq} -->
              {#each routes as route}
                <li><a href="{route.href}" class="cursor-pointer hover:text-slate-500">{route.name}</a></li>
              {/each}
              <!-- {/key} -->

          </ul>
        {/if}
      </nav>

</div>

<!-- <button on:click|preventDefault={handleClick}>Click me</button> -->
