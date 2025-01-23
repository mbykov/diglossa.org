<script>

    import { page } from '$app/state';

    import { onMount } from 'svelte'

    onMount(async () => {
        let oleft = document.querySelector('.left')
        if (!oleft) return
        let oright = document.querySelector('.right')
        oleft.classList.add('hidden')
        oright.classList.remove('hidden')
    })

    const log = console.log

    let { data } = $props()
    // log('_ABOUT_DATA', data)

</script>



<div class="p-4">
    <p> about ================= {page.url.href}</p>
    {@html data.content}
</div>
