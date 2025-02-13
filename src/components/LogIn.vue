<template>
  <div>
    <div class="login">
      <h1>Login</h1>

      <input type="text" v-model="form.email" placeholder="Enter Email">
      <p class="msg-error" v-if="errors.email">{{ errors.email }}</p>

      <input type="password" v-model="form.password" placeholder="Enter Password">
      <p class="msg-error" v-if="errors.password">{{ errors.password }}</p>

      <button style="margin-top:50px;" @click="Login">Login</button>
      
      <p class="btn-login">
        <RouterLink to="/signup">Sign Up</RouterLink>
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";

export default {
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      errors: {}
    };
  },
  methods: {
    async Login() {
      this.errors = {}; // Reset errors

      // Validate inputs
      if (!this.form.email) {
        this.errors.email = "Email is required!";
      } else if (!this.validateEmail(this.form.email)) {
        this.errors.email = "Invalid email format!";
      }

      if (!this.form.password) {
        this.errors.password = "Password is required!";
      }

      if (Object.keys(this.errors).length > 0) return; // Stop if there are validation errors

      try {
        let response = await axios.get("http://localhost:3000/users");
        if (response.status === 200) {
          let users = response.data;
          let user = users.find(u => u.email === this.form.email && u.password === this.form.password);

          if (user) {
            localStorage.setItem("userLogin", JSON.stringify(user));

            Swal.fire({
              title: "Success!",
              text: "Login successful!",
              icon: "success",
              timer: 2000,
              showConfirmButton: false
            });

            setTimeout(() => {
              this.$router.push({ name: "Home" }); // Redirect to home page
            }, 2000);
          } else {
            Swal.fire({
              title: "Error!",
              text: "Invalid email or password!",
              icon: "error",
              timer: 2000,
              showConfirmButton: false
            });
          }
        }
      } catch (error) {
        Swal.fire({
          title: "Oops!",
          text: "Something went wrong. Please try again later.",
          icon: "error",
          timer: 2000,
          showConfirmButton: false
        });
        console.error("Login error:", error);
      }
    },
    validateEmail(email) {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailPattern.test(email);
    }
  }
};
</script>

<style scoped>
.login {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
}

input {
  display: block;
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
}

button {
  width: 100%;
  padding: 10px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.btn-login {
  margin-top: 15px;
}

.msg-error {
  color: red;
  font-size: 14px;
  text-align: left;
  margin-bottom: 10px;
}
</style>
