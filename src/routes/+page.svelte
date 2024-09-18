<script>
  import Footer from "./components/footer.svelte";
  import Navbar from "./components/navbar.svelte";
  import "./page.css";
</script>

<svelte:head>
  <title>CNotes</title>
</svelte:head>

<div class="main">
  <Navbar />
  <div class="hero min-h-screen">
    <div class="hero-content flex-col lg:flex-row-reverse">
      <div id="home">
        <h8 id="grade-app" class="text-5xl font-bold title text-white"
          >Cnotes</h8
        >
        <p class="py-6 text-white" id="homep">
          Your personal notes, organized and accessible anywhere. Start your
          journey now by logging in or creating an account.
        </p>
        <div class="buttons">
          <a class="btn btn-primary loginButton" href="/login">Login</a>
          <a class="btn btn-primary registerButton" href="/register">Register</a
          >
        </div>
      </div>
    </div>
  </div>
  <hr />
  <Footer />
</div>

<style>
  p {
    font-size: 1.3em;
  }
  .title {
    font-size: 4rem;
    font-weight: 700;
    margin-bottom: 20px;
  }
  .buttons {
    display: flex;
    justify-content: center;
    gap: 20px;
  }
  .btn {
    font-size: 1.2rem;
    padding: 10px 20px;
    border: 2px solid white;
    background-color: transparent;
    color: white;
    cursor: pointer;
    transition: 0.3s ease;
  }
  .btn:hover {
    background-color: white;
    color: black;
  }
</style>
