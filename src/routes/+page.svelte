<script>

    import { onMount } from 'svelte'
    import { goto } from '$app/navigation';
    import SavedChunks from './lib/SavedChunks.svelte'

    async function handleClick(ev) {
        let owf = ev.target
        if (!owf.classList.contains('wf')) return

        let wf = owf.textContent
        if (!wf) return
        goto(wf)
    }

</script>

<!-- <div class="h-full overflow-x-hidden flex w-full" on:click={handleClick}> -->
<!--   <div id="clip-results" class="container p-4 "> -->

<!--   </div> -->
<!--   <div class="container p-4"> -->
<!--       <div class="attettion p-4 m-4 bg-white"> -->
<!--           <p>copy ctrl-C any Ancient Greek text (UTF-8) anywhere,</p> -->
<!--           <p>then ctrl-V here, as if you pasting it</p> -->
<!--           <p>then click a word</p> -->
<!--           <p></p> -->
<!--     </div> -->

<!--       =================PPPPPPPPPPPPPPP -->
<!--       <SavedChunks /> -->

<!--   </div> -->
<!-- </div> -->

  <!-- <div class="container p-4"> -->
      <div class="attention p-4 m-4 bg-white">
          <p>copy ctrl-C any Ancient Greek text (UTF-8) anywhere,</p>
          <p>then ctrl-V here, as if you pasting it</p>
          <p>then click a word</p>
          <p></p>
    </div>

      =================PPPPPPPPPPPPPPP
      <SavedChunks />

  <!-- </div> -->
