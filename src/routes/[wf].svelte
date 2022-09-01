<script>

  import { goto } from '$app/navigation';
  import Anthrax from './Anthrax.svelte'
  import Examples from './Examples.svelte'

  export let chains
  export let wf
  $: console.log('_[WF]:', wf)
  export let kuku
  kuku += ' plus-kuku'
  $: console.log('_xxKUKUxx:', kuku)

 async function handleClick(ev) {
     let owf = ev.target
     if (!owf.classList.contains('wf')) return
     wf = owf.textContent
     if (!wf) return
     let oresults = document.querySelector('#anthrax-results')
     oresults.innerHTML = ''
     goto(wf)
 }

 /* let tree = jsonview.create(res) */
 /* jsonview.render(tree, oresults) */
 /* jsonview.expand(tree) */

</script>

<div class="flex h-full bg-[#F7F6EE]">
  <div class="w-2/5 p-4">
    <p>
      сюда - ctrl-v, mouse, etc. Дернуть anthrax. Всплывающее окно. wf - pathname, reload - ssr
    </p>

            <div class="overflow-y-auto">
                <p id="clip-results" class="px-8" on:click={handleClick}>
                    <span class="wf">ἁγνότης</span>
                    <span class="wf">ἀγαπητός</span>

                    <span class="wf">ἁγνότης</span>
                    <span class="wf">ἁγνότης</span>

                    <span class="wf">φιλοσοφίαν</span> <span class="wf">ἀνηρώτων</span>  <span class="wf">ταῦτα</span> <span class="wf">δὴ</span> <span class="wf">αὐτός</span> <span class="wf">τε</span> <span class="wf">σκοπῶ</span> <span class="wf">καθ'</span> <span class="wf">ὅσον</span> <span class="wf">δύναμαι</span>, <span class="wf">καὶ</span> <span class="wf">τοὺς</span> <span class="wf">ἄλλους</span> <span class="wf">ἐρωτῶ</span> <span class="wf">οἷς</span> <span class="wf">ἂν</span> <span class="wf">ὁρῶ</span> <span class="wf">τοὺς</span> <span class="wf">νέους</span> <span class="wf">ἐθέλοντας</span> <span class="wf">συγγίγνεσθαι</span>

                ἁγνότης

                </p>
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
            {#each chains as chain}
            <svelte:component this={Anthrax} {chain} {wf} />
            {/each}
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
