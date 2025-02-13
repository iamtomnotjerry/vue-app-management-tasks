import { createWebHistory, createRouter } from "vue-router";
import Home from './components/Home.vue';
import SignUp from "./components/Signup.vue";

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
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;