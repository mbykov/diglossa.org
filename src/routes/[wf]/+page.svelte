<script>
    const log = console.log
    let { data } = $props()

    $effect(() => {
        log('__________________eff WF', data.wf)
        log('__________________chains', data.chains)
        // log('__________________KU')
    })

</script>

<p>
    WF
</p>
