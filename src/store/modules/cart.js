import shop from "@/api/shop";

export default {
    state: {
        // {id,quantity}
        items: [],
        checkoutStatus: null
    },

    getters: {
        cartProducts(state, getters, rootState) {
            return state.items.map(cartItem => {
                const product = rootState.products.items.find(product => product.id == cartItem.id);
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
    },
    mutations: {
        pushProductToCart(state, productId) {
            state.items.push({
                id: productId,
                quantity: 1
            });
        },

        incrementItemQuantity(state, cartItem) {
            cartItem.quantity++;
        },

        setCheckoutStatus(state, status) {
            state.checkoutStatus = status;
        },

        emptyCart(state) {
            state.items = [];
        }
    },

    actions: {
        addProductToCart({
            state,
            getters,
            commit,
            rootState
        }, product) {
            if (getters.productIsInStock(product)) {
                // find cartitem
                const cartItem = state.items.find(item => item.id == product.id);
                if (!cartItem) {
                    // push product to cart
                    commit('pushProductToCart', product.id);
                } else {
                    // increment item quantity
                    commit('incrementItemQuantity', cartItem);
                }
                commit('decrementProductInventory', product);
            }
        },

        checkOut({
            state,
            commit
        }) {
            shop.buyProducts(
                // pass the cart object
                state.items,
                () => {
                    commit('emptyCart');
                    commit('setCheckoutStatus', 'success');
                },
                () => {
                    commit('setCheckoutStatus', 'fail');
                }
            );
        }
    }
};