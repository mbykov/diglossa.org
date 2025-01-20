<script>

    import { page } from '$app/state';

    const log = console.log

    let { data } = $props()
    log('_AB_DATA', data)

</script>


<p>
    <!-- about ================= {canonicalPath} -->
    about ================= {page.url.href}
    <!-- ==> {data.content} -->
   </p>

<p>{@html data.content}</p>
