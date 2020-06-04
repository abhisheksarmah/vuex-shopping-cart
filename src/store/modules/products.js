import shop from "@/api/shop";

export default {
    state: {
        items: [],
    },

    getters: {
        availableProudcts(state) {
            return state.items.filter(product => product.inventory > 0);
        },

        productIsInStock() {
            return (product) => {
                return product.inventory > 0;
            };
        }
    },

    mutations: {
        setProducts(state, products) {
            // update products 
            state.items = products;
        },

        decrementProductInventory(state, product) {
            product.inventory--;
        },
    },

    actions: {
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
        }
    }
};