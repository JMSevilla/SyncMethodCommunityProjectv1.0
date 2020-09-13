import Vue from "vue";
import App from "./App.vue";
import vuerouter from "vue-router";
import frontpage from "./views/TDev_Frontpage.vue";
import signup from "./views/TDev_Signup.vue";
import BootstrapVue from "bootstrap-vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import axios from "axios";
const base = axios.create({
  baseURL: "https://localhost:44332/"
});
Vue.prototype.$http = base;
Vue.use(VueSweetalert2);
Vue.use(BootstrapVue);
Vue.use(vuerouter);
Vue.use(Vuetify);
Vue.config.productionTip = false;

const router = new vuerouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "fronttestdev",
      component: frontpage,
      children: [
        {
          path: "/TDev_Signup",
          name: "TDev_Signup",
          component: signup
        }
      ]
    }
  ]
});
new Vue({
  router,
  render: (h) => h(App)
}).$mount("#app");
