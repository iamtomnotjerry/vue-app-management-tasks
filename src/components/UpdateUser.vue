<template>
  <div class="update-profile">
    <h1>🌸 Update Profile 🌸</h1>

    <div class="form-group">
      <label><i class="fas fa-user"></i> Name</label>
      <input type="text" v-model="form.name" placeholder="Enter Name">
      <p class="msg-error" v-if="errors.name">⚠️ {{ errors.name }}</p>
    </div>

    <div class="form-group">
      <label><i class="fas fa-envelope"></i> Email</label>
      <input type="email" v-model="form.email" placeholder="Enter Email">
      <p class="msg-error" v-if="errors.email">⚠️ {{ errors.email }}</p>
    </div>

    <div class="form-group">
      <label><i class="fas fa-lock"></i> New Password</label>
      <input type="password" v-model="form.password" placeholder="Enter New Password">
      <p class="msg-error" v-if="errors.password">⚠️ {{ errors.password }}</p>
    </div>

    <button @click="updateProfile" class="btn">💖 Update</button>
    
    <router-link to="/" class="btn-secondary">🏡 Go To List Tasks</router-link>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      form: { id: null, name: "", email: "", password: "" },
      errors: {}
    };
  },
  mounted() {
    let userLogin = localStorage.getItem("userLogin");
    if (userLogin) {
      try {
        let user = JSON.parse(userLogin);
        this.form.id = user.id;
        this.form.name = user.name;
        this.form.email = user.email;
      } catch (error) {
        console.error("Error parsing userLogin:", error);
      }
    }
  },
  methods: {
    async updateProfile() {
      this.errors = {};

      if (!this.form.name) this.errors.name = "Name is required!";
      if (!this.form.email) this.errors.email = "Email is required!";
      else if (!this.validateEmail(this.form.email)) this.errors.email = "Invalid email format!";
      if (!this.form.password) this.errors.password = "Password is required!";
      
      if (Object.keys(this.errors).length > 0) return;

      try {
        let response = await axios.patch(`http://localhost:3000/users/${this.form.id}`, {
          name: this.form.name,
          email: this.form.email,
          password: this.form.password
        });

        if (response.status === 200) {
          let updatedUser = response.data;
          localStorage.setItem("userLogin", JSON.stringify(updatedUser));

          Swal.fire({
            title: "Yay! 🎉",
            text: "Your profile has been updated!",
            icon: "success",
            timer: 2000,
            showConfirmButton: false
          });

          setTimeout(() => this.$router.push({ name: "Home" }), 2000);
        }
      } catch (error) {
        Swal.fire({
          title: "Oops! 😢",
          text: "Something went wrong. Try again later.",
          icon: "error",
          timer: 2000,
          showConfirmButton: false
        });
        console.error("Update error:", error);
      }
    },
    validateEmail(email) {
      return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    }
  }
};
</script>

<style scoped>
/* 🎀 Soft Pink Theme */
.update-profile {
  max-width: 400px;
  margin: 50px auto;
  padding: 25px;
  text-align: center;
  background: #ffe6f2; /* Soft pastel pink */
  color: #333;
  border-radius: 20px;
  box-shadow: 3px 3px 15px rgba(255, 182, 193, 0.5);
  font-family: 'Poppins', sans-serif;
  animation: fadeIn 0.6s ease-in-out;
}

h1 {
  font-size: 22px;
  color: #ff66b2; /* Cute pink title */
  margin-bottom: 20px;
}

/* 🎀 Form Group */
.form-group {
  margin-bottom: 15px;
  text-align: left;
}

label {
  display: block;
  font-weight: bold;
  color: #ff3399;
  margin-bottom: 5px;
}

/* 🎀 Input Fields */
input {
  width: 100%;
  padding: 12px;
  border: 2px solid #ff99cc;
  border-radius: 10px;
  font-size: 16px;
  background: #fff;
  color: #333;
  outline: none;
  transition: 0.3s;
}

input:focus {
  border-color: #ff66b2;
  background: #fff5fa;
}

/* 🎀 Error Messages */
.msg-error {
  color: #ff3366;
  font-size: 14px;
  text-align: left;
  margin-top: 5px;
}

/* 🎀 Buttons */
.btn {
  width: 100%;
  padding: 12px;
  background: #ff66b2;
  border: none;
  color: white;
  font-size: 18px;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s;
  margin-top: 15px;
  font-weight: bold;
}

.btn:hover {
  background: #ff3385;
  transform: scale(1.05);
}

/* 🎀 Secondary Button */
.btn-secondary {
  display: inline-block;
  margin-top: 10px;
  text-decoration: none;
  font-size: 16px;
  padding: 10px;
  width: 100%;
  background: #ff99cc;
  color: white;
  border-radius: 10px;
  text-align: center;
  transition: 0.3s;
}

.btn-secondary:hover {
  background: #ff66b2;
  transform: scale(1.05);
}

/* 🎀 Fade In Animation */
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

/* 🎀 Cute Icons */
i {
  margin-right: 5px;
  color: #ff3399;
}
</style>
