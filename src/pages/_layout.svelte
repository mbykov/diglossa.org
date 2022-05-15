<script>
  import NavBar from '../components/Navbar/Bar.svelte'

  import Lang from '../components/Lang.svelte'
</script>

<div id="app">
  <aside>
    <div><Lang /></div>
    <NavBar />
  </aside>
  <section>
    <header />
    <main class="container px-1">
      <slot />
    </main>
    <footer />
  </section>
</div>

<style>
  #app {
    display: grid;
    grid-template-columns: 196px auto 196px ;
    height: 100%;
    width: 100%;
    position: absolute;
  }
  main {
    padding-top: 24px;
  }
  aside {
    padding: 16px;
    box-shadow: 0 0 32px rgba(0, 0, 0, 0.4);
    height: 100%;
  }

</style>
