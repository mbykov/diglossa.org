<script>
  import NavBar from '../components/Navbar/Bar.svelte'

  import Lang from '../components/Lang.svelte'
</script>

<div id="app" class="flex h-screen w-screen_ mt-4_">
  <aside class="w-64 h-screen m-4">
    <div><Lang /></div>
    <NavBar />
  </aside>

  <section class="flex-grow_  ">
    <header />
    <main class="container px-1_ h-screen_">
      <slot />
    </main>
    <footer />
  </section>

  <aside class="w-64">
    &nbsp;
  </aside>

</div>

<style>
  #app_ {
    display: grid;
    grid-template-columns: 196px auto 196px ;
    height: 100%;
    width: 100%;
    position: absolute;
  }
  main_ {
    padding-top: 24px;
    box-shadow: 0 0 32px rgba(0, 0, 0, 0.4);
  }
  aside_ {
    padding: 16px;
    /* box-shadow: 0 0 32px rgba(0, 0, 0, 0.4); */
    height: 100%;
  }

</style>
