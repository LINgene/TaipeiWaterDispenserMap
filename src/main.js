import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import jQuery from "jquery";

import "@/utils/Mixins";

window.$ = window.jQuery = jQuery;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
  mounted: function () {
    //系統載入時先取得資料
    this.Get_TPEWaterDate();
  },
  methods: {
    Get_TPEWaterDate: function () {
      //從API取得飲水機資料並存入Vuex
      var url = "https://api.mocki.io/v2/43beca31/TPEWater";

      axios
        .post(url)
        .then(function (response) {
          //存入Vuex
          store.commit("increment", response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
}).$mount("#app");
