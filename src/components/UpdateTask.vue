<template>
  <div class="modal-overlay" @click.self="$emit('close-modal')">
    <div class="modal-content">
      <button class="close-btn" @click="$emit('close-modal')">✖️</button>
      <h1>📝 Update Task</h1>

      <div class="form-group">
        <label>✨ Title:</label>
        <input type="text" v-model="form.title" placeholder="Enter title" />
      </div>

      <div class="form-group">
        <label>💖 Content:</label>
        <textarea rows="4" v-model="form.content" placeholder="Enter content"></textarea>
      </div>

      <div class="form-group">
        <label>📅 Start Date:</label>
        <input type="date" v-model="form.startDate" />
      </div>

      <div class="form-group">
        <label>⏳ Deadline:</label>
        <input type="date" v-model="form.deadline" />
      </div>

      <div class="form-group">
        <label>✅ Completed:</label>
        <input type="checkbox" v-model="form.completed" />
      </div>

      <button @click="updateTask">🌸 Update Task</button>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";

export default {
  props: ["task"],
  data() {
    return {
      form: {
        title: "",
        content: "",
        startDate: "",
        deadline: "",
        completed: false
      }
    };
  },
  watch: {
    task: {
      immediate: true,
      handler(newTask) {
        if (newTask) {
          this.form = { ...newTask };
        }
      }
    }
  },
  methods: {
    async updateTask() {
      if (!this.form.title || !this.form.content || !this.form.startDate || !this.form.deadline) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please fill in all fields!",
          confirmButtonColor: "#ff6680"
        });
        return;
      }

      try {
        await axios.put(`http://localhost:3000/tasks/${this.form.id}`, this.form);
        Swal.fire({
          icon: "success",
          title: "Task Updated!",
          text: "Your task has been successfully updated.",
          confirmButtonColor: "#ff99cc"
        });
        this.$emit("close-modal");
        this.$emit("task-updated", this.form);
      } catch (error) {
        console.error("Error updating task:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to update task. Please try again!",
          confirmButtonColor: "#ff6680"
        });
      }
    }
  }
};
</script>

<style scoped>
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

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  position: relative;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

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

.form-group {
  text-align: left;
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
}

input, textarea {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  background: #ff99cc;
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 5px;
  width: 100%;
  font-size: 16px;
}

button:hover {
  background: #ff6680;
}
</style>
