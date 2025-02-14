import { createWebHistory, createRouter } from "vue-router";
import Home from './components/Home.vue';
import SignUp from './components/Signup.vue';
import LogIn from "./components/LogIn.vue";
import UpdateUser from "./components/UpdateUser.vue";
import AddTask from "./components/AddTask.vue";
import UpdateTask from "./components/UpdateTask.vue";
import DetailTask from "./components/DetailTask.vue";

const routes = [
  {
    name: "Home",
    component: Home,
    path: '/'
  },
  {
    name: "SignUp",
    component: SignUp,
    path: '/signup'
  },
  {
    name: "LogIn",
    component: LogIn,
    path: '/login'
  },
  {
    name: "UpdateUser",
    component: UpdateUser,
    path: '/updateuser/:id'
  },
  {
    name: "AddTask",
    component: AddTask,
    path: '/addtask'
  },
  {
    name: "UpdateTask",
    component: UpdateTask,
    path: '/updatetask/:id'
  },
  {
    name: "DetailTask",
    component: DetailTask,
    path: '/detailtask/:id'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;