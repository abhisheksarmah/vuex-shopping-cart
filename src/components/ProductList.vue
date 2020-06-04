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
				{{ product.title }} - {{ product.price }}
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
			return this.$store.getters.availableProudcts;
		}
	},
	created() {
		this.loading = true;
		this.$store
			.dispatch("fetchProducts")
			.then(() => (this.loading = false));
	}
};
</script>

<style></style>
