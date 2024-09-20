<script lang="ts">
  import { UsersDatabase } from "../supabaseClient";
  import { toasts, ToastContainer, FlatToast } from "svelte-toasts"; //imports toasts, toastContainer and flatToast to show toasts
  import { goto } from "$app/navigation";

  let email: string;
  let password: string;
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
  async function loginWIthEmail() {
    const emailElement = document.getElementById("email") as HTMLInputElement;
    const passwordElement = document.getElementById(
      "password"
    ) as HTMLInputElement;
    const email = emailElement.value;
    const password = passwordElement.value;
    if (email && password) {
    } else {
      console.log("Please fill in all fields");
    }
  }
  async function loginWithGoogle() {}
</script>

<svelte:head>
  <title>LOGIN</title>
</svelte:head>

<ToastContainer let:data>
  <FlatToast {data} />
</ToastContainer>

<center id="login-text">
  <h1>Login</h1>
</center>
<center id="normal">
  <div class="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mt-4">
    <center>
      <div class="oAuthLoginButtons">
        <button
          id="loginWithGoogleButton"
          class="btn btn-primary"
          on:click={loginWithGoogle}
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 488 512"
            id="google-icon"
            ><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
              d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
            /></svg
          ></button
        >
      </div>
      <form class="card-body" style="color: white">
        <label class="input input-bordered flex items-center gap-2">
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
        <label class="input input-bordered flex items-center gap-2">
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
          on:click={loginWIthEmail}>Login</button
        >
        <span><a href="/register">Register</a></span>
      </form>
    </center>
  </div>
</center>

<style>
  #login-text {
    margin-top: 30px;
  }
  h1 {
    font-size: 55px;
  }
  .oAuthLoginButtons {
    display: inline-flex;
    gap: 10px;
    margin-top: 10px;
  }
  #loginButton {
    font-size: 25px;
    margin-bottom: 10px;
  }
  #google-icon {
    width: 30px;
  }
</style>
