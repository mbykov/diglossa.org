<script>
    // import { page } from "$app/stores";
    // import _ from 'lodash'
    import { locale } from "$lib/shared.svelte";

    const log = console.log

    import { Radio, Helper } from 'svelte-5-ui-lib';

    let selectedLang = $state(locale.current);

    function setLang(ev) {
        if (!ev.target || !ev.target.value) return
        locale.current = ev.target.value
    }

</script>

<div class="flex gap-3 p-4" onchange={setLang}>
  <Radio bind:group={selectedLang} name="lang" value="en">en</Radio>
  <Radio bind:group={selectedLang} name="lang" value="ru">ru</Radio>
  <Radio bind:group={selectedLang} name="lang" value="de" disabled >de</Radio>
  <Radio bind:group={selectedLang} name="lang" value="fr" disabled >fr</Radio>
</div>
