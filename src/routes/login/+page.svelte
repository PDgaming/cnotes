<script lang="ts">
  import "./styles.css";

  function login() {
    const emailElement = document.getElementById("email") as HTMLInputElement;
    const passwordElement = document.getElementById(
      "password"
    ) as HTMLInputElement;
    const email = emailElement.value;
    const password = passwordElement.value;
    if (email && password) {
      console.log(email, password);
    } else {
      console.log("Please fill in all fields");
    }
  }
  function googleLogin() {}
</script>

<svelte:head>
  <title>LOGIN</title>
</svelte:head>

<div class="card container w-full max-w-sm shrink-0 shadow-2xl">
  <div class="header">
    <h1>LOGIN</h1>
  </div>
  <form class="card-body">
    <div class="form-control">
      <label class="label">
        <span class="label-text">Email</span>
      </label>
      <input
        type="email"
        placeholder="Email"
        class="input input-bordered"
        id="email"
        required
      />
    </div>
    <div class="form-control">
      <label class="label">
        <span class="label-text">Password</span>
      </label>
      <input
        type="password"
        placeholder="Password"
        class="input input-bordered"
        id="password"
        required
      />
    </div>
    <div class="form-control mt-6">
      <button class="btn btn-primary" on:click={login}>Login</button>
    </div>
  </form>
  <div class="divider">
    <span>or</span>
  </div>
  <button class="btn google-btn" on:click={googleLogin}
    >Login with Google</button
  >
</div>

<style>
  .container {
    text-align: center;
    background: rgba(255, 255, 255, 0.9);
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    z-index: 2;
  }

  .header h1 {
    font-size: 2em;
    color: #28a745;
    margin: 0;
  }
  .btn {
    background-color: #28a745;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;
    width: 100%;
    margin-top: 10px;
  }

  .google-btn {
    background-color: #db4437;
    margin-top: 10px;
  }

  .btn:hover {
    opacity: 0.9;
  }

  .divider {
    display: flex;
    align-items: center;
    text-align: center;
    margin: 20px 0;
    width: 100%;
  }

  .divider::before,
  .divider::after {
    content: "";
    flex: 1;
    border-bottom: 1px solid #ccc;
  }

  .divider::before {
    margin-right: 0.25em;
  }

  .divider::after {
    margin-left: 0.25em;
  }
</style>
