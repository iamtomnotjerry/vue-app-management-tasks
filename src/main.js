import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './routes';
import store from './store';

const app = createApp(App);

// Ensure Vuex store is initialized before mounting
store.dispatch("checkLoginStatus");

app.use(router);
app.use(store);
app.mount('#app');
