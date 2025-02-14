<template>
  <div class="register-container">
    <div class="register">
      <h1>🎀 Sign Up 🎀</h1>

      <div class="input-container">
        <input type="text" placeholder="👤 Enter Name" v-model="form.name">
        <p class="msg-error" v-if="errors.name">{{ errors.name }}</p>
      </div>

      <div class="input-container">
        <input type="email" placeholder="📧 Enter Email" v-model="form.email">
        <p class="msg-error" v-if="errors.email">{{ errors.email }}</p>
      </div>

      <div class="input-container">
        <input type="password" placeholder="🔒 Enter Password" v-model="form.password">
        <p class="msg-error" v-if="errors.password">{{ errors.password }}</p>
      </div>

      <button @click="SignUp">🚀 Sign Up</button>
      
      <p class="redirect-text">
        Already have an account? <RouterLink to="/login">💖 Login</RouterLink>
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
              title: "✨ Success! ✨",
              text: "Your account has been created successfully! 🎉",
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
        errors.name = "❌ Name is required!";
      }
      if (!this.form.email) {
        errors.email = "❌ Email is required!";
      } else if (!emailPattern.test(this.form.email)) {
        errors.email = "❌ Invalid email format!";
      }
      if (!this.form.password) {
        errors.password = "❌ Password is required!";
      }

      this.errors = errors;
      return Object.keys(errors).length === 0;
    }
  }
};
</script>

<style scoped>
/* 🌸 Centered container */
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%);
  padding: 20px;
}

/* 🎀 Sign Up Form */
.register {
  max-width: 400px;
  width: 100%;
  padding: 30px;
  text-align: center;
  border-radius: 15px;
  background: #fff;
  box-shadow: 0 10px 30px rgba(255, 105, 180, 0.3);
  transition: transform 0.3s ease-in-out;
}

.register:hover {
  transform: scale(1.03);
}

/* 💖 Header */
h1 {
  font-size: 28px;
  font-weight: bold;
  color: #ff69b4;
  margin-bottom: 20px;
}

/* 🌟 Input Fields */
.input-container {
  position: relative;
  width: 100%;
  margin-bottom: 15px;
}

input {
  width: 100%;
  padding: 12px;
  border: 2px solid #ff69b4;
  border-radius: 25px;
  font-size: 16px;
  outline: none;
  transition: 0.3s;
  box-shadow: inset 0 0 5px rgba(255, 105, 180, 0.3);
}

input:focus {
  border-color: #ff1493;
  box-shadow: 0 0 10px rgba(255, 105, 180, 0.5);
}

/* ❌ Error Messages */
.msg-error {
  color: red;
  font-size: 14px;
  text-align: left;
  margin-top: -5px;
  padding-left: 10px;
}

/* 🚀 Sign Up Button */
button {
  width: 100%;
  padding: 12px;
  border: none;
  background: linear-gradient(135deg, #ff69b4, #ff1493);
  color: white;
  font-size: 18px;
  font-weight: bold;
  border-radius: 25px;
  cursor: pointer;
  transition: 0.3s;
  box-shadow: 0 5px 15px rgba(255, 105, 180, 0.4);
}

button:hover {
  background: linear-gradient(135deg, #ff1493, #ff69b4);
  transform: scale(1.05);
  box-shadow: 0 8px 20px rgba(255, 105, 180, 0.6);
}

/* 💖 Redirect Text */
.redirect-text {
  margin-top: 15px;
  font-size: 14px;
  color: #333;
}

.redirect-text a {
  color: #ff1493;
  font-weight: bold;
  text-decoration: none;
  transition: 0.3s;
}

.redirect-text a:hover {
  text-decoration: underline;
  color: #ff69b4;
}

/* 📱 Responsive Design */
@media (max-width: 500px) {
  .register {
    padding: 25px;
    width: 90%;
  }

  h1 {
    font-size: 24px;
  }

  input, button {
    font-size: 16px;
  }
}
</style>
