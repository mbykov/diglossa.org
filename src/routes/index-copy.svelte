<script>

 import { anthrax } from "@mbykov/anthrax"
 import { onMount } from 'svelte'
 import { goto } from '$app/navigation';

 onMount(async () => {
     document.addEventListener('paste', (e) => {
         const copiedText = e.clipboardData.getData('text/plain');
         let html = copiedText.replace(/([^\p{P} ]+)/ug, "<span class=\"wf\">$1</span>")
         // console.log('_HTML', copiedText)
         let oclip = document.querySelector('#clip-results')
         oclip.innerHTML = html
     })

 })


 async function handleClick(ev) {
     let owf = ev.target
     let wf = owf.textContent
     if (!wf) return
     let res = await anthrax(wf)
     console.log('_CLICK_RES', wf, res)
     let oresults = document.querySelector('#anthrax-results')
     oresults.innerHTML = ''

     goto(wf)

     /* let tree = jsonview.create(res) */
     /* jsonview.render(tree, oresults) */
     /* jsonview.expand(tree) */
 }

</script>

<p>
    сюда - ctrl-v, mouse, etc. Дернуть anthrax. Всплывающее окно. wf - pathname, reload - ssr
</p>

<h1 class="text-xl font-bold mb-4">anthrax</h1>

<div class="overflow-y-auto">

    <p id="clip-results" class="px-8" on:click={handleClick}>clip</p>

</div>

<p id="anthrax-results" class="px-8">anthrax-results</p>
