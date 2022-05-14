<script>
  import _ from 'lodash'
  import { onMount } from 'svelte'
  import jsonview from '@pgrabovets/json-view'
  // import Clipboard from "svelte-clipboard";
  // import clipboard from 'clipboardy';
  import {franc, francAll} from 'franc-min'

  import { anthrax } from "@mbykov/anthrax"

  onMount(async () => {
		// const res = await fetch(`/tutorial/api/album`);
		// photos = await res.json();
    const data = '{"name": "json-view","version": "1.0.0"}'
    let tree = jsonview.create(data)
    jsonview.render(tree, document.querySelector('#anthrax-results'))
    jsonview.expand(tree)

    // let anthrax = await import('/home/michael/greek/anthrax')
    let wf = 'ἀθλητής'
    // let res = await anthrax(wf)
    // console.log('_R', res)

    // tree = jsonview.create(res)
    // jsonview.render(tree, document.querySelector('#anthrax-results'))
    // jsonview.expand(tree)


    let lang = franc('ἀθλητικός πολέμου τῶν καλῶν')
    console.log('_LANG', lang)

    // https://github.com/mbykov/anthrax
	});

  let ctrlDown = false,
      ctrlKey = 17,
      cmdKey = 91,
      vKey = 86,
      cKey = 67;


  let key;
	let keyCode;

	async function handleKeydown(e) {
		key = e.key
		keyCode = e.keyCode
    console.log('_KEY', key)

    if (e.keyCode == ctrlKey || e.keyCode == cmdKey) ctrlDown = true
    if (ctrlDown && (e.keyCode == cKey)) console.log("Document catch Ctrl+C")
    if (ctrlDown && (e.keyCode == vKey)) console.log("Document catch Ctrl+V")
    if (ctrlDown && (e.keyCode == vKey)) {
      // let text = await clipboard.read()
      // console.log("CLIPBOARD", text)
    }


	}

	function handleKeyup(event) {
    if (e.keyCode == ctrlKey || e.keyCode == cmdKey) ctrlDown = false
	}

  document.addEventListener('paste', (e) => {
    const copiedText = e.clipboardData.getData('text/plain');
    // console.log('_HTML', copiedText)
    let oclip = document.querySelector('#clip-results')
    oclip.textContent = copiedText
  })

</script>

<svelte:window on:keydown={handleKeydown}/>

<div class="px-8">
  <h1 class="text-xl text-pink-500">App?! ===</h1>
  <p>A short introduction would have been nice here...</p>

  <!-- <p id="anthrax-results" contenteditable="true" class="px-8">editable</p> -->
  <p id="anthrax-results" class="px-8">editable</p>
  <p id="clip-results" class="px-8">clip</p>

</div>

<!-- <a href="/guide">guide</a> -->
