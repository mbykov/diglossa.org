<script>

    import { onMount } from 'svelte'
    import { goto } from '$app/navigation'
    import { textChunk } from '$lib/store.js'
    import Anthrax from './lib/Anthrax.svelte'

    export let data

    let wf = ''
    let chains = [] //, cdicts = []



     $: {
         chains = data.chains
         wf = data.wf
     }

    async function handleClick(ev) {
        let owf = ev.target
        if (!owf.classList.contains('wf')) return

        let wf = owf.textContent
        if (!wf) return
        goto(wf)
    }

    onMount(async () => {
        let oclip = document.querySelector('#clip-results')
        if (!oclip) return
        oclip.innerHTML = $textChunk
    })


    function onKeyDown(e) {
        // if (e.ctrlKey) return
        let owf = document.querySelector('.wordform')
        if (!owf) return
        let wf = owf.textContent
        switch(e.key) {
            case 'c':
                copyTextToClipboard(wf)
            break;
            case 'r':
                // showRels()
            break;
            case 'f':
                // forms
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
            case 'Escape':
                closeAll()
                break;
        }
    }

    function copyTextToClipboard(text) {
        navigator.clipboard.writeText(text).then(function() {
        }, function(err) {
            console.error('Async: Could not copy text: ', err);
        });
    }

  function copyTextFromClipboard(text) {
      navigator.clipboard
          .readText()
          .then(
              (clipText) => (document.querySelector(".cliptext").innerText = clipText)
          )
  }

</script>

<svelte:window on:keydown={onKeyDown} />

<div class="h-full overflow-x-hidden flex w-full" on:click={handleClick}>
    <div id="clip-results" class="container p-4 ">

    </div>
    <div class="container p-4">

        <Anthrax {chains} {wf} />

    </div>
</div>
