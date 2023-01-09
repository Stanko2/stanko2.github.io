import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/tailwind.css";
import VueRouter from "vue-router";
import AOS from "aos";
import "aos/dist/aos.css";

Vue.config.productionTip = false;
Vue.use(VueRouter);

new Vue({
  router,
  render: (h) => h(App),
  mounted() {
    AOS.init();
  },
}).$mount("#app");
