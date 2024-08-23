<script>
  import { goto } from "$app/navigation";
  import "./page.css";

  function login() {
    goto("/login");
  }
</script>

<svelte:head>
  <title>CNotes</title>
</svelte:head>

<div class="hero-section">
  <center>
    <div class="header">
      <h1>CNotes</h1>
    </div>
  </center>
  <div class="content">
    <p>Your notes, beautifully organized.</p>
    <p>
      CNotes is a simple note-taking app that allows you to <br />create, edit,
      and delete notes.
    </p>
  </div>
  <div class="call-to-action mt-10">
    <center>
      <button class="btn" on:click={login}>Login</button>
    </center>
  </div>
</div>

<style>
  .header h1 {
    font-family: "Pacifico", cursive;
    font-size: 3em;
    color: #ffffff;
    margin: 0;
  }
  .content {
    text-align: center;
  }
  .content p {
    font-size: 1.3em;
    color: #dff5ff;
    margin-top: 10px;
  }
</style>
