<script>

    // import { page } from '$app/state';

    import { onMount } from 'svelte'

    let { data } = $props()
    let section = $derived(data.section)

    onMount(async () => {
        // let oleft = document.querySelector('.left')
        // if (!oleft) return
        // let oright = document.querySelector('.right')
        // oleft.classList.add('hidden')
        // oright.classList.remove('hidden')
    })

    const log = console.log

    // log('_ABOUT_section', section)

</script>



<!-- <div class="section p-4 px-8 overflow-y-scroll"> -->
    <div class="section p-4 h-[calc(100vh-86px)] h-screen_ overflow-y-scroll" >
        {@html section.code}
    </div>
