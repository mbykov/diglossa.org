<script>
	// import { goto } from "$app/navigation"
    import { page } from "$app/stores";
    import _ from 'lodash'
    import { locale } from "$lib/shared.svelte";

    const log = console.log

    /**
     */
    function saveLocale(newLanguage) {
        // log('_saving', newLanguage)
        locale.current = newLanguage
        // log('_after_saveLocale', locale.current)
    }

    /**
     */
    const labels = {
        en: "🇬🇧 English",
        de: "🇩🇪 Deutsch",
        fr: "🇫🇷 French",
        ru: "🇷🇺 Russian"
    }
</script>

            <!-- selected={languageTag() === langTag} -->
<select on:change={e => saveLocale(/** @type {any} */ (e).target.value)}>
    {#each _.keys(labels) as langTag}
        <option
            value={langTag}
            >{labels[langTag]}</option>
    {/each}
</select>
