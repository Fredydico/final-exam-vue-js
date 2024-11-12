<template>
  <cart-description :products="productList"></cart-description>
  <all-clothe :products="productList" v-if="productListStatus"> </all-clothe>
</template>

<script setup>
import CartDescription from "../cart/CartDescription.vue";
import AllClothe from "../clothe/AllClothe.vue";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const productList = ref([]);
const route = useRoute();
const productListStatus = ref(false);

onMounted(async () => {
  try {
    await store.dispatch("product/getProductData");
    productListStatus.value = true;
    productList.value = store.state.product.products;
  } catch (error) {
    console.log(error);
  }
});

onMounted(async () => {
  try {
    await store.dispatch("product/getProductData");
    await store.dispatch("product/getProductDetail", route.params.id);
    productList.value = store.state.product.products;
    console.log(productList.value);
  } catch (error) {
    console.log(error);
  }
});
</script>
