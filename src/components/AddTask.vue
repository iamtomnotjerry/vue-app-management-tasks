<template>
  <div class="add">
    <h1>Add New Task</h1>
    <input type="text" placeholder="Enter title" v-model="form.title">
    <textarea placeholder="Enter content" rows="6" v-model="form.content"></textarea>
    <button @click="addTask()">Add Task</button>
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
        content: ""
      },
      user: null // Store logged-in user
    };
  },
  created() {
    // Get user from localStorage
    let userLogin = localStorage.getItem("userLogin");
    console.log(userLogin);
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
        userId: this.user.id, // Get user ID from localStorage
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
