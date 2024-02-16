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

<div class="attention p-4 m-4 bg-white">
    <p>copy ctrl-C any Ancient Greek text (UTF-8) anywhere,</p>
    <p>then ctrl-V here, as if you pasting it</p>
    <p>then click a greek word</p>
    <p></p>
</div>

<SavedChunks />

  <!-- </div> -->
