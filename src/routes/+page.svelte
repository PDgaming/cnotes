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
  <div class="features" id="features">
    <div class="feature">
      <h3>Easy to use</h3>
      <p>
        Create, organize, and access your notes with ease. Our intuitive
        interface makes note-taking a breeze.
      </p>
    </div>
    <div class="feature">
      <h3>Cloud Storage</h3>
      <p>
        Access your notes from anywhere, on any device. Your notes are securely
        stored in the cloud and always available offline.
      </p>
    </div>
    <div class="feature">
      <h3>Note Sharing</h3>
      <p>
        Easily share notes with others. Collaborate and share ideas seamlessly
        among team members.
      </p>
    </div>
  </div>
  <hr />
  <div class="questions" id="questions">
    <h2>Got Questions?</h2>
    <div class="question-items">
      <div class="question-item">
        <h3>What is CNotes?</h3>
        <p>
          CNotes is a note-taking application that allows you to create,
          organize, and access your notes from anywhere.
        </p>
      </div>
      <div class="question-item">
        <h3>Is my data safe on CNotes?</h3>
        <p>
          Yes, your data is securely stored in the cloud and encrypted to ensure
          your notes are safe and private.
        </p>
      </div>
      <div class="question-item">
        <h3>How do I share notes?</h3>
        <p>
          You can share notes by clicking the share button and sending the link
          to your collaborators.
        </p>
      </div>
    </div>
  </div>
  <hr />
  <div class="contact" id="contact">
    <h2>Contact us!</h2>
    <p>
      Have questions, need assistance, or want to share feedback? We'd love to
      hear from you! Reach out anytime.
    </p>
    <a href="https://pd-enterprises.pages.dev/contact-us" class="nav-button"
      >Contact us</a
    >
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
  .hero {
    text-align: center;
    padding: 50px 20px;
    background: linear-gradient(135deg, #3a3a5f, #5a5a8f);
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
  }

  .hero p {
    font-size: 16px;
    margin: 20px 0;
    font-family: "Poppins", sans-serif;
  }

  .hero button:hover {
    background-color: #666;
  }

  .features {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    padding: 50px 20px;
    background-color: rgba(46, 46, 79, 0.9);
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
  }

  .feature {
    text-align: center;
    max-width: 300px;
    flex: 1 1 300px;
  }

  .feature h3 {
    font-size: 20px;
    margin-bottom: 10px;
    font-family: "Poppins", sans-serif;
    font-weight: 700;
  }

  .feature p {
    font-size: 14px;
    font-family: "Poppins", sans-serif;
  }

  .questions {
    padding: 50px 20px;
    background-color: rgba(30, 30, 47, 0.9);
    text-align: center;
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
  }

  .questions h2 {
    font-size: 28px;
    margin-bottom: 20px;
    font-family: "Poppins", sans-serif;
    font-weight: 700;
  }

  .question-items {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
  }

  .question-item {
    max-width: 300px;
    background-color: rgba(58, 58, 95, 0.9);
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    flex: 1 1 300px;
  }

  .question-item h3 {
    font-size: 18px;
    margin-bottom: 10px;
    font-family: "Poppins", sans-serif;
    font-weight: 700;
  }

  .question-item p {
    font-size: 14px;
    font-family: "Poppins", sans-serif;
  }

  .contact {
    padding: 50px 20px;
    background-color: rgba(46, 46, 79, 0.9);
    text-align: center;
    box-shadow: inset 0 0 10px rgba(236, 234, 234, 0.5);
  }

  .contact h2 {
    font-size: 24px;
    margin-bottom: 20px;
    font-family: "Poppins", sans-serif;
    font-weight: 700;
  }

  .contact button {
    background-color: #444;
    color: white;
    border: none;
    padding: 15px 30px;
    cursor: pointer;
    margin: 10px;
    border-radius: 5px;
    transition: background-color 0.3s ease;
    font-family: "Poppins", sans-serif;
  }

  .contact button:hover {
    background-color: #666;
  }

  /* Media Queries */
  @media (max-width: 768px) {
    .hero h2 {
      font-size: 28px;
    }

    .hero p {
      font-size: 14px;
    }

    .hero button {
      padding: 10px 20px;
    }
  }
</style>
