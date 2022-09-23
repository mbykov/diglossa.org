<script>
  import "../app.css";
  import { onMount } from 'svelte'
  import Examples from './Examples.svelte'

 onMount(async () => {
     document.addEventListener('paste', (e) => {
         const copiedText = e.clipboardData.getData('text/plain');
       // console.log('_CP', copiedText)
       let html = copiedText.replace(/([\n]+)/ug, "<br>$1")
       html = html.replace(/([^\p{P} \n]+)/ug, "<span class=\"wf\">$1</span>")
       let oclip = document.querySelector('#clip-results')
       oclip.innerHTML = html
   })

    document.body.addEventListener("keydown", function(e) {
        // let key = e.which || e.keyCode; // keyCode detection // v = 67
        if (e.key == 'Escape' ) {
          closeAll()
        } else if (e.key == 'c') {
            if (e.ctrlKey) {
                let hovered = document.querySelector('span.wf:hover')
                if (hovered) copyTextToClipboard(hovered.textContent)
            } else {
                // let ocogns = document.body.querySelector('#popup-cognates')
                // if (ocogns) ocogns.classList.remove('hidden')
            }
        } else if (e.key == 'p') {
            let owordform = document.body.querySelector('#wordform')
            let wf = owordform.textContent
            let urlHead = 'https://www.perseus.tufts.edu/hopper/morph?l='
            let urlTail = '&la=greek'
            let url = [urlHead, wf, urlTail].join('')
            window.open(url, '_blank') // .focus();
        } else if (e.key == 'w') {
            let oforms = document.body.querySelector('#popup-forms')
            let owordform = document.body.querySelector('#wordform')
            let wf = owordform.textContent
            let urlHead = 'https://en.wiktionary.org/wiki/'
            let url = [urlHead, wf].join('')
            window.open(url, '_blank')
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
          // } else if (target.classList.contains('examples')) {
              // console.log('_LAYOUT EXAMPLE')
              // dispatchExamples()
              // let opopup = target.closest('.popup')
              // opopup.classList.add('hidden')
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
      if (!oforms) return
      if (!oforms.classList.contains('hidden')) {
          oforms.classList.add('hidden')
          return
      }
      let ocogns = document.querySelector('#popup-cognates')
      if (!ocogns) return
      // console.log('_ocogns', ocogns)
      if (!ocogns.classList.contains('hidden')) {
          ocogns.classList.add('hidden')
          // console.log('_ocogns return')
          return
      }
      let omorphs = document.querySelector('#popup-morphs')
      console.log('_omorphs', omorphs)
      if (!omorphs) return
      if (!omorphs.classList.contains('hidden')) {
          omorphs.classList.add('hidden')
          // console.log('_omorphs return')
          return
      }
  }

  function copyTextToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
      console.log('Async: Copying!', text);
    }, function(err) {
      console.error('Async: Could not copy text: ', err);
    });
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

        <div class="w-1/6 p-4 bg-gray-200">
            <p>anthrax</p>
            <div class="mt-24 m-4">
                <p><a href="/">home</a></p>
                <p><a href="/examples">examples</a></p>
            </div>
        </div>

        <div class="flex flex-col w-5/6 p-4 h-full overflow-y-auto">
            <slot />
        </div>

    </main>
</div>
