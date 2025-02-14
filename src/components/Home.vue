<template>
  <div class="container">
    <Header />
    <div class="content">
      <h1 class="title">📝 Your Tasks</h1>
      
      <div class="search-box">
        <input type="text" v-model="searchQuery" placeholder="🔍 Find a task..." class="search-input">
      </div>
      
      <div v-if="filteredTasks.length === 0" class="no-tasks">
        <p>No tasks found! Add a new task to get started. 😊</p>
        <router-link to="/addtask" class="btn add-task">➕ Add Task</router-link>
      </div>
      
      <table v-else class="task-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Content</th>
            <th class="action">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in filteredTasks" :key="task.id">
            <td>{{ task.id }}</td>
            <td>{{ task.title }}</td>
            <td>{{ task.content }}</td>
            <td>
              <button class="btn detail"><router-link :to="'/detailtask/' + task.id">🔍 Detail</router-link></button>
              <button class="btn update"><router-link :to="'/updatetask/' + task.id">✏️ Update</router-link></button>
              <button class="btn delete" @click="deleteTask(task.id)">❌ Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
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
      userId: null,
      searchQuery: ""
    };
  },
  computed: {
    userTasks() {
      return this.tasks.filter(task => task.userId === this.userId);
    },
    filteredTasks() {
      return this.userTasks.filter(task => 
        task.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
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
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
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

<style scoped>
/* Background */
.container {
  background: linear-gradient(135deg, #74ebd5, #acb6e5);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
}

/* Content */
.content {
  width: 90%;
  max-width: 900px;
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  animation: fadeIn 0.5s ease-in-out;
}

/* Title */
.title {
  font-size: 28px;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
}

/* Search Box */
.search-box {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
.search-input {
  width: 100%;
  max-width: 400px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
}

/* No Tasks Section */
.no-tasks {
  text-align: center;
  padding: 20px;
  font-size: 18px;
  color: #555;
}

.add-task {
  display: inline-block;
  margin-top: 10px;
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background: #28a745;
  border-radius: 5px;
  text-decoration: none;
  transition: 0.3s;
}

.add-task:hover {
  background: #218838;
}

/* Responsive Design */
@media (max-width: 768px) {
  .title {
    font-size: 24px;
  }
}
</style>
