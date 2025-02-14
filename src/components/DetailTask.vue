<template>
  <div class="detail-container">
    <div class="card">
      <h1 class="title">📌 Task Details</h1>
      <div v-if="task" class="task-info">
        <p><strong>ID:</strong> {{ task.id }}</p>
        <p><strong>Title:</strong> {{ task.title }}</p>
        <p><strong>Content:</strong> {{ task.content }}</p>
        <p><strong>Owner:</strong> {{ userName }}</p>
      </div>
      <div v-else class="loading">
        <p>Loading task details...</p>
      </div>
      <button class="btn back-btn">
        <router-link to="/">⬅️ Back to Task List</router-link>
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      task: null,
      userName: "",
      user: null, 
      taskId: null
    };
  },
  async created() {
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
        text: "Please log in to view task details.",
        confirmButtonColor: "#f39c12"
      }).then(() => {
        this.$router.push({ name: "LogIn" });
      });
      return;
    }

    this.taskId = this.$route.params.id;
    await this.fetchTask();
  },
  methods: {
    async fetchTask() {
      try {
        let response = await axios.get(`http://localhost:3000/tasks/${this.taskId}`);
        this.task = response.data;

        let userResponse = await axios.get(`http://localhost:3000/users/${this.task.userId}`);
        this.userName = userResponse.data.name;
      } catch (error) {
        console.error("Error fetching task:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load task details.",
          confirmButtonColor: "#d33"
        }).then(() => {
          this.$router.push({ name: "Home" });
        });
      }
    }
  }
};
</script>

<style scoped>
/* Background & Container */
.detail-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #74ebd5, #acb6e5);
}

/* Card Styling */
.card {
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  text-align: center;
  max-width: 500px;
  width: 90%;
  animation: fadeIn 0.5s ease-in-out;
}

/* Title */
.title {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

/* Task Info */
.task-info p {
  font-size: 18px;
  color: #555;
  margin: 10px 0;
  word-wrap: break-word; /* Ensures long words break into new lines */
  overflow-wrap: break-word; /* Extra safeguard for wrapping */
  white-space: pre-wrap; /* Preserves spaces and breaks text */
  max-width: 100%; /* Ensures it does not overflow outside */
}


/* Loading State */
.loading p {
  font-size: 16px;
  color: #777;
}

/* Buttons */
.btn {
  display: inline-block;
  margin-top: 20px;
  padding: 12px 20px;
  font-size: 16px;
  color: white;
  background: #3498db;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease-in-out;
}

.btn:hover {
  background: #2980b9;
}

/* Router Link Button */
.back-btn a {
  text-decoration: none;
  color: white;
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
</style>
