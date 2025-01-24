<script>
    import DefLocale from "$lib/ui/DefLocale.svelte"
    import SetDefaultFontSize from "$lib/ui/SetDefaultFontSize.svelte"
    import SetDefaultLocale from "$lib/ui/SetDefaultLocale.svelte"

    import { page } from '$app/state';
    import { onMount } from 'svelte'
    import _ from 'lodash'

    import { locale } from "$lib/shared.svelte";

    import { Radio, Helper, RadioButton, ButtonGroup } from 'svelte-5-ui-lib';
    let radioGroup = $state("notes");


    const log = console.log

    onMount(async () => {
        log('_settings: locale.current', locale.current)

    });


</script>

<div class="p-4 px-8 h-[calc(100vh-86px)] h-screen_ overflow-y-scroll">
    <h1 class="font-bold px-4 text-2xl"> settings </h1>

    <h1 class="font-bold p-4"> interfase language </h1>

    <div class="w-full_"><DefLocale /></div>

    <!-- <SetDefaultLocale /> -->

    <h1 class="font-bold p-4"> greek font size </h1>

    <SetDefaultFontSize />

</div>

    <p> settings ================= page.url.href: {page.url.href}</p>
    <p> <a href="/about"> /about </a></p>

