<script>
 import "../app.css";

 // import Anthrax from './Anthrax.svelte'
</script>




<div class="flex flex-col min-h-screen max-h-screen overflow-hidden bg-[#F7F6EE]">
    <main class="flex flex-grow overflow-hidden">

        <div class="w-1/6 p-4 bg-gray-200">
            <p>anthrax</p>
            <!-- <NavBar /> -->
            <div class="mt-24 m-4">
                <p><a href="/">home</a></p>
            </div>
        </div>

        <div class="flex flex-col w-5/6 p-4 overflow-y-auto">
            <p>main</p>
            <slot />
        </div>

        <!-- <div class="w-3/6 p-4"> -->
            <!-- <Anthrax /> -->
        <!-- </div> -->

        <!-- <div class="w-1/6 p-4"> -->
        <!--     <p>right</p> -->
        <!--     <ul class="mt-8"> -->
        <!--         <li class=""><a href="/code">code</a></li> -->
        <!--         <li class=""><a href="/license">license</a></li> -->
        <!--         <li><a href=""></a></li> -->
        <!--         <li> -->
        <!--             ΣΩ. Εἰ μὲν τῶν ἐν Κυρήνῃ μᾶλλον ἐκηδόμην, ὦ Θεόδωρε, τὰ ἐκεῖ ἄν σε καὶ περὶ ἐκείνων ἀνηρώτων, εἴ τινες αὐτόθι περὶ γεωμετρίαν ἤ τινα ἄλλην φιλοσοφίαν εἰσὶ τῶν νέων ἐπιμέλειαν ποιούμενοι· νῦν δὲ ἧττον γὰρ ἐκείνους ἢ τούσδε φιλῶ, καὶ μᾶλλον ἐπιθυμῶ εἰδέναι τίνες ἡμῖν τῶν νέων ἐπίδοξοι γενέσθαι ἐπιεικεῖς. ταῦτα δὴ αὐτός τε σκοπῶ καθ' ὅσον δύναμαι, καὶ τοὺς ἄλλους ἐρωτῶ οἷς ἂν ὁρῶ τοὺς νέους ἐθέλοντας συγγίγνεσθαι. σοὶ δὴ οὐκ ὀλίγιστοι πλησιάζουσι, e  καὶ δικαίως· ἄξιος γὰρ τά τε ἄλλα καὶ γεωμετρίας ἕνεκα. εἰ δὴ οὖν τινι ἐνέτυχες ἀξίῳ λόγου, ἡδέως ἂν πυθοίμην. -->
        <!--         </li> -->
        <!--     </ul> -->
        <!-- </div> -->

    </main>
</div>
