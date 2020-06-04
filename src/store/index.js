import Vuex from 'vuex';
import Vue from 'vue';
import shop from "@/api/shop";

Vue.use(Vuex);

// initiate the vuex store constructor
export default new Vuex.Store({
  state: { // data
    products: []
  },
  getters: { // computed properties
    availableProudcts(state) {
      return state.products.filter(product => product.inventory > 0);
    }
  },
  actions: { // methods
    fetchProducts({
      commit
    }) {
      return new Promise((resolve) => {
        shop.getProducts(products => {
          commit("setProducts", products);
          resolve();
        });
      });
    }
  },

  mutations: { // responsible for setting and updating the state
    setProducts(state, products) {
      // update products 
      state.products = products;
    }
  }
});