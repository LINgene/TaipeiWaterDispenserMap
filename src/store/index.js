import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    TPEWater: "",
  },
  getters: {
    TPEWaterFilter(state) {
      return state.todos.filter((todo) => todo.done);
    },
  },
  mutations: {
    increment(state, TPEWater) {
      state.TPEWater = TPEWater;
    },
  },
  actions: {},
  modules: {},
});
