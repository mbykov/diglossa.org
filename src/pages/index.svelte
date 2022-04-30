<script>
  import { onMount } from 'svelte'
  import jsonview from '@pgrabovets/json-view'

  onMount(async () => {
		// const res = await fetch(`/tutorial/api/album`);
		// photos = await res.json();
    const data = '{"name": "json-view","version": "1.0.0"}'
    const tree = jsonview.create(data)
    jsonview.render(tree, document.querySelector('#anthrax-results'))
    jsonview.expand(tree)
	});


</script>

<h1 class="text-xl class:mx-32 px-32 text-pink-500">App?! ===</h1>
<p>A short introduction would have been nice here...</p>

<p id="anthrax-results" contenteditable="true" class="px-8">editable</p>


<a href="/guide">guide</a>

<nav class="bg-blue-900 shadow-lg">
  <div class="container mx-auto">
    <div class="sm:flex">
      <a href="#" class="text-white text-3xl font-bold p-3">APP LOGO</a>

      <!-- Menus -->
      <div class="ml-55 mt-4">
        <ul class="text-white sm:self-center text-xl">
          <li class="sm:inline-block">
            <a href="#" class="p-3 hover:text-red-900 ">About</a>
          </li>
          <li class="sm:inline-block">
            <a href="#" class="p-3 hover:text-red-900">Services</a>
          </li>
          <li class="sm:inline-block">
            <a href="#" class="p-3 hover:text-red-900">Blog</a>
          </li>
          <li class="sm:inline-block">
            <a href="#" class="p-3 hover:text-red-900">Contact</a>
          </li>
        </ul>
      </div>

    </div>
  </div>
</nav>
