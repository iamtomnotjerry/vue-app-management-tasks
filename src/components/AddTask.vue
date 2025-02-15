<template>
  <div class="modal-overlay">
    <div class="add-container">
      <h1 class="title">💖 Add Your Task 💖</h1>
      <p class="subtitle">Plan your day with love & productivity! ✨</p>

      <div class="form-box">
        <div class="input-group">
          <input type="text" placeholder="🎀 Task Title..." v-model="form.title" class="input-field">
        </div>

        <div class="input-group">
          <textarea placeholder="📝 Task Details..." rows="5" v-model="form.content" class="textarea-field"></textarea>
        </div>

        <div class="input-group">
          <label class="label">📅 Start Date:</label>
          <input type="date" v-model="form.startDate" class="input-field">
        </div>

        <div class="input-group">
          <label class="label">⏳ Deadline:</label>
          <input type="date" v-model="form.deadline" class="input-field">
        </div>

        <button @click="addTask()" class="btn add-btn">🌸 Add Task</button>
        <button @click="$emit('close-modal')" class="btn close-btn">❌ Close</button>
      </div>
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
        content: "",
        startDate: "",
        deadline: ""
      },
      user: null
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
        title: "🚨 No User Found!",
        text: "Please log in to add tasks.",
        confirmButtonColor: "#f39c12"
      }).then(() => {
        this.$router.push({ name: "LogIn" });
      });
    }
  },
  methods: {
    async addTask() {
      if (!this.form.title.trim() || !this.form.content.trim() || !this.form.startDate || !this.form.deadline) {
        Swal.fire({
          icon: "error",
          title: "Oops... 🙈",
          text: "Please fill in all fields!",
          confirmButtonColor: "#d33"
        });
        return;
      }

      if (!this.user || !this.user.id) {
        Swal.fire({
          icon: "error",
          title: "Not Logged In 😢",
          text: "You need to log in first!",
          confirmButtonColor: "#d33"
        });
        return;
      }

      let task = {
        userId: this.user.id,
        title: this.form.title.trim(),
        content: this.form.content.trim(),
        startDate: this.form.startDate,
        deadline: this.form.deadline,
        completed: false
      };

      try {
        let response = await axios.post("http://localhost:3000/tasks", task);
        console.log("Task added:", response.data);

        Swal.fire({
          icon: "success",
          title: "✨ Task Added!",
          text: "Your task has been successfully added.",
          confirmButtonColor: "#ff69b4"
        });
        this.$emit("task-added"); // ✅ Notify Home.vue to update task list
        this.$emit("close-modal");
        this.form = { title: "", content: "", startDate: "", deadline: "" };
      } catch (error) {
        console.error("Error adding task:", error);
        Swal.fire({
          icon: "error",
          title: "🚨 Error",
          text: "Failed to add task. Please try again!",
          confirmButtonColor: "#d33"
        });
      }
    }
  }
};
</script>

<style scoped>
/* 🌸 Modal Background */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.5s ease-in-out;
}

/* 🌈 Modal Container */
.add-container {
  background: #fff0f6;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0px 4px 15px rgba(255, 105, 180, 0.4);
  text-align: center;
  max-width: 400px;
  width: 90%;
  animation: bounceIn 0.8s ease-in-out;
}

/* 🎀 Title */
.title {
  font-size: 24px;
  font-weight: bold;
  color: #ff69b4;
  text-shadow: 2px 2px 4px rgba(255, 182, 193, 0.6);
}

/* 🌟 Subtitle */
.subtitle {
  font-size: 14px;
  color: #ff85a2;
  margin-bottom: 20px;
}

/* 📜 Form Inputs */
.input-group {
  margin-bottom: 15px;
  text-align: left;
}

.label {
  font-size: 14px;
  font-weight: bold;
  color: #ff69b4;
  margin-bottom: 5px;
  display: block;
}

.input-field, .textarea-field {
  width: 100%;
  padding: 12px;
  border-radius: 12px;
  border: 2px solid #ff69b4;
  background: #fff;
  font-size: 14px;
  color: #333;
  outline: none;
  transition: 0.3s ease-in-out;
}

.input-field:focus, .textarea-field:focus {
  border-color: #ff85a2;
  box-shadow: 0px 0px 10px rgba(255, 105, 180, 0.5);
}

/* 🎀 Buttons */
.btn {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 12px;
  transition: 0.3s ease-in-out;
  cursor: pointer;
  margin-top: 10px;
}

.add-btn {
  background: linear-gradient(135deg, #ff69b4, #ff85a2);
  color: white;
  box-shadow: 0px 4px 10px rgba(255, 105, 180, 0.4);
}

.add-btn:hover {
  background: #ff4f9a;
  box-shadow: 0px 6px 15px rgba(255, 105, 180, 0.6);
}

.close-btn {
  background: #e74c3c;
  color: white;
}

.close-btn:hover {
  background: #c0392b;
}

/* ✨ Animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes bounceIn {
  0% { transform: scale(0.8); opacity: 0; }
  60% { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(1); }
}
</style>
