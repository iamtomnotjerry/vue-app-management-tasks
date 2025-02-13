<template>
  <div class="nav">
    <ul>
      <li><a href="">Add Task</a></li>
      <li><a href="">Update Profile</a></li>
      <li><a href="">Log Out</a></li>
      <li class="user-name">Welcome: User1</li> 
    </ul>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        username: ''
      }
    },
    created() {
    let userLogin = localStorage.getItem("userLogin");
    if (userLogin) {
      this.username = JSON.parse(userLogin).name;
    }
  }
  }
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

  /* Change the link color on hover */
  li a:hover {
    background-color: #00AA6D;
  }

  .active {
    background-color: #00AA6D;
  }

  /* Fix for the username alignment */
  .user-name {
    float: right;
    color: white;
    padding: 14px 16px;
  }
</style>
