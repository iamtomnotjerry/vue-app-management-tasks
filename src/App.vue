<script setup>
import { RouterView } from 'vue-router';


</script>

<template>
  <RouterView></RouterView>
</template>

<style>
h1 {
  text-align: center;
  margin-bottom: 15px;
}

.register button, .login button, .add button {
  text-align: center;
  width: 320px;
  height: 40px;
  margin-right: auto;
  margin-left: auto;
  display: block;
  border: 2px solid skyblue;
  background: skyblue;
}

.register input, .login input, .add input, .add textarea {
  width: 300px;
  height: 40px;
  display: block;
  padding-left: 20px;
  padding-left: 20px;
  margin-bottom: 10px;
  margin-left: auto;
  margin-right: auto;
}

.add textarea {
  height: auto !important;
}

.btn-login {
  text-align: center;
}

.list-task {
  margin-top: 5px;
}

</style>
