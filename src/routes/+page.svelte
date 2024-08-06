<script>
  import "./styles.css";
</script>

<svelte:head>
  <title>CNotes</title>
</svelte:head>

<div class="hero-section">
  <div class="star" style="top: 10%; left: 20%;"></div>
  <div class="star" style="top: 30%; left: 80%;"></div>
  <div class="star" style="top: 70%; left: 60%;"></div>
  <div class="star" style="top: 90%; left: 10%;"></div>
  <div class="header">
    <h1>CNotes</h1>
  </div>
  <div class="content">
    <p>Your notes, beautifully organized.</p>
  </div>
</div>

<style>
  .header h1 {
    font-family: "Pacifico", cursive;
    font-size: 3em;
    color: #003c58;
    margin: 0;
  }

  .content p {
    font-size: 1.2em;
    color: #003c58;
    margin-top: 10px;
  }

  .star {
    position: absolute;
    width: 50px;
    height: 50px;
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23ffffff"><path d="M12 17.27l5.18 3.73-1.64-7.03L21 9.24l-7.19-.61L12 2 10.19 8.63 3 9.24l5.46 4.73L6.82 21z"/></svg>')
      no-repeat center center;
    background-size: contain;
    opacity: 0.7;
    animation: float 10s ease-in-out infinite;
  }

  @keyframes float {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-20px);
    }
    100% {
      transform: translateY(0);
    }
  }

  .star:nth-child(1) {
    top: 10%;
    left: 20%;
    animation-delay: 0s;
  }
  .star:nth-child(2) {
    top: 30%;
    left: 80%;
    animation-delay: 2s;
  }
  .star:nth-child(3) {
    top: 50%;
    left: 40%;
    animation-delay: 4s;
  }
  .star:nth-child(4) {
    top: 70%;
    left: 60%;
    animation-delay: 6s;
  }
  .star:nth-child(5) {
    top: 90%;
    left: 10%;
    animation-delay: 8s;
  }
</style>
