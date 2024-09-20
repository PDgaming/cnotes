<script>
  // import Particles from "./Particles.svelte";
  import { onMount } from "svelte";
  import "./login.css";

  // Login functionality (placeholder for now)
  const handleGoogleLogin = () => {
    alert("Google login clicked");
  };

  const handleEmailLogin = () => {
    alert("Email login clicked");
  };

  // let canvas;
  // let ctx;
  // let particlesArray = [];
  // const numberOfParticles = 100;

  // function createParticles() {
  //   particlesArray = [];
  //   for (let i = 0; i < numberOfParticles; i++) {
  //     particlesArray.push({
  //       x: Math.random() * canvas.width,
  //       y: Math.random() * canvas.height,
  //       size: Math.random() * 3,
  //       speedX: Math.random() * 1 - 0.5,
  //       speedY: Math.random() * 1 - 0.5,
  //     });
  //   }
  // }

  // function animateParticles() {
  //   ctx.clearRect(0, 0, canvas.width, canvas.height);
  //   particlesArray.forEach((particle) => {
  //     particle.x += particle.speedX;
  //     particle.y += particle.speedY;

  //     if (particle.x > canvas.width || particle.x < 0) {
  //       particle.speedX = -particle.speedX;
  //     }
  //     if (particle.y > canvas.height || particle.y < 0) {
  //       particle.speedY = -particle.speedY;
  //     }

  //     ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
  //     ctx.beginPath();
  //     ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
  //     ctx.fill();
  //   });
  // }

  // onMount(() => {
  //   canvas = document.getElementById("particles");
  //   ctx = canvas.getContext("2d");
  //   canvas.width = window.innerWidth;
  //   canvas.height = window.innerHeight;

  //   createParticles();
  //   setInterval(animateParticles, 30);
  // });

  // window.onresize = () => {
  //   canvas.width = window.innerWidth;
  //   canvas.height = window.innerHeight;
  //   createParticles();
  // };
</script>

<div class="login-container">
  <h1>Login, your notes are missing you</h1>
  <div class="buttons">
    <button on:click={handleGoogleLogin}>Login with Google</button>
    <button on:click={handleEmailLogin}>Login with Email</button>
  </div>
</div>

<!-- <Particles /> -->

<!-- <canvas id="particles" class="particles-background"></canvas> -->

<style>
  .login-container {
    text-align: center;
    z-index: 10;
    position: relative;
  }

  h1 {
    font-size: 2.5rem;
    margin-bottom: 20px;
  }

  button {
    background-color: #333;
    border: none;
    color: white;
    padding: 12px 24px;
    margin: 10px 0;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
    border-radius: 5px;
  }

  button:hover {
    background-color: #555;
  }

  .buttons {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 300px;
    margin: 0 auto;
  }
  .particles-background {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    background: black;
  }
</style>
