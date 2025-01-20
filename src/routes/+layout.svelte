<script>
	import '../app.css';
    import Header from "$lib/ui/Header.svelte"
    import { goto } from '$app/navigation';

    export const prerender = true
    const log = console.log
	let { children } = $props();

    function onPaste(ev) {
        const copiedText = ev.clipboardData.getData('text/plain');
        let newchunk = copiedText.trim().split('\n')

        if (!newchunk.length) return
        showClip(newchunk)
    }

    function showClip(rows) {
        log('_CLIP', rows)
        if (!document) return
        let oclip = document.querySelector('#clip-results')
        if (!oclip) return
        oclip.replaceChildren()

        // log('_ROWS!', rows)
        let ochunk = createChunkEl(rows)
        oclip.replaceChildren()
        oclip.appendChild(ochunk)
    }

    function createChunkEl(rows) {
        let ochunk = document.createElement('div')
        for (let row of rows) {
            let html = row.replace(/([^\p{P} \n]+)/ug, " <span class=\"wf\">$1</span>")
            let opar = document.createElement('p')
            opar.innerHTML = html
            ochunk.appendChild(opar)
        }
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



</script>

<svelte:window on:keydown={onKeyDown} on:paste={onPaste} />

<div class="flex flex-col min-h-screen p-4">

    <Header />
    <div class="flex flex-row flex-grow bg-gray-200 ">

        <left class="w-1/2 p-4 bg-gray-300 hidden sm:block">
            left, texts
            <div id="clip-results" on:click={gotoWF}></div>
        </left>

        <main class="w-1/2 p-4">
            Content
	        {@render children()}
        </main>

    </div>


    <footer class="bg-gray-100 p-1">Footer</footer>
</div>

<style>
    span.wf:hover {
      background-color: #eee8aa;
      cursor: pointer;
    }

</style>
