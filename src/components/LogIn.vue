<template>
  <div class="login-container">
    <div class="login-box">
      <h1>🌸 Login 🌸</h1>

      <div class="input-group">
        <input type="text" v-model="form.email" placeholder="Enter Email">
        <p class="msg-error" v-if="errors.email">⚠️ {{ errors.email }}</p>
      </div>

      <div class="input-group">
        <input type="password" v-model="form.password" placeholder="Enter Password">
        <p class="msg-error" v-if="errors.password">⚠️ {{ errors.password }}</p>
      </div>

      <button @click="Login">💖 Login</button>
      
      <p class="btn-login">
        Don't have an account?  
        <RouterLink to="/signup">✨ Sign Up ✨</RouterLink>
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      form: { email: "", password: "" },
      errors: {}
    };
  },
  methods: {
    ...mapActions(["login"]),
    
    async Login() {
      this.errors = {};
      
      if (!this.form.email) this.errors.email = "Email is required!";
      else if (!this.validateEmail(this.form.email)) this.errors.email = "Invalid email format!";
      if (!this.form.password) this.errors.password = "Password is required!";
      if (Object.keys(this.errors).length > 0) return;

      let result = await this.login(this.form);

      if (result.success) {
        Swal.fire({
          title: "Yay! 🎉",
          text: "Login successful!",
          icon: "success",
          timer: 2000,
          showConfirmButton: false
        });

        setTimeout(() => this.$router.push({ name: "Home" }), 2000);
      } else {
        Swal.fire({
          title: "Oops! 😢",
          text: result.message,
          icon: "error",
          timer: 2000,
          showConfirmButton: false
        });
      }
    },
    validateEmail(email) {
      return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    }
  }
};
</script>


<style scoped>
/* 🎀 Beautiful Background */
.login-container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%);
}

/* 🌸 Cute Login Box */
.login-box {
  width: 350px;
  padding: 30px;
  text-align: center;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  box-shadow: 0 10px 20px rgba(255, 105, 180, 0.3);
  font-family: 'Poppins', sans-serif;
  animation: fadeIn 0.8s ease-in-out;
}

/* 🌷 Title */
h1 {
  font-size: 24px;
  color: #ff69b4;
  margin-bottom: 20px;
  font-weight: bold;
}

/* 🎀 Input Fields */
.input-group {
  margin-bottom: 15px;
}

input {
  width: 100%;
  padding: 12px;
  border: 2px solid #ffb6c1;
  border-radius: 10px;
  font-size: 16px;
  background: #fff;
  color: #333;
  outline: none;
  transition: 0.3s;
}

input:focus {
  border-color: #ff69b4;
  background: #fff0f5;
  box-shadow: 0 0 10px rgba(255, 105, 180, 0.5);
}

/* ⚠️ Error Messages */
.msg-error {
  color: #ff3366;
  font-size: 14px;
  text-align: left;
  margin-top: 5px;
}

/* 💖 Login Button */
button {
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #ff69b4, #ff1493);
  border: none;
  color: white;
  font-size: 18px;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s;
  font-weight: bold;
  box-shadow: 0 5px 10px rgba(255, 105, 180, 0.4);
}

button:hover {
  background: linear-gradient(135deg, #ff1493, #ff69b4);
  transform: scale(1.05);
}

/* ✨ Sign Up Link */
.btn-login {
  margin-top: 15px;
  font-size: 14px;
}

.btn-login a {
  text-decoration: none;
  font-weight: bold;
  color: #ff69b4;
  transition: 0.3s;
}

.btn-login a:hover {
  color: #ff1493;
  text-shadow: 0 0 5px rgba(255, 105, 180, 0.5);
}

/* ✨ Smooth Fade In */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
