import Vuex from 'vuex';
import Vue from 'vue';
import actions from "./actions";
import products from "./modules/products";
import cart from "./modules/cart";
Vue.use(Vuex);

/**
 * module expose their state under store.state.moduleName
 * on other hand getters are not grouped by moduleName
 * the getters, actions, mutations inside modules are are registered under the global namespace
 */

/**
 * As by default, actions, mutations, getters inside modules  are registered under global namespace. 
 * This means e.g. when more than 1 modules have an action with the same name, all these actions we run will dispatch it.  
 * This feature is handy in some rare occassions, but also might be dangerous and hard to debug.
 * 
 */

// initiate the vuex store constructor
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