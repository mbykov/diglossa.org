<script>
  import _ from 'lodash'
  import { onMount } from 'svelte'
  import jsonview from '@pgrabovets/json-view'
  // import Clipboard from "svelte-clipboard";
  // import clipboard from 'clipboardy';
  import {franc, francAll} from 'franc-min'

  // import { anthrax } from "@mbykov/anthrax"
  import { anthrax } from "/home/michael/greek/anthrax"

  onMount(async () => {
		// const res = await fetch(`/tutorial/api/album`);
		// photos = await res.json();
    const data = '{"name": "json-view","version": "1.0.0"}'
    let tree = jsonview.create(data)
    jsonview.render(tree, document.querySelector('#anthrax-results'))
    jsonview.expand(tree)

    let wf = 'ἀθλητής'
    // let res = await anthrax(wf)
    // console.log('_RES', res)

    // tree = jsonview.create(res)
    // jsonview.render(tree, document.querySelector('#anthrax-results'))
    // jsonview.expand(tree)

    let greek= "ἀλλ᾿ ἥ γε ὑπὸ τὸν Καύκασον λίμνη, ἣν καλοῦσιν οἱ ἐκεῖ θάλατταν· αὕτη γὰρ ποταμῶν πολλῶν καὶ μεγάλων εἰσβαλλόντων οὐκ ἔχουσα ἔκρουν φανερὸν ἐκδίδωσιν ὑπὸ γῆν κατὰ Κοραξούς, περὶ τὰ καλούμενα βαθέα τοῦ Πόντου·"


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
    let html = copiedText.replace(/([^\p{P} ]+)/ug, "<span class=\"wf\">$1</span>")
    // console.log('_HTML', copiedText)
    let oclip = document.querySelector('#clip-results')
    oclip.innerHTML = html
  })

  async function handleClick(ev) {
    let owf = ev.target
    let wf = owf.textContent
    console.log('_CLICK', owf.textContent)
    let res = await anthrax(wf)
    console.log('_CLICK_RES', res)
    let oresults = document.querySelector('#anthrax-results')
    oresults.innerHTML = ''

    let tree = jsonview.create(res)
    jsonview.render(tree, oresults)
    jsonview.expand(tree)

  }


</script>

<svelte:window on:keydown={handleKeydown}/>

<div class="flex flex-wrap h-screen gap-3_ mx-8 ">

  <div class="p-8 w-1/2  bg-[#FFFACD] left-shadow ">
  <!-- <div class="p-8 w-1/2  bg-[#f7fafc] left-shadow"> -->
    <p id="clip-results" class="px-8" on:click={handleClick}>clip</p>
  </div>

  <div class="p-8 w-1/2 ">
      <h1 class="text-xl text-pink-500">App?! ===</h1>
      <p id="anthrax-results" class="px-8">editable</p>

      <p> ἀλλ᾿ ἥ γε ὑπὸ τὸν Καύκασον λίμνη, ἣν καλοῦσιν οἱ ἐκεῖ θάλατταν· αὕτη γὰρ ποταμῶν πολλῶν καὶ μεγάλων εἰσβαλλόντων οὐκ ἔχουσα ἔκρουν φανερὸν ἐκδίδωσιν ὑπὸ γῆν κατὰ Κοραξούς, περὶ τὰ καλούμενα βαθέα τοῦ Πόντου·</p>

      <p>But there is the lake beneath the Caucasus, which the inhabitants call a sea: for this is fed by many great rivers, and having no obvious outlet runs out beneath the earth in the district of the Coraxi and comes up somewhere about the so-called deeps of Pontus [3] Aristotle. Meteorologica</p>
  </div>

</div>

<style>
.left-shadow {
  box-shadow: -15px 0 15px -15px #333;
}

</style>

<!-- <a href="/guide">guide</a> -->
