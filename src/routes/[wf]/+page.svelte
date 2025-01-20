<script>
    const log = console.log
    let { data } = $props()
    log('__________________WF', data.wf)
    log('__________________chains', data.chains)
    log('__________________KU')

    $effect(() => {
        log('__________________eff WF', data.wf)
        log('__________________chains', data.chains)
        log('__________________KU')
    })

</script>

<p>
    WF
</p>
