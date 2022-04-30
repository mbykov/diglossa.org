<script>
  import { Router } from '@roxi/routify'
  import { routes } from '../.routify/routes'

  const config = {
    urlTransform: urlTransform,
  }
  import { urlTransform } from './components/Lang.svelte'
</script>

<Router {routes} {config} />

<style global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
