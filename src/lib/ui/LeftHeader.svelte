<script>
    import { Hamburger } from 'svelte-hamburgers';
    import { fly } from 'svelte/transition';

    import { Drawer, Drawerhead, Button, uiHelpers } from 'svelte-5-ui-lib';
    // import { InfoCircleSolid } from "flowbite-svelte-icons";
    const drawer = uiHelpers();
    let drawerStatus = $state(false);
    const closeDrawer = drawer.close;

    $effect(() => {
        // drawerStatus = drawer.isOpen;
        drawerStatus = open
    });

    let open = $state(false);

    import { locale } from "$lib/shared.svelte";

    const log = console.log

    let { menu } = $props()

    let routes = $derived(menu[locale.current])

    function toggleNav(ev) {
        if (open) open = !open
    }
    
    function onKeyDown(ev) {
        if (open) open = !open
    }

</script>

<svelte:window on:click={toggleNav} on:keydown={onKeyDown}/>

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
</nav>


<Drawer drawerStatus={drawerStatus} closeDrawer={closeDrawer} backdrop={false} activateClickOutside={false} class="top-12 h-screen start-0">

    anthrax.js v.1.1.1

    <ul class="focus:outline-none w-48 dark:text-white bg-white p-4">
        {#each routes as route}
          <li class="py-2"><a href="{route.href}" class="cursor-pointer hover:text-slate-500">{route.name}</a></li>
        {/each}
      </ul>

</Drawer>
