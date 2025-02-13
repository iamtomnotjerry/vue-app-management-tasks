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
    SignUp(){
      console.log(this.form)
      let userItem = {
        name: this.form.name,
        email: this.form.email,
        password: this.form.password
      }
    }
  }
}
</script>