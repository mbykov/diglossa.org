<script>
    // import _ from 'lodash'
    import SetDefaultFontSize from "$lib/ui/SetDefaultFontSize.svelte"
    import SetDefaultLocale from "$lib/ui/SetDefaultLocale.svelte"

    // import { page } from '$app/state';
    import { onMount } from 'svelte'

    import { locale } from "$lib/shared.svelte";

    const log = console.log

    onMount(async () => {
        // log('_settings: locale.current', locale.current)
    });


</script>

<div class="p-4 px-8 h-[calc(100vh-86px)] h-screen_ overflow-y-scroll">

    <h1 class="font-bold px-4 text-2xl"> settings </h1>

    <h1 class="font-bold p-4 pb-2"> interface language </h1>

    <SetDefaultLocale />

    <h1 class="font-bold p-4 pb-2"> greek font size </h1>

    <SetDefaultFontSize />



</div>
