<script>

  import { goto } from '$app/navigation';
  import Anthrax from '../Anthrax.svelte'
  import Examples from '../Examples.svelte'
  import Segments from './Segments.svelte'
  import Cdicts from './Cdicts.svelte'

  export let data
  $: chains = data.chains
  $: wf = data.wf
  $: console.log('_[WF]:', wf, 2, chains)
  $: segments = data.segments
  $: console.log('_[WF-segs]:', segments)
  $: cdicts = chains[0].find(seg=> seg.mainseg).cdicts
  $: console.log('_[CDICTS]:', cdicts)

  $: cdicts = []
  function xxxx(seg) {
    let segment = seg.detail
    console.log('_PARENT showDicts', segment)
    cdicts = segment.cdicts
  }


 async function handleClick(ev) {
     let owf = ev.target
     if (!owf.classList.contains('wf')) return
     wf = owf.textContent
     if (!wf) return
     let oresults = document.querySelector('#anthrax-results')
     oresults.innerHTML = ''
     goto(wf)
 }

</script>

<div class="flex h-full bg-[#F7F6EE]">
  <div class="w-2/5 p-4">

            <div class="overflow-y-auto">
                <div id="clip-results" class="px-8" on:click={handleClick}>
                <p>
                    <span class="wf">ἁγνότης</span>
                    <span class="wf">ἀγαπητός</span>

                <p>
                    <span class="wf">ἀγαθοποιέω</span>; <span class="wf">βαρύτονος</span>; <span class="wf">παραγράφω</span>; <span class="wf">ἀντιπαραγράφω</span>; <span class="wf">διαγγέλλω</span>; <span class="wf">συγκαθαιρέω</span>; <span class="wf">ἀποδείκνυμι</span>; <span class="wf">χρονοκρατέω</span>; <span class="wf">προσαπαγγέλλω</span>; <span class="wf">ἐπεξήγησις</span>;
                </p>

<p>
                    <span class="wf">φιλοσοφίαν</span> <span class="wf">ἀνηρώτων</span>  <span class="wf">ταῦτα</span> <span class="wf">δὴ</span> <span class="wf">αὐτός</span> <span class="wf">τε</span> <span class="wf">σκοπῶ</span> <span class="wf">καθ'</span> <span class="wf">ὅσον</span> <span class="wf">δύναμαι</span>, <span class="wf">καὶ</span> <span class="wf">τοὺς</span> <span class="wf">ἄλλους</span> <span class="wf">ἐρωτῶ</span> <span class="wf">οἷς</span> <span class="wf">ἂν</span> <span class="wf">ὁρῶ</span> <span class="wf">τοὺς</span> <span class="wf">νέους</span> <span class="wf">ἐθέλοντας</span> <span class="wf">συγγίγνεσθαι</span>
                </p>

                </div>
            </div>

            <p id="anthrax-results" class="px-8">anthrax-results</p>
        </div>

        <div class="flex flex-col w-3/5 overflow-y-auto px-8 ">
            <p>RIGHT========================</p>
            {#if wf == 'examples'}
              <svelte:component this={Examples} {wf} />
            {/if}
        </div>

</div>

{#if wf == 'examples'}
  <!-- <svelte:component this={Examples} {wf} /> -->
{:else}
    <div id="popup-morph" class="absolute w-1/2 right-4 top-4 -my-4 h-screen p-4 pr-1">
      <div class="h-full bg-[#FAFAD2] shadow-2xl overflow-y-auto">
        <div class="main-title text-right px-2">
            <span class="dict">wkt</span> <span class="dict">dvr</span> <span class="esc w-1/3 text-right"> [x]</span>
        </div>

        <div class="wf px-4 text-green-600">wordform: <b>{wf}</b></div>

        <div class="title flex flex-cols px-4">
            <div class="wf w-1/3">
                <svelte:component this={Segments} {segments} {wf} />
            </div>
            <div class="wf w-1/3">   </div>
            <div class="segs w-1/3 text-right">
                <svelte:component this={Segments} {segments} {wf} on:segment={xxxx} />
            </div>
        </div>

        <svelte:component this={Cdicts} {cdicts} {wf} />

        <!-- {#each chains as chain} -->
        <!--   <svelte:component this={Anthrax} {chain} {wf} /> -->
        <!-- {/each} -->
      </div>
    </div>
{/if}

<style>
 .esc {
   color: maroon;
   cursor: pointer;
 }
 .dict {
   color: maroon;
   cursor: pointer;
 }
</style>
