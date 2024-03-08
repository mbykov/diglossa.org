<script>

    import { onMount } from 'svelte'
    import { goto } from '$app/navigation'
    import Anthrax from './lib/Anthrax.svelte'

    export let data

    let wf = ''
    let chains = [] //, cdicts = []

     $: {
         chains = data.chains
         // console.log('_$: CHS', chains)
         wf = data.wf
     }


    onMount(async () => {
        // console.log('_paste new chunk =====')
    })



</script>


        <Anthrax {chains} {wf} />
