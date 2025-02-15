<template>
  <nav class="nav">
    <ul class="nav-list">
      <li>
        <button @click="showAddTask" class="add-task-btn">➕ Add Task</button>
      </li>
      <li v-if="isAuthenticated">
        <router-link :to="'/updateuser/' + userId" class="nav-link">💖 Update Profile</router-link>
      </li>
      <li v-if="isAuthenticated">
        <a href="#" @click.prevent="Logout" class="nav-link logout-btn">🚪 Log Out</a>
      </li>
      <li class="user-info">🌸 Welcome, <span class="username">{{ username }}</span>! 🌸</li>
    </ul>

    <AddTask v-if="showAddTaskModal" @close-modal="showAddTaskModal = false" />
  </nav>
</template>

<script>
import { mapState, mapActions } from "vuex";
import AddTask from "@/components/AddTask.vue";

export default {
  components: { AddTask },
  data() {
    return {
      showAddTaskModal: false
    };
  },
  computed: {
    ...mapState(["userInfo", "isAuthenticated"]),
    username() {
      return this.userInfo?.name || "Guest";
    },
    userId() {
      return this.userInfo?.id || "";
    }
  },
  methods: {
    ...mapActions(["logoutUser"]),
    showAddTask() {
      this.showAddTaskModal = true;
      console.log("Opening Add Task Modal...");
    },
    Logout() {
      this.logoutUser();
      this.$router.push({ name: "LogIn" });
    }
  }
};
</script>

<style scoped>
/* 🌸 Soft UI Navigation Bar */
.nav {
  background: linear-gradient(135deg, #ff9a9e, #fad0c4, #ffdde1);
  padding: 14px 20px;
  border-radius: 15px;
  box-shadow: 0 6px 12px rgba(255, 182, 193, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 🌸 Navigation List */
.nav-list {
  list-style: none;
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 0;
  margin: 0;
}

/* 🌸 Buttons & Links */
.nav-link,
.add-task-btn,
.logout-btn {
  font-size: 16px;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 30px;
  transition: all 0.3s ease-in-out;
  text-decoration: none;
  box-shadow: 3px 3px 8px rgba(255, 105, 180, 0.3);
}

.nav-link {
  background: white;
  color: #ff69b4;
}

.nav-link:hover {
  background: #ff69b4;
  color: white;
  box-shadow: 3px 3px 12px rgba(255, 105, 180, 0.5);
  transform: scale(1.1);
}

/* 🌸 Add Task Button */
.add-task-btn {
  background: #ff69b4;
  color: white;
  border: none;
  cursor: pointer;
}

.add-task-btn:hover {
  background: #ff1493;
  box-shadow: 3px 3px 15px rgba(255, 20, 147, 0.5);
}

/* 🌸 Logout Button */
.logout-btn {
  background: #ff4f4f;
  color: white;
}

.logout-btn:hover {
  background: #d32f2f;
  box-shadow: 3px 3px 15px rgba(211, 47, 47, 0.5);
}

/* 🌸 User Info */
.user-info {
  font-size: 16px;
  font-weight: bold;
  padding: 8px 15px;
  border-radius: 30px;
  background: white;
  color: #ff69b4;
  box-shadow: 3px 3px 10px rgba(255, 105, 180, 0.4);
}

/* 🌸 Username */
.username {
  color: #ff1493;
  font-weight: bold;
}

/* 🌸 Responsive Design */
@media (max-width: 768px) {
  .nav {
    flex-direction: column;
    padding: 12px;
  }

  .nav-list {
    flex-direction: column;
    gap: 15px;
  }

  .user-info {
    margin-top: 10px;
  }
}
</style>
