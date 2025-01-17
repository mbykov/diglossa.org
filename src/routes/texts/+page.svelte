<script>
	import { i18n } from "$lib/i18n";
    import { page } from '$app/state';
    import { setContext, getContext } from 'svelte';
    import { Button } from 'flowbite-svelte';
    import _ from 'lodash'

    // import { LocalStorage } from '$lib/storage.svelte';
    // import { persistedState } from '$lib/persisedState.ts'
    import { persistedState } from '$lib/persistedState.svelte.ts'
    // import { browser } from "$app/env";
    import { onMount } from 'svelte'

    // let texts = new LocalStorage('texts', {
	// 	text: 'ku-ku ku-ku ku-ku ku-ku ku-ku ',
	// 	title: 'kuku'
	// });

    onMount(async () => {
        let savedText = persistedState('anthrax-new').value
        log('_savedText', savedText)

        let keytext = {
            key: 'anthrax-new',
		    text: 'ku-ku ku-ku ku-ku ku-ku ku-ku ',
		    title: 'kuku'
	    }
        persistedState('anthrax-new', keytext)


        let lskeys = _.keys(localStorage)
        log('_lskeys', lskeys)
    });

    // const canonicalPath = i18n.route(page.url.pathname);

    const log = console.log

    log('_page.data', page.data)

    // const kuku = getContext('texts');
    // log('_kuku', kuku)
    // setContext('texts', () => ['kuku']);
    // log('_saved texts', texts.current)
    // let t = texts.current




</script>

<p>
    <!-- about ================= {canonicalPath} -->
    TEXTS ================= {page.url.href}
</p>

<Button color="green">Green</Button>
<Button href="/">Home</Button>



<div>
    <!-- BOX -->
    <!-- title: {t.title} -->
    <!-- <br> -->
    <!-- text: {t.text} -->
</div>
