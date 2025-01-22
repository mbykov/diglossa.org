<script>
    import DefLocale from "$lib/ui/DefLocale.svelte"

    import { page } from '$app/state';
    import { onMount } from 'svelte'
    import _ from 'lodash'

    import { locale } from "$lib/shared.svelte";

    const log = console.log

    onMount(async () => {
        log('_locale.current', locale.current)

        let lskeys = _.keys(localStorage)
        log('_lskeys', lskeys)
    });

</script>

<p>
    <a href="/about"> RU about </a>
</p>

<div class="w-full_"><DefLocale /></div>

<p>
    settings ================= page.url.href: {page.url.href}
</p>
