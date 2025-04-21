<template>
  <div id="app">
    <header>
      <!-- New Button in Top-Left Corner -->
      <button class="top-left-button" @click="redirectToSomePage">DSA Guru!</button>

      <div class="auth-buttons">
        <!-- Make the username clickable -->
        <router-link v-if="loggedInUser" :to="'/profile'" class="username">
          Welcome, {{ loggedInUser }}
        </router-link>
        <button v-if="loggedInUser" @click="logout">Logout</button>
        <button v-if="!loggedInUser" @click="showLogin = true">Login</button>
        <button v-if="!loggedInUser" @click="showSignup = true">Sign Up</button>
      </div>

      <!-- Streak Display -->
      <div v-if="loggedInUser" class="streak-display">
         STREAK: <span class="streak-count">{{ streak }} 🔥</span>
      </div>

      <!-- Login Modal -->
      <div v-if="showLogin" class="modal">
        <div class="modal-content">
          <span class="close" @click="showLogin = false">&times;</span>
          <h2>Login</h2>
          <input v-model="loginUsername" placeholder="Username" class="login-input" />
          <input v-model="loginPassword" type="password" placeholder="Password" class="login-input" />
          <button @click="login" class="enter">Login</button>
        </div>
      </div>

      <!-- Sign Up Modal -->
      <div v-if="showSignup" class="modal">
        <div class="modal-content">
          <span class="close" @click="showSignup = false">&times;</span>
          <h2>Sign Up</h2>
          <input v-model="signupUsername" placeholder="Username" class="login-input" />
          <input v-model="signupPassword" type="password" placeholder="Password" class="login-input" />
          <button @click="signup" class="enter">Sign Up</button>
        </div>
      </div>
    </header>

    <!-- Dynamic Route Content -->
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      showLogin: false,
      showSignup: false,
      loginUsername: '',
      loginPassword: '',
      signupUsername: '',
      signupPassword: '',
      loggedInUser: '', // Track logged-in user
      streak: 0, // Track streak count
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
           username: this.loginUsername,
          password: this.loginPassword,
        });

        this.loggedInUser = response.data.username;
        this.streak = response.data.streak; // Update streak count
        this.$root.loggedInUser = response.data.username; // Store the username globally
        alert(response.data.message);
        this.showLogin = false;
        this.$router.push('/'); // Redirect to basics page
      } catch (err) {
        alert('Login failed: ' + err.response.data.message);
      }
    },
    async signup() {
      try {
        cconst response = await axios.post(`${import.meta.env.VITE_API_URL}/signup`, {
        username: this.signupUsername,
        password: this.signupPassword,
      });

        alert(response.data.message);
        this.showSignup = false;
      } catch (err) {
        alert('Signup failed: ' + err.response?.data?.message || err.message);
      }
    },
    logout() {
      this.loggedInUser = '';
      this.streak = 0; // Reset streak count
      this.$root.loggedInUser = ''; // Clear the global username
      this.$router.push('/'); // Redirect to home page after logout
    },
    redirectToSomePage() {
      this.$router.push('/somepage'); // Redirect to the desired page
    },
  },
};
</script>


<style>
#app {
  font-family: Arial, sans-serif;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

header {
  text-align: center;
  margin-bottom: 20px;
}

header h1 {
  font-size: 2.5em;
  color: #333;
}

.auth-buttons {
  position: absolute;
  top: 20px;
  right: 20px;
}

.auth-buttons button {
  margin-left: 10px;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  text-align: center;
}

.close {
  float: right;
  cursor: pointer;
}

.username {
  margin-right: 10px;
  font-weight: bold;
  color: #4CAF50;
  cursor: pointer; /* Make it look clickable */
  text-decoration: none; /* Remove underline */
}

.username:hover {
  text-decoration: underline; /* Add underline on hover */
}

button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
}

.enter {
  padding: 10px 20px;
  margin-left: 30px;
  margin-top: 10px;
}

.login-input {
  margin-bottom: 15px;
  width: 95%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.top-left-button {
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
}

.streak-display {
  margin-top: 10px;
  font-size: 1.2em;
  color: #ff0000; /* Red font */
}

.streak-count {
  font-weight: bold;
}
</style>