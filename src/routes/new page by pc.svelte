<script>
  import { onMount } from 'svelte';

  onMount(() => {
    const particleContainer = document.getElementById('particle-container');
    const numParticles = 10; // Number of particles
    for (let i = 0; i < numParticles; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      particleContainer.appendChild(particle);
    }
  });
</script>

<style>
  /* General Reset */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Poppins', sans-serif;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: black;
    overflow: hidden;
  }

  .container {
    position: relative;
    z-index: 2;
    text-align: center;
    color: white;
  }

  .title {
    font-size: 4rem;
    font-weight: 700;
    margin-bottom: 20px;
    letter-spacing: 5px;
  }

  .description {
    font-size: 1.5rem;
    margin-bottom: 40px;
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

  /* Particle Animation */
  #particle-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    pointer-events: none;
    z-index: 1;
  }

  .particle {
    position: absolute;
    display: block;
    width: 10px;
    height: 10px;
    background-color: white;
    border-radius: 50%;
    opacity: 0.5;
    animation: float 10s infinite;
  }

  .particle:nth-child(1) {
    left: 5%;
    animation-duration: 12s;
    animation-delay: 0s;
  }

  .particle:nth-child(2) {
    left: 20%;
    animation-duration: 8s;
    animation-delay: 2s;
  }

  .particle:nth-child(3) {
    left: 40%;
    animation-duration: 10s;
    animation-delay: 4s;
  }

  .particle:nth-child(4) {
    left: 60%;
    animation-duration: 14s;
    animation-delay: 0s;
  }

  .particle:nth-child(5) {
    left: 80%;
    animation-duration: 9s;
    animation-delay: 3s;
  }

  .particle:nth-child(6) {
    left: 90%;
    animation-duration: 11s;
    animation-delay: 5s;
  }

  .particle:nth-child(7) {
    left: 50%;
    animation-duration: 13s;
    animation-delay: 2s;
  }

  .particle:nth-child(8) {
    left: 70%;
    animation-duration: 10s;
    animation-delay: 1s;
  }

  .particle:nth-child(9) {
    left: 30%;
    animation-duration: 15s;
    animation-delay: 4s;
  }

  .particle:nth-child(10) {
    left: 10%;
    animation-duration: 7s;
    animation-delay: 0s;
  }

  @keyframes float {
    0% {
      transform: translateY(100vh);
      opacity: 0;
    }
    50% {
      opacity: 0.7;
    }
    100% {
      transform: translateY(-100vh);
      opacity: 0;
    }
  }
</style>

<div class="container">
  <h1 class="title">Cnotes</h1>
  <p class="description">Your personal notes, organized and accessible anywhere. Start your journey now by logging in or creating an account.</p>
  <div class="buttons">
    <button class="btn">Login</button>
    <button class="btn">Register</button>
  </div>
</div>

<div id="particle-container"></div>
