<script>
    // import { page } from "$app/stores";
    // import { base } from "$app/paths"
    // import { goto } from '$app/navigation';
	// import { get } from "svelte/store"
    import { onMount } from 'svelte'

    // import Transition from 'svelte-transition'

    import { Hamburger } from 'svelte-hamburgers';
    import { fly } from 'svelte/transition';

    let open = $state(false);

    import { locale } from "$lib/shared.svelte";

    const log = console.log

    let routes = []
    onMount(async () => {
        const menu = await import(`../i18/${locale.current}/menu.js`)
        routes = menu.routes
        // log('____header_mount_routes', routes);
    })

    $effect(async () => {
        // console.log('____________________________ooo', open)
        const menu = await import(`../i18/${locale.current}/menu.js`)
        routes = menu.routes
        // log('____header_effect_routes', routes);
    })

    function toggleNav(ev) {
        open = false
    }

</script>

<svelte:window on:click={toggleNav} />

<nav class="header px-4 relative bg-white" >
    <div class="h-14">
    <Hamburger
        bind:open
        type="collapse"
        --padding="12px"
        title="Toggle nav links"
        ariaControls="nav"
        />
    </div>

    {#if open}
      <ul
          id="nav"
          transition:fly={{ y: -15 }}
          class="menu absolute top-100 left-0 shadow-lg focus:outline-none w-48 dark:text-white bg-white p-4 shadow-lg "
          >

          {#each routes as route}
            <li><a href="{route.href}" class="cursor-pointer hover:text-slate-500">{route.name}</a></li>
          {/each}

        </ul>
      {/if}
    </nav>
