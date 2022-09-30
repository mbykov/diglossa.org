<script>

  import { goto } from '$app/navigation';
  import Examples from './examples/+page.svelte'
  import { onMount, setContext } from 'svelte'

  // setContext('showExamples', true)

  // let wf = ''

  async function handleClick(ev) {
      let owf = ev.target
      if (!owf.classList.contains('wf')) return
      wf = owf.textContent
      if (!wf) return
      goto(wf)
  }

  // function onKeyDown(e) {
  //     if (!e.ctrlKey) return
  //     switch(e.key) {
  //     case 'c':
  //         let oexample = document.querySelector('#simple-example')
  //         let html = oexample.innerHTML
  //         console.log('_COPYING', oexample, html)
  //         // setContext('clippedHTM', html)
  //         break;
  //     case 'Escape':
  //         break;
  //     }
  // }



</script>


<div class="flex h-full bg-[#F7F6EE]">
  <div class="w-2/5 p-4">

    <div class="overflow-y-auto">
      <div id="clip-results" class="px-8" on:click={handleClick} >
    <p><b>Anthrax</b> (ulcer, i.e. disease), v.2.0 based on the data from <a href="https://en.wiktionary.org/wiki/Category:Ancient_Greek_language">wiktionary.org</a>. </p>

    <p>Copy any ancient Greek text (utf-8) from anywhere. Paste with ctrl-V here. Click on the word</p>

    <ul class="py-8">
      <li>1. morphological analysis of the word </li>
      <li>2. analysis of compound words, even those that are not in dictionaries </li>
      <li>3. finding cognates words (works well, where the "roots" are longer than 2-3 characters) </li>
      <li>4. showing the word paradigm, i.e. declension / conjugation of the word</li>
    </ul>

    <ul class="py-8">
      <li>short keys: </li>
      <li><b>C</b> - cognates </li>
      <li><b>F</b> - paradigms</li>
      <li><b>P</b> - this word at Perseus</li>
      <li><b>W</b> - at Wiktionary</li>
    </ul>

    <p><b>examples:</b></p>
    <p><a href="/compounds">some compounds</p>
    <p></p>
    <p></p>
    <p></p>
        <p></p>
      </div>
    </div>
  </div>

  <div class="flex flex-col w-3/5 overflow-y-auto px-8 ">
    <img src="anthrax-01.png">
  </div>
</div>










<!-- ================= OLD -->

<!-- <div class="index flex h-full bg-[#F7F6EE] "> -->
<!--   <div class="w-2/5 p-4"> -->


<!--   </div> -->

<!--   <div class="flex flex-col w-3/5 p-4 overflow-y-auto"> -->

<!--   </div> -->

<!-- </div> -->
