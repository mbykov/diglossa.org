<script>
	// import { goto } from "$app/navigation"
    import { page } from "$app/stores";
    import _ from 'lodash'
    import { locale } from "$lib/shared.svelte";

    const log = console.log

    import { Radio, Helper } from 'svelte-5-ui-lib';
    let selectedLang = $state("en");

    $effect(()=> {
        // saveLocale(selectedLang)
        log('_selectedLang', selectedLang)
        locale.current = selectedLang
    })

    function saveLocale(selectedLang) {
        // log('_saving', newLanguage)
        // log('_after_saveLocale', locale.current)
        // log('_selectedLang', selectedLang)
        // locale.current = selectedLang
    }


</script>

<div class="flex gap-3 p-4">
  <Radio bind:group={selectedLang} name="lang" value="en">en</Radio>
  <Radio bind:group={selectedLang} name="lang" value="ru">ru</Radio>
  <Radio bind:group={selectedLang} name="lang" value="de" disabled >de</Radio>
  <Radio bind:group={selectedLang} name="lang" value="fr" disabled >fr</Radio>
  <!-- disabled -->
</div>
