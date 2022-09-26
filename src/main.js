import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
// Vue.prototype.axios = axios;
axios.defaults.baseURL = "api";

import "./assets/main.css";

const app = createApp(App);

app.use(router);

app.mount("#app");
