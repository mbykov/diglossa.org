<script>
    import { page } from "$app/stores";
    import { goto } from '$app/navigation';

    const log = console.log

    function goBack(ev) {
        let oleft = document.querySelector('.left')
        if (!oleft) return
        let oright = document.querySelector('.right')
        oleft.classList.remove('hidden')
        oright.classList.add('hidden')
        // oleft.classList.toggle('sm:hidden')
        // oright.classList.toggle('sm:hidden')
        goto('/')
    }

</script>

<div class="header flex p-4 bg-white cursor-pointer w-full" on:click={goBack}>
    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12l4-4m-4 4 4 4"/>
    </svg>
    <div class="px-4"> kkk </div>
</div>
