<script>
    import { page } from '$app/state';
    import { setContext, getContext } from 'svelte';
    import { Button } from 'flowbite-svelte';
    import _ from 'lodash'

    import { locale, chunks } from "$lib/shared.svelte";
    import { onMount } from 'svelte'

    const log = console.log

    onMount(async () => {
        log('_TEXTS locale.current', locale.current)
        log('_TEXTS chunks', chunks.current)

        let keytext = {
            key: 'anthrax-new',
		    text: 'ku-ku ku-ku ku-ku ku-ku ku-ku ',
		    title: 'kuku'
	    }


        let lskeys = _.keys(localStorage)

        let now = new Date()
        let date = now.toLocaleDateString(locale.current)

        log('_datestr', date)
    });

    // log('_page.data', page.data)

    // const kuku = getContext('texts');
    // log('_kuku', kuku)
    // setContext('texts', () => ['kuku']);
    // log('_saved texts', texts.current)
    // let t = texts.current

    $inspect(chunks)

</script>

<p>
    <!-- about ================= {canonicalPath} -->
    TEXTS ================= {page.url.href}
</p>

<Button color="green">Green</Button>
<Button href="/" color="red">Home</Button>



<div>
    <!-- BOX -->
    <!-- title: {t.title} -->
    <!-- <br> -->
    <!-- text: {t.text} -->
</div>

<style>
    span.wf:hover {
      background-color: #eee8aa;
      cursor: pointer;
    }

</style>
