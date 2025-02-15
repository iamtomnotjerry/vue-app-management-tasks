<template>
  <div>
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
          <th>Title</th>
          <th>Content</th>
          <th>Completed</th>
          <th class="action">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in filteredTasks" :key="task.id" :class="{ 'completed-task': task.completed }">
          <td>{{ task.title }}</td>
          <td class="task-content" :title="task.content">{{ truncateText(task.content, 30) }}</td>
          <td>
            <input type="checkbox" v-model="task.completed" @change="handleCheckboxClick(task)">
          </td>
          <td class="actions">
            <button @click="openDetail(task)" class="btn icon detail" title="View Details">🔍</button>
            <button @click="openUpdate(task)" class="btn icon update" title="Edit Task">✏️</button>
            <button class="btn icon delete" @click="deleteTask(task.id)" title="Delete Task">❌</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Detail Modal -->
    <DetailTask v-if="showDetailModal" :task="selectedTask" @close-modal="showDetailModal = false" />

    <!-- Update Modal -->
    <UpdateTask v-if="showUpdateModal" :task="selectedTask" @close-modal="showUpdateModal = false" @task-updated="updateTaskList" />
  </div>
</template>

<script>
import Swal from "sweetalert2";
import DetailTask from "./DetailTask.vue";
import UpdateTask from "./UpdateTask.vue";

export default {
  components: { DetailTask, UpdateTask },
  props: ["tasks"],
  data() {
    return {
      searchQuery: "",
      showDetailModal: false,
      showUpdateModal: false,
      selectedTask: null
    };
  },
  computed: {
    filteredTasks() {
      return this.tasks.filter(task => 
        task.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    openDetail(task) {
      this.selectedTask = task;
      this.showDetailModal = true;
    },
    openUpdate(task) {
      this.selectedTask = { ...task };
      this.showUpdateModal = true;
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
          this.$emit("delete-task", id);
          Swal.fire("Deleted!", "Your task has been removed.", "success");
        }
      });
    },
    async handleCheckboxClick(task) {
      if (task.completed) {
        const confirmation = await Swal.fire({
          title: "Are you sure?",
          text: "Mark this task as completed?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, mark as completed!"
        });
        if (confirmation.isConfirmed) {
          task.finishedDate = new Date().toLocaleString();
          this.$emit("update-task", task);
          Swal.fire("Completed!", "Task has been marked as completed.", "success");
        } else {
          task.completed = false;
        }
      }
    },
    updateTaskList(updatedTask) {
      const index = this.tasks.findIndex(task => task.id === updatedTask.id);
      if (index !== -1) {
        this.tasks[index] = updatedTask;
      }
    },
    truncateText(text, length) {
      return text.length > length ? text.substring(0, length) + "..." : text;
    }
  }
};
</script>



<style scoped>
.search-box {
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
}
.search-input {
  padding: 10px;
  width: 80%;
  border-radius: 10px;
  border: 1px solid #ff99cc;
}
.task-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 10px;
}
.task-table th, .task-table td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ffccdd;
}
.task-table th {
  background: #ff99cc;
  color: white;
}
.task-content {
  max-width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.completed-task {
  background-color: #dff0d8;
}
.actions {
  display: flex;
  justify-content: space-around;
}
</style>
