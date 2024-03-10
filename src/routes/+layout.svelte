
<script>
    import "../app.css";
    import { onMount } from 'svelte'
    import { textChunk, chunkIdx } from '$lib/store.js';
    import { goto } from '$app/navigation';
    // import { invalidate } from '$app/navigation';
    import { invalidateAll } from "$app/navigation";
    import { browser } from '$app/environment';
    // import { page } from '$app/stores';
    // console.log('_LAY ROWS', $page.data)

    export let data

    // $: console.log('_LOAD DATA', data)

    let isOpen = false;
    let show = true
    function toggleShow() {
        // console.log('_SHOW', show)
	    show = !show
    }

    $: if (data && browser) {
        // console.log('_KUKU showChunk start')
        showChunk(data)
    }

    function showChunk(data) {
        // console.log('_after_goto')
        // console.log('_show_Chunk Example', data)
        if (!document) return
        let oclip = document.querySelector('#clip-results')
        // console.log('_after_goto_2', oclip)
        if (!oclip) return
        oclip.replaceChildren()

        let currentRows = []
        if (!$textChunk) {
            // console.log('_NO TEXT CHUNK, let example')
            let lastChunk = data.example.trim()
            currentRows = lastChunk.split('\n')
            textChunk.update(text => {
                text = JSON.stringify([currentRows])
                return text
            });
        } else {
            // console.log('_YES TEXT CHUNK')
            try {
                // console.log('_BEFORE PARSE_2 ', $textChunk)
                let savedTexts = JSON.parse($textChunk)
                currentRows = savedTexts[$chunkIdx]
            } catch(err) {
                console.log('_can_not_parse savedTexts')
                return
            }
        }

        let ochunk = createChunkEl(currentRows)
        oclip.appendChild(ochunk)
        return ochunk
    }


    async function handleClick(ev) {
        let owf = ev.target
        if (!owf.classList.contains('wf')) return

        let wf = owf.textContent
        if (!wf) return
        goto(wf)
    }

    function createChunkEl(rows) {
        // console.log('_create chunk for rows', rows)
        let ochunk = document.createElement('div')
        // let rows = str.split("\n")
        for (let row of rows) {
            let html = row.replace(/([^\p{P} \n]+)/ug, " <span class=\"wf\">$1</span>")
            let opar = document.createElement('p')
            opar.innerHTML = html
            ochunk.appendChild(opar)
        }
        return ochunk
    }

    onMount(async () => {
        console.log('_ON_MOUNT_LAYOUT ')
        // show_Chunk(data)
    })

    function onPaste(ev) {
        const copiedText = ev.clipboardData.getData('text/plain');
        // console.log('_PASTE', copiedText)
        let newchunk = copiedText.split('\n')
        // console.log('_newchunk', newchunk)

        let savedTexts = []
        try {
            savedTexts = JSON.parse($textChunk)
        } catch(err) {
            console.log('_can_not_parse savedTexts')
        }
        // console.log('_PASTE', savedTexts)
        savedTexts.unshift(newchunk)
        textChunk.update(text => {
            text = JSON.stringify(savedTexts)
            return text
        });
        // let currentRows = savedTexts[0] // [savedTexts.length-1]
        let oclip = document.querySelector('#clip-results')
        // let ochunk = createChunkEl(currentRows)
        oclip.replaceChildren()
        invalidateAll('/')
    }

    function onWinClick(ev) {
        let target = ev.target
        if (target.classList.contains('trns')) {
            target.classList.toggle('overflow-y-auto')
            target.classList.toggle('max-h-24')
        }
    }


    function onKeyDown(ev) {
        if (ev.ctrlKey) {
            switch(ev.key) {
                case '_v':
                    let oclip = document.querySelector('#clip-results')
                    if (!oclip) return
                    // let text = $textChunk
                    // console.log('_T', text)
                    // oclip.innerHTML = $textChunk

                    // copyTextFromClipboard()
                    // console.log('_PASTE')
                    break;
                case 'c':
                    let owordform = document.body.querySelector('.wordform')
                    if (!owordform) return
                    let wf = owordform.textContent
                    copyTextToClipboard(wf)
                    break;
                case 'f':
                    // forms
                    break;
            }
        }
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
                let owf = document.querySelector('.wordform')
                if (!owf) break;
                let wf = owf.textContent
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
            case '_x':
                break;
        }
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

    function closeAll() {
        let oforms = document.querySelector('#popup-forms')
        // if (oforms && !oforms.classList.contains('hidden')) {
            // oforms.classList.add('hidden')
        // }
        console.log('_CLOSED ALL')
    }



