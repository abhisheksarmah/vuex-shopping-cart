import Vuex from 'vuex';
import Vue from 'vue';
import actions from "./actions";
import products from "./modules/products";
import cart from "./modules/cart";
Vue.use(Vuex);

// initiate the vuex store constructor

// module expose their state under store.state.moduleName 
// on other hand getters are not grouped by moduleName
// the getters, actions, mutations inside modules are are registered under the global namespace

export default new Vuex.Store({
  modules: {
    products,
    cart
  },

  state: { // data

  },

  getters: { // computed properties

  },

  actions,

  mutations: { // responsible for setting and updating the state

  }
});