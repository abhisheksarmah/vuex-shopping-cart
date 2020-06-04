import Vuex from 'vuex';
import Vue from 'vue';
import actions from "./actions";

Vue.use(Vuex);

// initiate the vuex store constructor
export default new Vuex.Store({
  state: { // data
    products: [],
    // {id,quantity}
    cart: [],
    checkoutStatus: null
  },
  getters: { // computed properties
    availableProudcts(state) {
      return state.products.filter(product => product.inventory > 0);
    },
    cartProducts(state) {
      return state.cart.map(cartItem => {
        const product = state.products.find(product => product.id == cartItem.id);
        return {
          title: product.title,
          price: product.price,
          quantity: cartItem.quantity,
        };
      });
    },
    cartTotal(state, getters) {
      // let total = 0;
      // getters.cartProducts.forEach(product => {
      //   total += product.price * product.quantity;
      // });
      // return total;
      // the es6 way
      return getters.cartProducts.reduce((total, product) => total + product.price * product.quantity, 0);
    },
    productIsInStock() {
      return (product) => {
        return product.inventory > 0;
      };
    }
  },
  actions,

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
    },
    setCheckoutStatus(state, status) {
      state.checkoutStatus = status;
    },
    emptyCart(state) {
      state.cart = [];
    }
  }
});