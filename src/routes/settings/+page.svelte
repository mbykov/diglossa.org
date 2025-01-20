<script>
    import DefLocale from "$lib/ui/DefLocale.svelte"

    // import { i18n } from "$lib/i18n";
    import { page } from '$app/state';
    import { onMount } from 'svelte'
    import _ from 'lodash'

    import { LocalStorage } from "$lib/storage.svelte";
    const deflocale = new LocalStorage("deflocale", 'ku');


    const log = console.log

    onMount(async () => {
        log('_locale.current', deflocale.current)

        let lskeys = _.keys(localStorage)
        log('_lskeys', lskeys)
    });

    // let { data } = $props()
    // log('_AB_DATA', data)

</script>

<p>
    <a href="/about"> RU about </a>
</p>

<div class="w-full_"><DefLocale /></div>

<p>
    <!-- about ================= {canonicalPath} -->
    settings ================= {page.url.href}
    <!-- ==> {data.content} -->
</p>
