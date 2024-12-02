<script>
  import "../app.css";
  import "./styles.css";
  import { registerServiceWorker } from "../registerServiceWorker";

  registerServiceWorker();
</script>

<div class="app">
  <main>
    <slot />
  </main>
</div>

<style>
</style>
