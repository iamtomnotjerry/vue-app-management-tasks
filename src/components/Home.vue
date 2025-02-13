<template>
  <div>
    <Header />
    <h1>Your Tasks</h1>
    <table id="items">
      <tr>
        <th>Id</th>
        <th>Title</th>
        <th>Content</th>
        <th class="action">Action</th>
      </tr>
      <tr v-for="task in userTasks" :key="task.id">
        <td>{{ task.id }}</td>
        <td>{{ task.title }}</td>
        <td>{{ task.content }}</td>
        <td>
          <button class="btn"><router-link :to="'/detail/' + task.id">Detail</router-link></button>
          <button class="btn"><router-link :to="'/update/' + task.id">Update</router-link></button>
          <button class="btn" @click="deleteTask(task.id)">Delete</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import Header from "./Header.vue";

export default {
  components: { Header },
  data() {
    return {
      tasks: [],
      userId: null
    };
  },
  computed: {
    userTasks() {
      return this.tasks.filter(task => task.userId === this.userId);
    }
  },
  created() {
    this.getUser();
    this.fetchTasks();
  },
  methods: {
    getUser() {
      let userLogin = localStorage.getItem("userLogin");
      if (userLogin) {
        try {
          this.userId = JSON.parse(userLogin).id;
        } catch (error) {
          console.error("Error parsing userLogin:", error);
        }
      }
    },
    async fetchTasks() {
      try {
        let response = await axios.get("http://localhost:3000/tasks");
        this.tasks = response.data;
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    },
    async deleteTask(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "This task will be permanently deleted!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios.delete(`http://localhost:3000/tasks/${id}`);
          this.tasks = this.tasks.filter(task => task.id !== id);
          Swal.fire("Deleted!", "Your task has been removed.", "success");
        }
      });
    }
  }
};
</script>

<style>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}

th {
  background-color: #333;
  color: white;
}

.btn {
  background-color: #00AA6D;
  color: white;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
  margin-right: 5px;
}

.btn a {
  text-decoration: none;
  color: white;
}

.btn:hover {
  background-color: #008F5E;
}
</style>
