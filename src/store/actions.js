import shop from "@/api/shop";

export default { // methods
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

    addProductToCart({
        state,
        getters,
        commit
    }, product) {
        if (getters.productIsInStock(product)) {
            // find cartitem
            const cartItem = state.cart.find(item => item.id == product.id);
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
            state.cart,
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