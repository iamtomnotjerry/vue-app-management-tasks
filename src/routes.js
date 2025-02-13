import { createWebHistory, createRouter } from "vue-router";
import Home from './components/Home.vue';
import SignUp from './components/Signup.vue';
import LogIn from "./components/LogIn.vue";

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
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;