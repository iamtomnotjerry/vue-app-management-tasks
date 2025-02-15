<template>
  <div class="modal-overlay" @click.self="$emit('close-modal')">
    <div class="modal-content">
      <button class="close-btn" @click="$emit('close-modal')">✖️</button>
      <h1 class="title">📌 Task Details</h1>

      <div v-if="task" class="task-info">
        <p><strong>ID:</strong> {{ task.id }}</p>
        <p><strong>Title:</strong> {{ task.title }}</p>
        <p><strong>Content:</strong> {{ task.content }}</p>
        <p><strong>Owner:</strong> {{ userName }}</p>
        <p><strong>Start Date:</strong> {{ formatDate(task.startDate) }}</p>
        <p><strong>Deadline:</strong> {{ formatDate(task.deadline) }}</p>
        <p v-if="task.completed"><strong>Finished Date:</strong> {{ formatDateTime(task.finishedDate) }}</p>
        <p :class="statusClass"><strong>Status:</strong> {{ taskStatus }}</p>
      </div>

      <div v-else class="loading">
        <p>Loading task details...</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["task"],
  data() {
    return {
      userName: "",
      user: null
    };
  },
  computed: {
    taskStatus() {
      if (this.task.completed) return "✅ Completed";
      const today = new Date().toISOString().split("T")[0];
      return this.task.deadline < today ? "❌ Overdue" : "⏳ In Progress";
    },
    statusClass() {
      return {
        completed: this.task.completed,
        overdue: this.task.deadline < new Date().toISOString().split("T")[0] && !this.task.completed,
        inprogress: !this.task.completed && this.task.deadline >= new Date().toISOString().split("T")[0]
      };
    }
  },
  watch: {
    task: {
      immediate: true,
      handler(newTask) {
        if (newTask) {
          this.fetchUser(newTask.userId);
        }
      }
    }
  },
  methods: {
    async fetchUser(userId) {
      try {
        let response = await axios.get(`http://localhost:3000/users/${userId}`);
        this.userName = response.data.name;
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    },
    formatDateTime(dateTime) {
      return new Date(dateTime).toLocaleString("en-US", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true });
    }
  }
};
</script>

<style scoped>
/* Modal Overlay */
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
}

/* Modal Content */
.modal-content {
  background: white;
  padding: 25px;
  border-radius: 12px;
  width: 450px;
  text-align: left;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  animation: fadeIn 0.3s ease-in-out;
  position: relative;
}

/* Close Button */
.close-btn {
  position: absolute;
  top: 10px;
  right: 15px;
  background: red;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 50%;
}

/* Task Info */
.task-info p {
  margin: 10px 0;
  font-size: 17px;
  color: #333;
}

/* Task Status Colors */
.completed {
  color: green;
  font-weight: bold;
}

.overdue {
  color: red;
  font-weight: bold;
}

.inprogress {
  color: orange;
  font-weight: bold;
}

/* Loading Text */
.loading {
  font-size: 18px;
  color: gray;
  text-align: center;
}

/* Animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
