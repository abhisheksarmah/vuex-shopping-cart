<template>
	<div>
		<h1>Product Lists</h1>
		<ul>
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
import shop from "@/api/shop";
import store from "@/store/index";

export default {
	computed: {
		products() {
			return store.state.products;
		}
	},
	created() {
		shop.getProducts(products => store.commit("setProducts", products));
	}
};
</script>

<style></style>
