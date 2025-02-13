<template>
  <div class="nav">
    <ul>
      <li><a href="#">Add Task</a></li>
      <li><a href="#">Update Profile</a></li>
      <li><a href="#" @click.prevent="Logout">Log Out</a></li>
      <li class="user-name">Welcome: {{ username }}</li> 
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: ''
    };
  },
  created() {
    let userLogin = localStorage.getItem("userLogin");
    if (userLogin) {
      try {
        this.username = JSON.parse(userLogin).name; // Đọc dữ liệu từ localStorage
      } catch (error) {
        console.error("Error parsing userLogin:", error);
      }
    }
  },
  methods: {
    Logout() {
      localStorage.removeItem("userLogin"); // Xóa user khỏi localStorage
      this.$router.push({ name: "LogIn" }); // Chuyển hướng về trang đăng nhập
    }
  }
};
</script>

<style>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
}

li {
  float: left;
}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

li a:hover {
  background-color: #00AA6D;
}

.active {
  background-color: #00AA6D;
}

/* Căn chỉnh username về bên phải */
.user-name {
  float: right;
  color: white;
  padding: 14px 16px;
}
</style>
