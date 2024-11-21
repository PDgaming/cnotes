<script lang="ts">
  import {
    toasts,
    ToastContainer as ToastContainerAny,
    FlatToast as FlatToastAny,
  } from "svelte-toasts"; //imports toasts, toastContainer and flatToast to show toasts
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { UsersDatabase } from "../supabaseClient";

  let email: string;
  let password: string;
  let name: string;

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
  onMount(async () => {
    const sessionCookie = decodeURIComponent(document.cookie);
    if (sessionCookie.includes("Session_id")) {
      try {
        const { data, error } = await UsersDatabase.from("Users")
          .select()
          .eq("session_id", sessionCookie.split("=")[1]);
        if (data) {
          sessionStorage.setItem("Email", data[0].Email);
          sessionStorage.setItem("Membership", data[0].Membership);
          goto("/home");
        } else {
          console.log(error);
        }
      } catch (error) {
        console.log(error);
      }
    }
  });
  function registerWithGoogle() {
    showToast(
      "We don't suppot Google Sign Up yet",
      "Please use the email and password method",
      2500,
      "warning"
    );
  }
  function registerWIthEmail() {
    if (email && password) {
      sessionStorage.setItem("Email", email);
      register(name, email, password);
    } else {
      //shows an error if email and password does not exist or is empty
      showToast(
        "Error",
        "Please enter both your email and password",
        2500,
        "error"
      );
    }
  }

  //function to check if user exits in database(for google login)
  async function register(name: string, email: string, password: string) {
    //tries to insert user into database to check if they exist
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name, email: email, password: password }),
      });
      const result = await response.json();
      console.log(result);
      if (result.status == 200) {
        //shows a toast if user exists, if user does not exists then it will add the user and continue to dashboard
        showToast("Success", "Registration Successfull!!", 2500, "success");
        setTimeout(() => {
          goto("/home");
        }, 2500); //waits for 2500ms(2.5s) before redirecting to dashboard
      } else {
        showToast("Error", "There was an error", 2500, "error");
      }
    } catch (error) {
      console.log(error); //shows error if there was an error inserting user into database
    }
  }
</script>

<svelte:head>
  <title>Grade App - Register</title>
</svelte:head>

<svelte:component this={ToastContainer} let:data>
  <svelte:component this={FlatToast} {data} />
</svelte:component>

<center id="login-text">
  <h1 class="text-6xl mb-10">Register</h1>
</center>
<center id="normal">
  <div class="card bg-base-200 w-full max-w-sm shrink-0 shadow-2xl mt-4">
    <center>
      <div class="oAuthLoginButtons">
        <button
          id="loginWithGoogleButton"
          class="btn btn-primary"
          on:click={registerWithGoogle}
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 488 512"
            id="google-icon"
          >
            <!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
            <path
              d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
            /></svg
          ></button
        >
      </div>
      <form class="card-body" style="color: white">
        <label class="input input-bordered flex items-center gap-2 mb-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            class="h-4 w-4 opacity-70"
          >
          </svg>
          <input
            type="text"
            class="grow"
            placeholder="Name"
            id="name"
            bind:value={name}
          />
        </label>
        <label class="input input-bordered flex items-center gap-2 mb-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            class="h-4 w-4 opacity-70"
          >
            <path
              d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"
            />
            <path
              d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"
            />
          </svg>
          <input
            type="text"
            class="grow"
            placeholder="Email"
            id="email"
            bind:value={email}
          />
        </label>
        <label class="input input-bordered flex items-center gap-2 mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            class="h-4 w-4 opacity-70"
          >
            <path
              fill-rule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clip-rule="evenodd"
            />
          </svg>
          <input
            type="password"
            class="grow"
            placeholder="Password"
            id="password"
            bind:value={password}
          />
        </label>
        <button
          id="loginButton"
          class="btn btn-primary"
          on:click={registerWIthEmail}>Register</button
        >
        <span><a href="/login">Login</a></span>
      </form>
    </center>
  </div>
</center>

<style>
  #login-text {
    margin-top: 30px;
  }
  .oAuthLoginButtons {
    display: inline-flex;
    gap: 10px;
  }
  #loginButton {
    font-size: 1.5em;
  }
  #google-icon {
    width: 30px;
  }
</style>
