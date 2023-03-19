<script>
  import "../app.css";
  import { onMount } from 'svelte'
  import { goto } from '$app/navigation';
  import { clip, textChunk } from '$lib/store.js';

  let html = ''

  onMount(async () => {
      // document.addEventListener('paste', handlePaste);
      document.addEventListener('paste', (e) => {
          const copiedText = e.clipboardData.getData('text/plain');
          let text = copiedText.replace(/([\n]+)/ug, "<br>$1")
          // text = text.replace(/<br>+/g, ' ')
          // text = text.replace(/[a-zA-Zа-яА-Я]/g, '')
          let html = text.replace(/([^\p{P} \n]+)/ug, "<span class=\"wf\">$1</span>")
          let oclip = document.querySelector('#clip-results')
          oclip.innerHTML = html
          textChunk.update(text => {
              text = html
              return text
          });

          console.log('_HTML', html)
      })

      document.body.addEventListener("keydown", function(e) {
          if (!e.ctrlKey) return
          let owordform = document.body.querySelector('.wordform')
          if (!owordform) return
          let wf = owordform.textContent
          if (e.key == 'p') {
              let urlHead = 'https://www.perseus.tufts.edu/hopper/morph?l='
              let urlTail = '&la=greek'
              let url = [urlHead, wf, urlTail].join('')
              window.open(url, '_blank') // .focus();
          } else if (e.key == 'w') {
              let urlHead = 'https://en.wiktionary.org/wiki/'
              let url = [urlHead, wf].join('')
              window.open(url, '_blank')
          } else if (e.key == 'v') {
              // saveClip(e)
          } else if (e.key == 'c') {
              // copyTextToClipboard(wf)
          }
      }, false);

      document.body.addEventListener("click", function(e) {
      let target = e.target
      // let selection = getSelectionText()
      // if (selection) return
      if (target.classList.contains('trns')) {
        if (e.shiftKey) return
        target.classList.toggle('overflow-y-auto')
        target.classList.toggle('max-h-24')
      } else if (target.classList.contains('esc')) {
        let opopup = target.closest('.popup')
        opopup.classList.add('hidden')
      } else if (target.classList.contains('wf')) {
        let omorphs = document.body.querySelector('#popup-morphs')
        if (omorphs) omorphs.classList.remove('hidden')
        let ocogns = document.body.querySelector('#popup-cognates')
        if (ocogns) ocogns.classList.add('hidden')
        let oforms = document.body.querySelector('#popup-forms')
        if (oforms) oforms.classList.add('hidden')
      } else if (target.classList.contains('cognates')) {
        let ocogns = document.body.querySelector('#popup-cognates')
        if (ocogns) ocogns.classList.remove('hidden')
      }
    }, false);
  })

  function closeAll() {
      let oforms = document.querySelector('#popup-forms')
      // if (!oforms) return
      if (oforms && !oforms.classList.contains('hidden')) {
          oforms.classList.add('hidden')
          return
      }
      let ocogns = document.querySelector('#popup-cognates')
      if (ocogns && !ocogns.classList.contains('hidden')) {
          ocogns.classList.add('hidden')
          return
      }
      let omorphs = document.querySelector('#popup-morphs')
      if (!omorphs) return
      if (!omorphs.classList.contains('hidden')) {
          omorphs.classList.add('hidden')
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

  function getSelectionText() {
    var text = "";
    if (window.getSelection) {
      text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
      text = document.selection.createRange().text;
    }
    return text;
}

</script>

<!-- <a rel="external" target="_blank" href="https://tradingstrategy.ai/docs/index.html">Documentation</a> -->

<div class="flex flex-col min-h-screen_ max-h-screen_ h-screen overflow-hidden bg-[#F7F6EE]">
    <main class="flex flex-grow overflow-hidden">

        <div class="w-1/6 p-4 bg-gray-200 flex flex-1 flex-col justify-between">
          <div class="mt-24 m-4">
            <p>Anthrax v.2.0 - <b>beta</b> </p>
            <p><a href="/">home</a></p>
            <p><a href="/code">Code & License</a></p>
            <p><a href="/thanks">Special thanks</a></p>
            <p></p>
          </div>

          <hosting>
            <p>hosting: <a href="https://www.basealt.ru/">https://www.basealt.ru</a></p>
          </hosting>
        </div>

        <div class="flex flex-col w-5/6 p-4 h-full overflow-y-auto">
            <slot />
        </div>

    </main>
<!-- </div> -->
</div>
