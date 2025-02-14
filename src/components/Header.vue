<template>
  <div class="nav">
    <ul>
      <li>
        <routerLink to="addtask">➕ Add Task</routerLink>
      </li>
      <li>
        <RouterLink :to="'/updateuser/' + userId">💖 Update Profile</RouterLink>
      </li>
      <li><a href="#" @click.prevent="Logout">🚪 Log Out</a></li>
      <li class="user-name">🌸 Welcome, {{ username }}! 🌸</li> 
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      userId: ''
    };
  },
  created() {
    let userLogin = localStorage.getItem("userLogin");
    if (userLogin) {
      try {
        let user = JSON.parse(userLogin);
        this.username = user.name;
        this.userId = user.id; // Fix: Get correct user ID
      } catch (error) {
        console.error("Error parsing userLogin:", error);
      }
    }
  },
  methods: {
    Logout() {
      localStorage.removeItem("userLogin"); 
      this.$router.push({ name: "LogIn" });
    }
  }
};
</script>

<style scoped>
/* 🌸 Navbar Container */
.nav {
  background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%);
  padding: 12px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(255, 182, 193, 0.3);
}

/* 🌷 Navigation List */
ul {
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  margin: 0;
}

/* 🎀 Nav Items */
li {
  margin: 0 15px;
}

li a {
  text-decoration: none;
  font-size: 16px;
  font-weight: bold;
  padding: 10px 18px;
  border-radius: 20px;
  transition: 0.3s;
  background: white;
  color: #ff69b4;
  box-shadow: 2px 2px 8px rgba(255, 105, 180, 0.3);
}

li a:hover {
  background: #ff69b4;
  color: white;
  box-shadow: 2px 2px 15px rgba(255, 105, 180, 0.6);
  transform: scale(1.1);
}

/* 🌸 Username Styling */
.user-name {
  font-size: 16px;
  font-weight: bold;
  color: #ff69b4;
  background: white;
  padding: 8px 15px;
  border-radius: 20px;
  box-shadow: 2px 2px 10px rgba(255, 105, 180, 0.4);
}
</style>
