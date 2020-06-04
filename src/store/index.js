import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

// initiate the vuex store constructor
export default new Vuex.Store({
  state: { // data
    products: []
  },
  getters: { // computed properties
    productsCount() {
      // ..
    }
  },
  actions: { // methods
    fetchProducts() {
      // make the call
      // run set product mutation
    }
  },

  mutations: { // responsible for setting and updating the state
    setProducts(state, products) {
      // update products 
      state.products = products;
    }
  }
});