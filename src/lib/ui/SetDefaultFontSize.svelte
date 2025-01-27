<script>
    // import { page } from "$app/stores";
    import _ from 'lodash'
    import { fontsize } from "$lib/shared.svelte";
    import { setfontsize } from "$lib/ui/setFontSize.js";

    const log = console.log

    import { Radio, Helper } from 'svelte-5-ui-lib';

    let fontSize = $state(fontsize.current)

    function setFontSize(ev) {
        let fontSize = ev.target.value
        fontsize.current = fontSize
        setfontsize()
    }

</script>

<div class="flex gap-3 p-4" onchange={setFontSize}>
  <Radio bind:group={fontSize} name="inline-layout" value="sm">sm</Radio>
  <Radio bind:group={fontSize} name="inline-layout" value="base">base</Radio>
  <Radio bind:group={fontSize} name="inline-layout" value="xl">xl</Radio>
  <Radio bind:group={fontSize} name="inline-layout" value="2xl" >2xl</Radio>
  <!-- disabled -->
</div>
