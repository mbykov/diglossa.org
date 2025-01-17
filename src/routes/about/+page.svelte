<script>

    // import { i18n } from "$lib/i18n";
    import { page } from '$app/state';

    // const canonicalPath = i18n.route(page.url.pathname);
    // const localisedPath = i18n.resolveRoute(canonicalPath, newLanguage);

    const log = console.log

    let { data } = $props()
    log('_AB_DATA', data)

</script>


<p>
    <!-- about ================= {canonicalPath} -->
    about ================= {page.url.href}
    <!-- ==> {data.content} -->
   </p>

<p>{@html data.content}</p>
