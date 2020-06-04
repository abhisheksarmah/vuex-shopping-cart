import Vuex from 'vuex';
import Vue from 'vue';
import shop from "@/api/shop";

Vue.use(Vuex);

// initiate the vuex store constructor
export default new Vuex.Store({
  state: { // data
    products: [],
    // {id,quantity}
    cart: []
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
        // make the call
        // call setProducts mutation
        shop.getProducts(products => {
          commit("setProducts", products);
          resolve();
        });
      });
    },

    addProductToCart(context, product) {
      if (product.inventory > 0) {
        // find cartitem
        const cartItem = context.state.cart.find(item => item.id == product.id);
        if (!cartItem) {
          // push product to cart
          context.commit('pushProductToCart', product.id);
        } else {
          // increment item quantity
          context.commit('incrementItemQuantity', cartItem);
        }
        context.commit('decrementProductInventory', product);
      }
    }
  },

  mutations: { // responsible for setting and updating the state
    setProducts(state, products) {
      // update products 
      state.products = products;
    },
    pushProductToCart(state, productId) {
      state.cart.push({
        id: productId,
        quantity: 1
      });
    },
    incrementItemQuantity(state, cartItem) {
      cartItem.quantity++;
    },
    decrementProductInventory(state, product) {
      product.inventory--;
    }
  }
});