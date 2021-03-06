import Vue from "vue";
import VueMDC from "../../index";

//SUI modules
import Test from "./test.vue";

Vue.use(VueMDC);

const vm = new Vue({
  el: "#app",
  render: h => h(Test)
});
