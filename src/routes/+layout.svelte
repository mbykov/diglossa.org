<script>
	import '../app.css';
    import { onMount } from 'svelte'
    import Header from "$lib/ui/Header.svelte"
    import LeftHeader from "$lib/ui/LeftHeader.svelte"
    import RightHeader from "$lib/ui/RightHeader.svelte"
    import Clip from "$lib/ui/Clip.svelte"
    import { goto } from '$app/navigation';
    import { Button } from 'flowbite-svelte';
    import { chunks, locale } from "$lib/shared.svelte";
    // import { page } from '$app/state';

    export const prerender = true

    const log = console.log

    function showLeft() {
        let oleft = document.querySelector('.left')
        if (!oleft) return
        let oright = document.querySelector('.right')
        oleft.classList.remove('hidden')
        oright.classList.add('hidden')
    }

    function showRight() {
        let oleft = document.querySelector('.left')
        if (!oleft) return
        let oright = document.querySelector('.right')
        oleft.classList.add('hidden')
        oright.classList.remove('hidden')
    }


    let cchunk = $state({})

    // let unique = {}

    let { children } = $props();

    onMount(async () => {
    })

    function onPaste(ev) {
        const copiedText = ev.clipboardData.getData('text/plain');
        let rows = copiedText.trim().split('\n')
        if (!rows.length) return
        let title = rows[0].slice(0, 25)
        if (!title) return
        let now = new Date()
        let date = now.toLocaleDateString(locale.current)
        cchunk = {date, title, rows}
        log('_lay onPaste cchunk', cchunk)
        // unique = {}
        // showLeft()
        // showClip(cchunk)
    }

    function gotoWF(ev) {
        let owf = ev.target
        if (!owf.classList.contains('wf')) return
        let wf = owf.textContent
        // log('______________________goto WF', wf)
        if (!wf) return
        goto(wf)
    }

    function saveCurrent(ev) {
        log('______________________saveCurrent')
        // chunks.current.push(cchunk)
        // goto('/texts')
    }


</script>

<!-- <svelte:window on:keydown={onKeyDown} on:paste={onPaste} /> -->

<svelte:window on:paste={onPaste} />

<div class="flex flex-col min-h-screen p-4_ w-full onclick={gotoWF}">

    <!-- {@render children()} -->
    <div class="flex flex-row justify-between flex-grow bg-gray-200 ">

        <left class="left w-full md:w-1/2_ p-4_ bg-gray-300 hidden md:block" on:click={gotoWF}>
            <LeftHeader />
            <!-- {#key unique} -->
            <Clip {cchunk} />
            <!-- {/key} -->
        </left>

        <main class="right w-full md:w-1/2_ w-full p-4_ sm:hidden_ md:block">
            <RightHeader />
	        {@render children()}
        </main>

    </div>

    <footer class="bg-gray-100 p-1">Footer</footer>
</div>
