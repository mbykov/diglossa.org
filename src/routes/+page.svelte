<script>

    import { onMount } from 'svelte'
    import { goto } from '$app/navigation';
    import { clip, textChunk } from '$lib/store.js';

    export let data
    let rows = data.example.split("\n")


    onMount(async () => {
      let oclip = document.querySelector('#clip-results')
      // oclip.innerHTML = html
      for (let row of rows) {
          let opar = document.createElement('p')
          opar.innerHTML = row.replace(/([^\p{P} \n]+)/ug, " <span class=\"wf\">$1</span>")
          oclip.appendChild(opar)
      }
      let html = oclip.innerHTML
      textChunk.update(text => {
          text = html
          return text
      });

        function onPaste() {
	        console.log('_PASTE')
        }

    })

  // let text = copiedText.replace(/([\n]+)/ug, "<br>$1")


 async function handleClick(ev) {
     let owf = ev.target
     if (!owf.classList.contains('wf')) return

     let wf = owf.textContent
     if (!wf) return
     goto(wf)
 }

</script>

<div class="h-full overflow-x-hidden flex w-full" on:click={handleClick}>
  <div id="clip-results" class="container p-4 ">

  </div>
  <div class="container p-4">
    <div class="attettion p-4 m-4 bg-white">
      copy ctrl-C any Ancient Greek text (UTF-8) anywhere and ctrl-V, or just V here, as if you pasting it. Then click a word
    </div>

  </div>
</div>
