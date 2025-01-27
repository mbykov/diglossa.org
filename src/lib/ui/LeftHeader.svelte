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

    // let routes = $state([])
    // let menu = $state([])
    let { menu } = $props()
    // log('____HEADER MENU', menu);
    let routes = $derived(menu[locale.current])

    onMount(async () => {
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
