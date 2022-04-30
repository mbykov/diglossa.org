<script>
  import _ from 'lodash'
  import { onMount } from 'svelte'
  import jsonview from '@pgrabovets/json-view'

  import { anthrax } from "@mbykov/anthrax"

  onMount(async () => {
		// const res = await fetch(`/tutorial/api/album`);
		// photos = await res.json();
    const data = '{"name": "json-view","version": "1.0.0"}'
    const tree = jsonview.create(data)
    jsonview.render(tree, document.querySelector('#anthrax-results'))
    jsonview.expand(tree)

    // let anthrax = await import('/home/michael/greek/anthrax')



    // https://github.com/mbykov/anthrax
	});



</script>

<h1 class="text-xl px-4 text-pink-500">App?! ===</h1>
<p>A short introduction would have been nice here...</p>

<p id="anthrax-results" contenteditable="true" class="px-8">editable</p>


<!-- <a href="/guide">guide</a> -->
