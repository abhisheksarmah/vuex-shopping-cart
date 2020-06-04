<template>
	<div>
		<h1>Shopping Cart</h1>
		<ul>
			<li
				v-for="product in products"
				:key="product.id"
			>
				{{product.title}} - {{product.price | currency}} - {{product.quantity}}
			</li>
		</ul>
		<p>Total: {{total | currency}}</p>
		<button
			@click="checkOut"
			:disabled="!products.length > 0"
		>Checkout now</button>
		<p v-if="checkoutStatus">{{checkoutStatus}}</p>
	</div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
	// computed: {
	// 	products() {
	// 		return this.$store.getters.cartProducts;
	// 	},
	// 	total() {
	// 		return this.$store.getters.cartTotal;
	// 	}
	// }
	computed: {
		// ...mapGetters({
		// 	products: "cart/cartProducts",
		// 	total: "cart/cartTotal"
		// }),

		/**
		 * above gets verbose when we have lots of getters,
		 * fortunately, we can pass module namespace as the first argument to
		 */
		...mapGetters("cart", {
			products: "cartProducts",
			total: "cartTotal"
		}),
		/**
		 * we can also combine getters from different module by using a different mapGetters with passing its namespace as argument
		 */
		// ...mapGetters("product", {
		// 	productIsInStock: "productIsInStock"
		// }),
		/**
		 * The similarly same applies for the mapActions, mapState, mapMutations
		 */
		...mapState("cart", {
			checkoutStatus: state => state.checkoutStatus
		})
	},
	methods: {
		...mapActions("cart", ["checkOut"])
	}
};
</script>

<style lang="scss" scoped>
</style>