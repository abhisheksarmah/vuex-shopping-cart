<template>
	<div>
		<h1>Product Lists</h1>
		<img
			v-if="loading"
			src="../assets/loading.gif"
			alt="loading gif"
		>
		<ul v-else>
			<li
				v-for="product in products"
				:key="product.id"
			>
				{{ product.title }} - {{ product.price | currency}} - {{product.inventory}}
				<button
					:disabled="!productIsInStock(product)"
					@click="addProductToCart(product)"
				>Add to cart</button>
			</li>
		</ul>
	</div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
	data() {
		return {
			loading: false
			// if we want a specific product, that we knew its array index in the component
			// productIndex: 1
		};
	},
	// when using mapstate's argument as array, components computed properties will have the same name as state properties
	// computed: mapState(["products"]),
	// if we wanted a different computed property name then we could use objects
	// computed: mapState({
	// 	allProducts: "products"
	// 	// we could also use function as value instead of string
	// 	// allProducts: state => state.products,
	// 	// firstProduct: state => state.products[0]
	// 	// we need to access local data, using this, we have to use a normal function instead of an arrow function.
	// 	// specificProduct(state) {
	// 	// 	return state.products[this.productIndex]
	// 	// }
	// }),
	computed: {
		...mapState("products", {
			products: state => state.items
		}),
		...mapGetters("products", {
			productIsInStock: "productIsInStock"
		})
	},
	// computed: {
	// 	products() {
	// 		return this.$store.state.products;
	// 	},

	// 	productIsInStock() {
	// 		return this.$store.getters.productIsInStock;
	// 	}
	// },
	created() {
		this.loading = true;
		this.fetchProducts().then(() => (this.loading = false));
	},
	methods: {
		...mapActions({
			fetchProducts: "products/fetchProducts",
			addProductToCart: "cart/addProductToCart"
		})
		// addProductToCart(product) {
		// 	this.$store.dispatch("addProductToCart", product);
		// }
	}
};
</script>

<style></style>
