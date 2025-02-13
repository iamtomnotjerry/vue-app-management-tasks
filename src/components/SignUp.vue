<template>
  <div>
    <div class="register">
      <h1>Sign Up</h1>
      <input type="text" placeholder="Enter Name" v-model="form.name">
      <input type="text" placeholder="Enter Email" v-model="form.email">
      <input type="text" placeholder="Enter Password" v-model="form.password">
      <button @click="SignUp()">Sign Up</button>
    </div>
  </div>
</template>


<script>
import axios from 'axios';
import Swal from 'sweetalert2'
export default {
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
      }
    }
  },
  methods: {
    async SignUp(){
      let userItem = {
        name: this.form.name,
        email: this.form.email,
        password: this.form.password
      }
      let result = await axios.post("http://localhost:3000/users",userItem);
      if (result.status == 201) {
        Swal.fire({
          title: "success!!",
          text: "Data Inserted!",
          icon: "success",
          timer: 2000,
        });
        setTimeout(()=>{
          this.$router.push({
            name:'Home'
          },2000)
        })
      }
    }
  }
}
</script>