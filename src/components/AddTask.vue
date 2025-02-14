<template>
  <div class="add-container">
    <h1 class="title">📝 Add New Task</h1>
    <div class="form-box">
      <input type="text" placeholder="Enter title..." v-model="form.title" class="input-field">
      <textarea placeholder="Enter content..." rows="6" v-model="form.content" class="textarea-field"></textarea>
      <button @click="addTask()" class="btn add-btn">➕ Add Task</button>
      <button class="btn list-task"><router-link to="/">📋 Go To List Tasks</router-link></button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      form: {
        title: "",
        content: ""
      },
      user: null // Store logged-in user
    };
  },
  created() {
    let userLogin = localStorage.getItem("userLogin");
    if (userLogin) {
      try {
        this.user = JSON.parse(userLogin);
      } catch (error) {
        console.error("Error parsing userLogin:", error);
      }
    } else {
      Swal.fire({
        icon: "warning",
        title: "No User Found!",
        text: "Please log in to add tasks.",
        confirmButtonColor: "#f39c12"
      }).then(() => {
        this.$router.push({ name: "LogIn" }); // Redirect to login page
      });
    }
  },
  methods: {
    async addTask() {
      if (!this.form.title || !this.form.content) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please fill in both title and content!",
          confirmButtonColor: "#d33"
        });
        return;
      }

      if (!this.user) {
        Swal.fire({
          icon: "error",
          title: "Not Logged In",
          text: "You need to log in first!",
          confirmButtonColor: "#d33"
        });
        return;
      }

      let task = {
        userId: this.user.id,
        title: this.form.title,
        content: this.form.content
      };

      try {
        let response = await axios.post("http://localhost:3000/tasks", task);
        console.log("Task added:", response.data);

        Swal.fire({
          icon: "success",
          title: "Task Added!",
          text: "Your task has been successfully added.",
          confirmButtonColor: "#3085d6"
        });

        // Reset form
        this.form.title = "";
        this.form.content = "";
      } catch (error) {
        console.error("Error adding task:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to add task. Please try again!",
          confirmButtonColor: "#d33"
        });
      }
    }
  }
};
</script>

<style scoped>
/* Background */
.add-container {
  background: linear-gradient(135deg, #74ebd5, #acb6e5);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

/* Title */
.title {
  font-size: 32px;
  color: #2c3e50;
  margin-bottom: 20px;
  font-weight: bold;
}

/* Form Box */
.form-box {
  width: 90%;
  max-width: 600px;
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  text-align: center;
  animation: fadeIn 0.5s ease-in-out;
}

/* Input Fields */
.input-field, .textarea-field {
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: 2px solid #3498db;
  border-radius: 5px;
  font-size: 16px;
  transition: 0.3s ease-in-out;
}

.input-field:focus, .textarea-field:focus {
  border-color: #2980b9;
  box-shadow: 0px 0px 8px rgba(52, 152, 219, 0.5);
  outline: none;
}

/* Buttons */
.btn {
  display: inline-block;
  width: 100%;
  padding: 12px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  text-decoration: none;
  transition: 0.3s ease-in-out;
}

.btn a {
  text-decoration: none;
  color: white;
}

/* Add Button */
.add-btn {
  background: #2ecc71;
  color: white;
}

.add-btn:hover {
  background: #27ae60;
}

/* List Task Button */
.list-task {
  background: #f39c12;
  color: white;
}

.list-task:hover {
  background: #e67e22;
}

/* Animations */
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

/* Responsive Design */
@media (max-width: 768px) {
  .form-box {
    padding: 20px;
  }

  .title {
    font-size: 28px;
  }

  .btn {
    font-size: 14px;
  }
}
</style>
