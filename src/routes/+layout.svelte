<script>
	import '../app.css';
    import { onMount } from 'svelte'

    import LeftHeader from "$lib/ui/LeftHeader.svelte"
    import RightHeader from "$lib/ui/RightHeader.svelte"
    import Clip from "$lib/ui/Clip.svelte"
    import { goto } from '$app/navigation';
    import { Button } from 'flowbite-svelte';

    import { chunks, locale } from "$lib/shared.svelte";
    // import { chunks } from "$lib/shared.svelte";
    // import { page } from '$app/state';

    const log = console.log


    function showLeft() {
        let oleft = document.querySelector('.left')
        if (!oleft) return
        let oright = document.querySelector('.right')
        oleft.classList.remove('hidden')
        oright.classList.add('hidden')
    }

    function showRight() {
        let oleft = document.querySelector('.left')
        if (!oleft) return
        let oright = document.querySelector('.right')
        oleft.classList.add('hidden')
        oright.classList.remove('hidden')
    }

    let cchunk = $state({})

    let { children, data } = $props();

    let menu = $derived(data.menu)

    onMount(async () => {
    })

    $effect(()=> {
        let cchunk = ''
        for (let chunk of chunks.current) {
            let cc = JSON.parse(JSON.stringify(chunk))
            if (cc.current) cchunk = cc
            else continue
            setCchunk(cchunk)
        }
    })

    function setCchunk(param) {
        cchunk = param
    }

    function onPaste(ev) {
        const copiedText = ev.clipboardData.getData('text/plain');
        let rows = copiedText.trim().split('\n')
        if (!rows.length) return
        let title = rows[0].slice(0, 25)
        if (!title) return
        let now = new Date()
        let date = now.toLocaleDateString(locale.current)
        cchunk = {date, title, rows}
        // log('_lay onPaste cchunk', cchunk)
        // showLeft()
    }

    function gotoWF(ev) {
        let owf = ev.target
        if (!owf.classList.contains('wf')) return
        let wf = owf.textContent
        if (!wf) return
        let wfurl = '/' + wf
        goto(wfurl)
    }

    function copyTextToClipboard(text) {
        navigator.clipboard.writeText(text).then(function() {
            //console.log('_TEXT', text)
        }, function(err) {
            // console.error('Async: Could not copy text: ', err);
        });
    }

    function copyTextFromClipboard(text) {
        navigator.clipboard
            .readText()
            .then(
                // (clipText) => (document.querySelector(".cliptext").innerText = clipText)
                (clipText) => {
                    console.log('_CLIP', clipText)
                }
            )
    }

    function onKeyDown(ev) {
        if (ev.ctrlKey) return
        let owordform = document.body.querySelector('.wordform')
        if (!owordform) return
        let wf = owordform.textContent
        switch(ev.key) {
            case 'h':
                goto('/')
                break;
            case 'r':
                // showRels()
                break;
            case 'Escape':
                closeAll()
                break;
            case 'c':
                console.log('_COPY', wf)
                copyTextToClipboard(wf)
                break;
            case 'w':
                let wiki_host = 'https://en.wiktionary.org/wiki/'
                let wiki_url = [wiki_host, wf].join('')
                window.open(wiki_url, '_blank')
                break;
            case 'p':
                let pers_host = 'https://www.perseus.tufts.edu/hopper/morph?l='
                let tail = '&la=greek'
                let pers_url = [pers_host, wf, tail].join('')
                window.open(pers_url, '_blank') // .focus();
                break;
            case 'f':
                // forms
                break;
        }
    }

    function closeAll() {
        goto('/')
        // let oforms = document.querySelector('#popup-forms')
        // if (oforms && !oforms.classList.contains('hidden')) {
        // oforms.classList.add('hidden')
        // }
        console.log('_CLOSED ALL')
    }
</script>

<svelte:window on:keydown={onKeyDown} />
<!-- <svelte:window on:keydown={onKeyDown} on:paste={onPaste} /> -->
<!-- <svelte:window on:keydown|preventDefault={onKeyDown} on:paste={onPaste} /> -->
<!-- <svelte:window onpaste={onPaste} /> -->

<div class="flex flex-col min-h-screen p-4_ w-full overflow-y-hidden" onclick={gotoWF}>

    <div class="flex flex-row justify-between flex-grow bg-gray-200 ">

        <left class="left w-full md:w-1/2_ p-4_ bg-gray-300 hidden md:block" onclick={gotoWF}>
            <LeftHeader {menu} />
            <Clip {cchunk} />
        </left>

        <main class="right w-full md:w-1/2_ w-full p-4_ sm:hidden_ md:block">
            <RightHeader />
	        {@render children()}
        </main>

    </div>

    <footer class="bg-gray-100 p-1">Footer</footer>
</div>
