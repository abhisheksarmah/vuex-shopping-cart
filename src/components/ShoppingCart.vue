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
		...mapGetters({
			products: "cartProducts",
			total: "cartTotal"
		}),
		...mapState({
			checkoutStatus: state => state.cart.checkoutStatus
		})
	},
	methods: {
		...mapActions({
			checkOut: "checkOut"
		})
	}
};
</script>

<style lang="scss" scoped>
</style>