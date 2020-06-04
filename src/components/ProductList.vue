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
export default {
	data() {
		return {
			loading: false
		};
	},
	computed: {
		products() {
			return this.$store.state.products;
		},

		productIsInStock() {
			return this.$store.getters.productIsInStock;
		}
	},
	created() {
		this.loading = true;
		this.$store
			.dispatch("fetchProducts")
			.then(() => (this.loading = false));
	},
	methods: {
		addProductToCart(product) {
			this.$store.dispatch("addProductToCart", product);
		}
	}
};
</script>

<style></style>
