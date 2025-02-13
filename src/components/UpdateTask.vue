<template>
  <div class="update">
    <h1>Update Task</h1>
    <input type="text" placeholder="Enter title" v-model="form.title">
    <textarea placeholder="Enter content" rows="6" v-model="form.content"></textarea>
    <button @click="updateTask()">Update Task</button>
    <button class="list-task"><router-link to="/">Go To List Tasks</router-link></button>
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
        userId: "" // Ensure userId is retained
      },
      user: null, // Store logged-in user
      taskId: null // Task ID to update
    };
  },
  created() {
    // Get user from localStorage
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
        text: "Please log in to update tasks.",
        confirmButtonColor: "#f39c12"
      }).then(() => {
        this.$router.push({ name: "LogIn" }); // Redirect to login page
      });
    }

    // Fetch task data from API
    this.taskId = this.$route.params.id; // Get task ID from route
    this.fetchTask();
  },
  methods: {
    async fetchTask() {
      try {
        let response = await axios.get(`http://localhost:3000/tasks/${this.taskId}`);
        let task = response.data;

        // Check if the logged-in user is the task owner
        if (task.userId !== this.user.id) {
          Swal.fire({
            icon: "error",
            title: "Access Denied",
            text: "You can only update your own tasks!",
            confirmButtonColor: "#d33"
          }).then(() => {
            this.$router.push({ name: "Home" });
          });
          return;
        }

        // Populate form with existing data
        this.form.title = task.title;
        this.form.content = task.content;
        this.form.userId = task.userId; // Preserve the userId
      } catch (error) {
        console.error("Error fetching task:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch task data.",
          confirmButtonColor: "#d33"
        });
      }
    },
    async updateTask() {
      if (!this.form.title || !this.form.content) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please fill in both title and content!",
          confirmButtonColor: "#d33"
        });
        return;
      }

      let updatedTask = {
        title: this.form.title,
        content: this.form.content,
        userId: this.form.userId // Ensure userId is included
      };

      try {
        await axios.put(`http://localhost:3000/tasks/${this.taskId}`, updatedTask);

        Swal.fire({
          icon: "success",
          title: "Task Updated!",
          text: "Your task has been successfully updated.",
          confirmButtonColor: "#3085d6"
        });

        this.$router.push({ name: "Home" }); // Redirect to home after update
      } catch (error) {
        console.error("Error updating task:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to update task. Please try again!",
          confirmButtonColor: "#d33"
        });
      }
    }
  }
};
</script>

<style>
.update {
  max-width: 500px;
  margin: auto;
  text-align: center;
}

input, textarea {
  width: 100%;
  margin: 10px 0;
  padding: 8px;
}

button {
  margin: 5px;
  padding: 10px 15px;
  background-color: #00AA6D;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #008F5E;
}

.list-task a {
  text-decoration: none;
  color: white;
}
</style>
