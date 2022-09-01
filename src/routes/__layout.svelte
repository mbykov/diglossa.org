<script>
  import "../app.css";
  import { onMount } from 'svelte'
  import { goto } from '$app/navigation';

 onMount(async () => {
     document.addEventListener('paste', (e) => {
      const copiedText = e.clipboardData.getData('text/plain');
       console.log('_CP', copiedText)
      let html = copiedText.replace(/([^\p{P} ]+)/ug, "<span class=\"wf\">$1</span>")
      let oclip = document.querySelector('#clip-results')
      oclip.innerHTML = html
    })

    document.body.addEventListener("keydown", function(e) {
       let key = e.which || e.keyCode; // keyCode detection // v = 67
        if (e.key == 'v' && e.ctrlKey ) {
          let owf = document.querySelector('.wf:hover')
          if (!owf || !owf.textContent) return
          copyTextToClipboard(owf.textContent)
        } else if (e.key == 'Escape') {
          closeAll()
        }
    }, false);

      document.body.addEventListener("click", function(e) {
        let target = e.target
        if (target.classList.contains('trns')) {
          console.log('_XXX CLICK')
          target.classList.toggle('overflow-y-auto')
          target.classList.toggle('max-h-24')
        } else if (target.classList.contains('esc')) {
          closeAll()
        } else if (target.classList.contains('wf')) {
          let omorph = document.body.querySelector('#popup-morph')
          if (omorph) omorph.classList.remove('hidden')
        }
      }, false);

   function closeAll() {
     let opopups = document.querySelectorAll('.absolute')
     for (let opopup of opopups) {
       opopup.classList.add('hidden')
     }
   }

  })

  function copyTextToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
      console.log('Async: Copying!', text);
    }, function(err) {
      console.error('Async: Could not copy text: ', err);
    });
  }


  // async function handleClick(ev) {
  //   let owf = ev.target
  //   if (!owf.classList.contains('target')) return
  //   let wf = owf.textContent
  //   if (!wf) return
  //   goto(wf)
  // }

</script>

<div class="flex flex-col min-h-screen_ max-h-screen_ h-screen overflow-hidden bg-[#F7F6EE]">
    <main class="flex flex-grow overflow-hidden">

        <div class="w-1/6 p-4 bg-gray-200">
            <p>anthrax</p>
            <div class="mt-24 m-4">
                <p><a href="/">home</a></p>
                <p><a href="/examples">examples_1</a></p>
                <!-- <p class="target" on:click={handleClick}>examples</p> -->
            </div>
        </div>

        <div class="flex flex-col w-5/6 p-4 h-full overflow-y-auto">
            <slot />
        </div>

    </main>
</div>
