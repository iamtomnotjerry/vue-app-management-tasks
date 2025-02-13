<template>
  <div class="update-profile">
    <h1>Update Profile</h1>

    <input type="text" v-model="form.name" placeholder="Enter Name">
    <p class="msg-error" v-if="errors.name">{{ errors.name }}</p>

    <input type="email" v-model="form.email" placeholder="Enter Email">
    <p class="msg-error" v-if="errors.email">{{ errors.email }}</p>

    <input type="password" v-model="form.password" placeholder="Enter New Password">
    <p class="msg-error" v-if="errors.password">{{ errors.password }}</p>

    <button @click="updateProfile">Update</button>
    <button class="list-post">
      <router-link to="/">Go To List Tasks</router-link>
    </button>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      form: {
        id: null,
        name: '',
        email: '',
        password: '',
      },
      errors: {}
    };
  },
  mounted() {
    let userLogin = localStorage.getItem("userLogin");
    if (userLogin) {
      try {
        let user = JSON.parse(userLogin);
        this.form.id = user.id; // Lấy ID user
        this.form.name = user.name;
        this.form.email = user.email;
      } catch (error) {
        console.error("Error parsing userLogin:", error);
      }
    }
  },
  methods: {
    async updateProfile() {
      this.errors = {}; // Reset errors

      // Kiểm tra dữ liệu đầu vào
      if (!this.form.name) {
        this.errors.name = "Name is required!";
      }
      if (!this.form.email) {
        this.errors.email = "Email is required!";
      } else if (!this.validateEmail(this.form.email)) {
        this.errors.email = "Invalid email format!";
      }
      if (!this.form.password) {
        this.errors.password = "Password is required!";
      }

      if (Object.keys(this.errors).length > 0) return; // Dừng nếu có lỗi

      try {
        let response = await axios.patch(`http://localhost:3000/users/${this.form.id}`, {
          name: this.form.name,
          email: this.form.email,
          password: this.form.password
        });

        if (response.status === 200) {
          let updatedUser = response.data;
          localStorage.setItem("userLogin", JSON.stringify(updatedUser)); // Cập nhật localStorage

          Swal.fire({
            title: "Success!",
            text: "Profile updated successfully!",
            icon: "success",
            timer: 2000,
            showConfirmButton: false
          });

          setTimeout(() => {
            this.$router.push({ name: "Home" }); // Chuyển hướng về trang chính
          }, 2000);
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Failed to update profile. Try again later.",
          icon: "error",
          timer: 2000,
          showConfirmButton: false
        });
        console.error("Update error:", error);
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
.update-profile {
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

.list-post {
  margin-top: 15px;
}

.msg-error {
  color: red;
  font-size: 14px;
  text-align: left;
  margin-bottom: 10px;
}
</style>
