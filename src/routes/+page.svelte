<script lang="ts">
  import Footer from "./components/footer.svelte";
  import Navbar from "./components/navbar.svelte";
  import "./page.css";
  import { onMount } from "svelte";
  import { UsersDatabase } from "./supabaseClient";
  import { loggedIn } from "./userStore";
  import { goto } from "$app/navigation";
  import {
    toasts,
    ToastContainer as ToastContainerAny,
    FlatToast as FlatToastAny,
  } from "svelte-toasts"; //imports toasts, toastContainer and flatToast to show toasts

  const showToast = (
    title: string,
    body: string,
    duration: number,
    type: string
  ) => {
    const toast = toasts.add({
      title: title,
      description: body,
      duration: duration,
      placement: "bottom-right",
      //@ts-ignore
      type: "info",
      theme: "dark",
      //@ts-ignore
      placement: "bottom-right",
      showProgress: true,
      //@ts-ignore
      type: type,
      //@ts-ignore
      theme: "dark",
      onClick: () => {},
      onRemove: () => {},
    });
  };
  const ToastContainer = ToastContainerAny as any;
  const FlatToast = FlatToastAny as any;

  async function getUserInfo(sessionCookie: string) {
    let user;

    const { data, error } = await UsersDatabase.from("Users").select(
      "Email, Membership, session_id"
    );
    if (data) {
      // console.log(data);
      for (let i = 0; i < data.length; i++) {
        if (data[i].session_id == sessionCookie) {
          // console.log(data[i]);
          user = data[i];
          return { data, error, user };
        }
      }
    } else {
      console.log(error);
    }
    return { data, error, user };
  }

  onMount(async () => {
    let sessionCookie = document.cookie.split(";")[0];
    if (sessionCookie.includes("Session_id")) {
      sessionCookie = sessionCookie.split("=")[1];
      // console.log(sessionCookie);
      try {
        const { data, error, user } = await getUserInfo(sessionCookie);
        if (data && user) {
          if (data.length > 0 && user.Email) {
            sessionStorage.setItem("Email", user.Email);
            sessionStorage.setItem("Membership", user.Membership);
            // console.log(user.Email);
            const response = await fetch("/api/cookie", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: user.Email,
              }),
            });

            const result = await response.json();
            // console.log(result);

            let sessionCookie = document.cookie.split(";")[0];
            sessionCookie = sessionCookie.split("=")[1];
            // console.log(sessionCookie);
            // await getUserInfo(sessionCookie);
            goto("/home");
          }
        }
      } catch (error) {
        if (
          error.message ==
          "TypeError: NetworkError when attempting to fetch resource."
        ) {
          showToast(
            "Error",
            "Please check your internet connection",
            3000,
            "error"
          );
        } else {
          console.error(error);
        }
      }
    }
  });
</script>

<svelte:component this={ToastContainer} let:data>
  <svelte:component this={FlatToast} {data} />
</svelte:component>

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
          <a
            class="btn btn-primary loginButton"
            href="/login"
            data-sveltekit-preload-data>Login</a
          >
          <a
            class="btn btn-primary registerButton"
            href="/register"
            data-sveltekit-preload-data>Register</a
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
</style>
