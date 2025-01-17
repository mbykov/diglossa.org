<script>
    import LanguageSwitcher from "$lib/ui/LanguageSwitcher.svelte"

    // import { i18n } from "$lib/i18n";
    import { page } from '$app/state';

    const log = console.log

    // let { data } = $props()
    // log('_AB_DATA', data)

</script>

<div class="w-full_"><LanguageSwitcher /></div>

<p>
    <!-- about ================= {canonicalPath} -->
    settings ================= {page.url.href}
    <!-- ==> {data.content} -->
   </p>
