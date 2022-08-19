<script>
  import "../app.css";
 import { onMount } from 'svelte'

 onMount(async () => {
     document.addEventListener('paste', (e) => {
      const copiedText = e.clipboardData.getData('text/plain');
      let html = copiedText.replace(/([^\p{P} ]+)/ug, "<span class=\"wf\">$1</span>")
      let oclip = document.querySelector('#clip-results')
      oclip.innerHTML = html
    })

    document.body.addEventListener("keydown", function(e) {
       let key = e.which || e.keyCode; // keyCode detection
        if (key == 67 && e.ctrlKey ) {
          let owf = document.querySelector('.wf:hover')
          if (!owf || !owf.textContent) return
          // console.log("Ctrl + C Pressed !", owf.textContent);
          copyTextToClipboard(owf.textContent)
        }
    }, false);
      document.body.addEventListener("click", function(e) {
        let target = e.target
        if (target.classList.contains('trns')) {
          console.log('TRNS')
          target.classList.toggle('overflow-y-auto')
          target.classList.toggle('max-h-24')
          //target.classList.add('bg-gray-100')

        } else if (target.classList.contains('wf')) {
          let omorph = document.body.querySelector('#popup-morph')
          console.log('_OMORPH', omorph)
          omorph.classList.toggle('hidden')
        }
      }, false);


  })

  function copyTextToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
      console.log('Async: Copying!', text);
    }, function(err) {
      console.error('Async: Could not copy text: ', err);
    });
  }
</script>




<div class="flex flex-col min-h-screen_ max-h-screen_ h-screen overflow-hidden bg-[#F7F6EE]">
    <main class="flex flex-grow overflow-hidden">

        <div class="w-1/6 p-4 bg-gray-200">
            <p>anthrax</p>
            <!-- <NavBar /> -->
            <div class="mt-24 m-4">
                <p><a href="/">home</a></p>
            </div>
        </div>

        <div class="flex flex-col w-5/6 p-4 h-full overflow-y-auto">
            <p>main</p>
            <slot />
        </div>

    </main>
</div>
