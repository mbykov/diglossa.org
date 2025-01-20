<script>
    import { page } from '$app/state';
    import { setContext, getContext } from 'svelte';
    import { Button } from 'flowbite-svelte';
    import _ from 'lodash'

    // import { LocalStorage } from '$lib/storage.svelte';
    import { onMount } from 'svelte'


    import { LocalStorage } from "$lib/storage.svelte";
    const deflocale = new LocalStorage("deflocale", 'ku');


    onMount(async () => {

        // log('_TEXTS deflocale.current', deflocale.current)

        let keytext = {
            key: 'anthrax-new',
		    text: 'ku-ku ku-ku ku-ku ku-ku ku-ku ',
		    title: 'kuku'
	    }


        let lskeys = _.keys(localStorage)
        // log('_lskeys', lskeys)
    });

    const log = console.log

    // log('_page.data', page.data)

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

<style>
    span.wf:hover {
      background-color: #eee8aa;
      cursor: pointer;
    }

</style>
