import { createStore } from "vuex";
import axios from "axios";

const store = createStore({
  state() {
    return {
      isAuthenticated: false,
      userInfo: null
    };
  },
  mutations: {
    setAuthentication(state, status) {
      state.isAuthenticated = status;
      console.log("Mutation - isAuthenticated:", state.isAuthenticated);
    },
    updateUserInfo(state, user) {
      state.userInfo = user;
      console.log("Mutation - userInfo:", state.userInfo);
    },
    clearUser(state) {
      state.isAuthenticated = false;
      state.userInfo = null;
      console.log("Mutation - Logout: Cleared user data");
    }
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        let response = await axios.get("http://localhost:3000/users");
        let users = response.data;
        let user = users.find(
          u => u.email === credentials.email && u.password === credentials.password
        );

        if (user) {
          commit("setAuthentication", true);
          commit("updateUserInfo", user);
          return { success: true };
        } else {
          return { success: false, message: "Invalid email or password!" };
        }
      } catch (error) {
        console.error("Login error:", error);
        return { success: false, message: "Something went wrong. Please try again later." };
      }
    },
    logoutUser({ commit }) {
      console.log("Action - logoutUser: Called");
      commit("clearUser"); // Make sure this actually commits
    },
    checkLoginStatus({ commit }) {
      let userLogin = localStorage.getItem("userLogin");
      if (userLogin) {
        let user = JSON.parse(userLogin);
        commit("setAuthentication", true);
        commit("updateUserInfo", user);
      }
    }
  }
});

export default store;
