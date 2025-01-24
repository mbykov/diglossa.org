<script>
	// import { goto } from "$app/navigation"
    import { page } from "$app/stores";
    import _ from 'lodash'
    import { locale } from "$lib/shared.svelte";

    const log = console.log

    import { Radio, Helper } from 'svelte-5-ui-lib';
    let fontSize = $state("base");

    $effect(()=> {
        setFontSize(fontSize)
    })

    function setFontSize(fontSize) {
        let oleft = removeTextStyles()
        let style = 'text-' + fontSize
        oleft.classList.add(style)
    }

    function removeTextStyles() {
        let oleft = window.document.querySelector('.left')
        for (let style of oleft.classList) {
            if (/text-/.test(style)) oleft.classList.remove(style)
        }
        return oleft
    }

</script>

<div class="flex gap-3 p-4">
  <Radio bind:group={fontSize} name="inline-layout" value="sm">sm</Radio>
  <Radio bind:group={fontSize} name="inline-layout" value="base">base</Radio>
  <Radio bind:group={fontSize} name="inline-layout" value="xl">xl</Radio>
  <Radio bind:group={fontSize} name="inline-layout" value="2xl" >2xl</Radio>
  <!-- disabled -->
</div>
