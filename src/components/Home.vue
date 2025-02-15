<template>
  <div class="container">
    <Header />
    <div class="content">
      <h1 class="title">📝 Your Tasks</h1>
      <TaskTable 
  :tasks="userTasks" 
  @delete-task="deleteTask" 
  @update-task="updateTask" 
  @task-added="fetchTasks"  
/>

    </div>
  </div>
</template>

<script>
import axios from "axios";
import Header from "./Header.vue";
import TaskTable from "./TaskTable.vue";

export default {
  components: { Header, TaskTable },
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
      this.fetchTasks(); // ✅ Refresh after updating

    },
    async deleteTask(id) {
      await axios.delete(`http://localhost:3000/tasks/${id}`);
      this.tasks = this.tasks.filter(task => task.id !== id);
    },
    async updateTask(updatedTask) {
      await axios.patch(`http://localhost:3000/tasks/${updatedTask.id}`, { 
        completed: true, 
        finishedDate: updatedTask.finishedDate 
      });

    }
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
  background: #fff0f5;
  border-radius: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}
.title {
  text-align: center;
  color: #ff66a3;
  font-size: 28px;
}
</style>
