<script>

 import { onMount } from 'svelte'
 import { goto } from '$app/navigation';

 // let Fly
 import Anthrax from './Anthrax.svelte'

 export let chains, wf

 onMount(async () => {
   console.log('_PARSE', chains)
 })

 async function handleClick(ev) {
   let owf = ev.target
   if (!owf.classList.contains('wf')) return
     wf = owf.textContent
     if (!wf) return
     let oresults = document.querySelector('#anthrax-results')
     oresults.innerHTML = ''

     goto(wf)

     /* let tree = jsonview.create(res) */
     /* jsonview.render(tree, oresults) */
     /* jsonview.expand(tree) */
 }

</script>

<div class="flex h-full bg-[#F7F6EE]">

        <div class="w-2/5 p-4">
            <p>
                сюда - ctrl-v, mouse, etc. Дернуть anthrax. Всплывающее окно. wf - pathname, reload - ssr
            </p>

            <div class="overflow-y-auto">

                <p id="clip-results" class="px-8" on:click={handleClick}></p>

                <p class="px-8" on:click={handleClick}>== <span class="wf">ἁγνότης</span> <span class="wf">φιλοσοφίαν</span> <span class="wf">ἀνηρώτων</span>  <span class="wf">ταῦτα</span> <span class="wf">δὴ</span> <span class="wf">αὐτός</span> <span class="wf">τε</span> <span class="wf">σκοπῶ</span> <span class="wf">καθ'</span> <span class="wf">ὅσον</span> <span class="wf">δύναμαι</span>, <span class="wf">καὶ</span> <span class="wf">τοὺς</span> <span class="wf">ἄλλους</span> <span class="wf">ἐρωτῶ</span> <span class="wf">οἷς</span> <span class="wf">ἂν</span> <span class="wf">ὁρῶ</span> <span class="wf">τοὺς</span> <span class="wf">νέους</span> <span class="wf">ἐθέλοντας</span> <span class="wf">συγγίγνεσθαι</span></p>

                <!-- <p>ΣΩ. Εἰ μὲν τῶν ἐν Κυρήνῃ μᾶλλον ἐκηδόμην, ὦ Θεόδωρε, τὰ ἐκεῖ ἄν σε καὶ περὶ ἐκείνων ἀνηρώτων, εἴ τινες αὐτόθι περὶ γεωμετρίαν ἤ τινα ἄλλην φιλοσοφίαν εἰσὶ τῶν νέων ἐπιμέλειαν ποιούμενοι· νῦν δὲ ἧττον γὰρ ἐκείνους ἢ τούσδε φιλῶ, καὶ μᾶλλον ἐπιθυμῶ εἰδέναι τίνες ἡμῖν τῶν νέων ἐπίδοξοι γενέσθαι ἐπιεικεῖς. ταῦτα δὴ αὐτός τε σκοπῶ καθ' ὅσον δύναμαι, καὶ τοὺς ἄλλους ἐρωτῶ οἷς ἂν ὁρῶ τοὺς νέους ἐθέλοντας συγγίγνεσθαι. σοὶ δὴ οὐκ ὀλίγιστοι πλησιάζουσι, e  καὶ δικαίως· ἄξιος γὰρ τά τε ἄλλα καὶ γεωμετρίας ἕνεκα. εἰ δὴ οὖν τινι ἐνέτυχες ἀξίῳ λόγου, ἡδέως ἂν πυθοίμην.</p> -->

                ἁγνότης
            </div>

            <p id="anthrax-results" class="px-8">anthrax-results</p>
        </div>


        <div class="flex flex-col w-3/5 overflow-y-auto px-8 ">
            <p>RIGHT========================</p>

        </div>

</div>


<div id="popup-morph" class="hidden absolute w-1/2 right-4 top-4 -my-4 h-screen p-4 pr-1">
    <div class="h-full bg-[#FAFAD2] shadow-2xl overflow-y-auto">
        {#each chains as chain}
            <svelte:component this={Anthrax} {chain} {wf} />
        {/each}
    </div>
</div>
