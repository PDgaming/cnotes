<script>
  import "./styles.css";
</script>

<svelte:head>
  <title>SEE UR NOTES AND BE SMART, LOGIN</title>
</svelte:head>

<div class="container">
  <div class="header">
    <h1>LOGIN</h1>
  </div>
  <div class="login-form">
    <form action="#">
      <div class="input-group">
        <label for="email">Email</label>
        <input type="email" id="email" name="email" required />
      </div>
      <div class="input-group">
        <label for="password">Password</label>
        <input type="password" id="password" name="password" required />
      </div>
      <button type="submit" class="btn">Login</button>
    </form>
    <div class="divider">
      <span>or</span>
    </div>
    <button class="btn google-btn">Login with Google</button>
  </div>
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
  .login-form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .input-group {
    margin-bottom: 15px;
    width: 100%;
  }

  .input-group label {
    display: block;
    font-size: 0.9em;
    color: #555;
    margin-bottom: 5px;
  }

  .input-group input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1em;
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
