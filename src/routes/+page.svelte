<script>
	import { i18n } from "$lib/i18n";
    import { page } from '$app/state';

    const canonicalPath = i18n.route(page.url.pathname);

    const log = console.log

</script>

<p>
    HOME ================= {page.url.href}
</p>
