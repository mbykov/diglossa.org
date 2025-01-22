<script>
	import '../app.css';
    import Header from "$lib/ui/Header.svelte"
    import LeftHeader from "$lib/ui/LeftHeader.svelte"
    import RightHeader from "$lib/ui/RightHeader.svelte"
    import Clip from "$lib/ui/Clip.svelte"
    import { goto } from '$app/navigation';
    import { Button } from 'flowbite-svelte';
    import { chunks, locale } from "$lib/shared.svelte";

    export const prerender = true

    const log = console.log

    let rows = ''
    let newchunk = {}
    let uniq = {}
    let xxx = false

    let { children } = $props();

    function onPaste(ev) {
        const copiedText = ev.clipboardData.getData('text/plain');
        rows = copiedText.trim().split('\n')
        if (!rows.length) return
        let title = rows[0].slice(0, 25)
        if (!title) return
        let now = new Date()
        let date = now.toLocaleDateString(locale.current)
        newchunk = {date, title, rows, new: true}
        showClip(newchunk)
    }

    function showClip(newchunk) {
        if (!document) return
        let oclip = document.querySelector('#clip-results')
        if (!oclip) return
        // oclip.replaceChildren()
        log('_lay new chunk', newchunk)

        // chunks.current = []
        chunks.current.push(newchunk)
        uniq = {}
        xxx = true
        log('_______XXX', xxx, chunks.current.length)
        // goto('/texts')

        // let ochunk = createChunkEl(newchunk)
        // oclip.appendChild(ochunk)
    }

    function createChunkEl(newchunk) {
        let ochunk = document.createElement('div')
        let otitle = document.createElement('div')
        otitle.textContent = newchunk.title
        otitle.classList.add('chunk-title')
        ochunk.appendChild(otitle)
        let otext = document.createElement('div')
        for (let row of newchunk.rows) {
            let html = row.replace(/([^\p{P} \n]+)/ug, " <span class=\"wf\">$1</span>")
            let opar = document.createElement('p')
            opar.innerHTML = html
            otext.appendChild(opar)
        }
        ochunk.appendChild(otext)
        return ochunk
    }

    function onKeyDown(ev) {
        return
        if (ev.ctrlKey) {
            switch(ev.key) {
                case 'c':
                    let owordform = document.body.querySelector('.wordform')
                    if (!owordform) return
                    let wf = owordform.textContent
                    // console.log('_COPY', wf)
                    copyTextToClipboard(wf)
                    break;
                case 'f':
                    // forms
                    break;
            }
        }
        if (ev.ctrlKey) return

        // let owf = document.querySelector('.wordform')
        // if (!owf) return
        // let wf = owf.textContent

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
            case 'w':
                let wiki_host = 'https://en.wiktionary.org/wiki/'
                let wiki_url = [wiki_host, wf].join('')
                window.open(wiki_url, '_blank')
                break;
            case 'p':
                // let owf = document.querySelector('.wordform')
                       // if (!owf) break;
                // wf = owf.textContent
                let pers_host = 'https://www.perseus.tufts.edu/hopper/morph?l='
                let tail = '&la=greek'
                let pers_url = [pers_host, wf, tail].join('')
                window.open(pers_url, '_blank') // .focus();
                break;
            case '_x':
                break;
        }
    }

    function gotoWF(ev) {
        let owf = ev.target
        if (!owf.classList.contains('wf')) return
        let wf = owf.textContent
        // log('______________________goto WF', wf)
        if (!wf) return
        goto(wf)
    }

    function saveCurrent(ev) {
        log('______________________saveCurrent')
        chunks.current.push(newchunk)
        goto('/texts')
    }



</script>

<!-- <svelte:window on:keydown={onKeyDown} on:paste={onPaste} /> -->
<svelte:window on:paste={onPaste} />

<div class="flex flex-col min-h-screen p-4_ w-full ">
    <!-- <Header /> -->
    <div class="flex flex-row justify-between flex-grow bg-gray-200 ">

        <left class="left w-full md:w-1/2_ p-4_ bg-gray-300 hidden md:block" on:click={gotoWF}>
            <LeftHeader />
            {#key uniq}
            <Clip />
            {/key}
        </left>

        <main class="right w-full md:w-1/2_ w-full p-4_ sm:hidden md:block">
            <RightHeader />
	        {@render children()}
        </main>

    </div>

    <footer class="bg-gray-100 p-1">Footer</footer>
</div>

<style>
    /* span.wf:hover { */
      /* background-color: #eee8aa; */
      /* cursor: pointer; */
    /* } */

</style>
