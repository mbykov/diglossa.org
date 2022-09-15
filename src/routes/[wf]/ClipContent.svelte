<script>

  export let clipkey
  $: console.log('_component CLIP-KEY', clipkey)

  let exkey = false
  function showExamples() {
      exkey = true
  }

</script>



<h1>Anthrax v. 2.0</h1>

<p>Copy any greek text (utf-8) anywhere and paste it here with Ctrl-v</p>
<p>Or try <span class="examples clickable" on:click={showExamples}>examples</span> section</p>
<p> </p>
<p> </p>
<p> </p>
<p> </p>

{#key exkey}
{#if (exkey)}
  <p>
    <span class="wf">ἁγνότης</span>
    <span class="wf">ἀγαπητός</span>
    <span class="wf">ἀγαθοποιέω</span>; <span class="wf">βαρύτονος</span>; <span class="wf">παραγράφω</span>; <span class="wf">ἀντιπαραγράφω</span>; <span class="wf">διαγγέλλω</span>; <span class="wf">συγκαθαιρέω</span>; <span class="wf">ἀποδείκνυμι</span>; <span class="wf">χρονοκρατέω</span>; <span class="wf">προσαπαγγέλλω</span>; <span class="wf">ἐπεξήγησις</span>;
 </p>
{/if}
{/key}
