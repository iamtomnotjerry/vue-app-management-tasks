<template>
  <div>
    <div class="register">
      <h1>Sign Up</h1>

      <input type="text" placeholder="Enter Name" v-model="form.name">
      <p class="msg-error" v-if="errors.name">{{ errors.name }}</p>

      <input type="text" placeholder="Enter Email" v-model="form.email">
      <p class="msg-error" v-if="errors.email">{{ errors.email }}</p>

      <input type="password" placeholder="Enter Password" v-model="form.password">
      <p class="msg-error" v-if="errors.password">{{ errors.password }}</p>

      <button @click="SignUp">Sign Up</button>
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
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Email validation RegEx

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
.msg-error {
  color: red;
  font-size: 14px;
  margin-bottom: 10px;
}
</style>