</script>

<svelte:window on:keydown={onKeyDown} on:paste={onPaste} on:click={onWinClick} />

<div class="relative w-full flex flex-col h-screen overflow-y-hidden">
        <!-- Desktop Header -->
        <header class="w-full items-center bg-white py-2 px-6 hidden sm:flex">
          <div class="w-1/2"></div>
            <div class="relative w-1/2 flex justify-end" on:click={toggleShow} >
              <div class="p-4">
                anthrax v.1.1.1
              </div>
                <button class="realtive z-10 w-12 h-12 rounded-full overflow-hidden border-4 border-gray-400 hover:border-gray-300 focus:border-gray-300 focus:outline-none">
                  <!-- <img src="https://source.unsplash.com/uJ8LNVCBjFQ/400x400" alt="kuku"> -->
                </button>

                <div x-show="isOpen" class="absolute w-32 bg-white rounded-lg shadow-lg py-2 mt-16" class:hidden={show}>
                    <a href="/" class="block px-4 py-2 account-link hover:text-white">Home</a>
                    <a href="/about" class="block px-4 py-2 account-link hover:text-white">About</a>
                    <a href="/examples" class="block px-4 py-2 account-link hover:text-white">Examples</a>
                    <a href="/hotkeys" class="block px-4 py-2 account-link hover:text-white">Hot keys</a>
                    <a href="/dictionaries" class="block px-4 py-2 account-link hover:text-white">Dictionaries</a>
                    <a href="/code" class="block px-4 py-2 account-link hover:text-white">Licence & code</a>
                </div>
            </div>
        </header>

       <!-- Mobile Header & Nav -->
        <header class="w-full bg-sidebar py-5 px-6 sm:hidden">
            <div class="flex items-center justify-between">
                <a href="index.html" class="text-white text-3xl font-semibold uppercase hover:text-gray-300">Admin</a>
                <button on:click={toggleShow} class="text-white text-3xl focus:outline-none">
                    <i x-show="!isOpen" class="fas fa-bars " class:hidden={!show}></i>
                    <i x-show="isOpen" class="fas fa-times" class:hidden={show}></i>
                </button>
            </div>


                <!-- Dropdown Nav -->
              <nav class="flex flex-col pt-4 " class:hidden={show}>
                <a href="index.html" class="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item">
                    <i class="fas fa-tachometer-alt mr-3"></i>
                    Dashboard
                </a>
                <a href="blank.html" class="flex items-center active-nav-link text-white py-2 pl-4 nav-item">
                    <i class="fas fa-sticky-note mr-3"></i>
                    Blank Page===

                </a>
                <a href="tables.html" class="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item">
                    <i class="fas fa-table mr-3"></i>
                    Tables
                </a>
                <a href="forms.html" class="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item">
                    <i class="fas fa-align-left mr-3"></i>
                    Forms
                </a>
                <a href="tabs.html" class="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item">
                    <i class="fas fa-tablet-alt mr-3"></i>
                    Tabbed Content
                </a>
                <a href="calendar.html" class="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item">
                    <i class="fas fa-calendar mr-3"></i>
                    Calendar
                </a>
                <a href="/ss" class="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item">
                    <i class="fas fa-cogs mr-3"></i>
                    Support
                </a>
                <a href="/ss" class="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item">
                    <i class="fas fa-user mr-3"></i>
                    My Account
                </a>
                <a href="/ss" class="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item">
                    <i class="fas fa-sign-out-alt mr-3"></i>
                    Sign Out
                </a>
                <button class="w-full bg-white cta-btn font-semibold py-2 mt-3 rounded-lg shadow-lg hover:shadow-xl hover:bg-gray-300 flex items-center justify-center">
                    <i class="fas fa-arrow-circle-up mr-3"></i> Upgrade to Pro!
                </button>
            </nav>
        </header>

        <div class="w-full h-screen overflow-x-hidden border-t flex flex-col">
            <main class="w-full flex-grow p-6 " >
                <div class="h-full overflow-x-hidden overflow-y-auto flex w-full" on:click={handleClick}>
                    <div id="clip-results" class="container p-4 ">
                    </div>

                    <div class="container px-4_ border-4_">
                        <slot />
                    </div>

                </div>

            </main>

            <footer class="w-full bg-white text-right p-4">
                hosting: <a target="_blank" href="https://basealt.ru" class="underline">basealt.ru</a>
            </footer>
        </div>

  </div>
