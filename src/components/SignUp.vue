<template>
  <div class="register-container">
    <div class="register">
      <h1>Sign Up</h1>

      <input type="text" placeholder="Enter Name" v-model="form.name">
      <p class="msg-error" v-if="errors.name">{{ errors.name }}</p>

      <input type="email" placeholder="Enter Email" v-model="form.email">
      <p class="msg-error" v-if="errors.email">{{ errors.email }}</p>

      <input type="password" placeholder="Enter Password" v-model="form.password">
      <p class="msg-error" v-if="errors.password">{{ errors.password }}</p>

      <button @click="SignUp">Sign Up</button>
      <p class="redirect-text">
        Already have an account? <RouterLink to="/login">Login</RouterLink>
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
      },
      errors: {}
    };
  },
  methods: {
    async SignUp() {
      if (this.validateUser()) {
        let userItem = {
          name: this.form.name,
          email: this.form.email,
          password: this.form.password
        };

        try {
          let result = await axios.post("http://localhost:3000/users", userItem);
          if (result.status === 201) {
            Swal.fire({
              title: "Success!",
              text: "Account created successfully!",
              icon: "success",
              timer: 2000,
            });

            setTimeout(() => {
              this.$router.push({ name: 'Home' });
            }, 2000);
          }
        } catch (error) {
          console.error("Error inserting data:", error);
        }
      }
    },

    validateUser() {
      const errors = {};
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (!this.form.name) {
        errors.name = "Name is required!";
      }
      if (!this.form.email) {
        errors.email = "Email is required!";
      } else if (!emailPattern.test(this.form.email)) {
        errors.email = "Invalid email format!";
      }
      if (!this.form.password) {
        errors.password = "Password is required!";
      }

      this.errors = errors;
      return Object.keys(errors).length === 0;
    }
  }
};
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.register {
  max-width: 400px;
  width: 100%;
  padding: 30px;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  background: #fff;
}

h1 {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
}

.msg-error {
  color: red;
  font-size: 14px;
  text-align: left;
  margin-top: -5px;
}

button {
  width: 100%;
  padding: 12px;
  border: none;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 15px;
}

button:hover {
  background-color: #0056b3;
}

.redirect-text {
  margin-top: 15px;
  font-size: 14px;
}

.redirect-text a {
  color: #007bff;
  text-decoration: none;
}

.redirect-text a:hover {
  text-decoration: underline;
}
</style>
