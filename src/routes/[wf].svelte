<script context="module">
 // export const router = false;

</script>

<script>

  import { onMount } from 'svelte'
  import { goto } from '$app/navigation';
  // import Moveable from "svelte-moveable";
  // let moveable;
  // let target;

  let Fly

  function onMouseDown(e) {
    target = e.target;

    setTimeout(() => {
      moveable.dragStart(e);
      console.log('=============')
    });
  }

  export let chains
  onMount(async () => {
    document.addEventListener('paste', (e) => {
      const copiedText = e.clipboardData.getData('text/plain');
      let html = copiedText.replace(/([^\p{P} ]+)/ug, "<span class=\"wf\">$1</span>")
      // console.log('_HTML', copiedText)
      let oclip = document.querySelector('#clip-results')
      oclip.innerHTML = html
    })

    Fly = (await import('./Fly.svelte')).default;

  })

  async function handleClick(ev) {
    let owf = ev.target
    let wf = owf.textContent
    if (!wf) return
    let oresults = document.querySelector('#anthrax-results')
    oresults.innerHTML = ''

    goto(wf)

    /* let tree = jsonview.create(res) */
    /* jsonview.render(tree, oresults) */
    /* jsonview.expand(tree) */
  }

</script>


<svelte:component this={Fly} answer={42}>
	<p>some slotted content</p>
</svelte:component>


<p>
    сюда - ctrl-v, mouse, etc. Дернуть anthrax. Всплывающее окно. wf - pathname, reload - ssr
</p>
<p>
  ==============
</p>


<h1 class="text-xl font-bold mb-4">anthrax</h1>

<div class="overflow-y-auto">

    <p id="clip-results" class="px-8" on:click={handleClick}>== <span class="wf">φιλοσοφίαν</span> <span class="wf">ἀνηρώτων</span>   == </p>

    <p>chains: {chains}</p>
</div>

<p id="anthrax-results" class="px-8">anthrax-results</p>

<style>
  .moveable-line {
    position: absolute;
    width: 1px;
    height: 1px;
    background: #4af;
    transform-origin: 0px 0.5px;
  }
</style>
