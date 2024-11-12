<template>
  <all-clothe :products="productList" v-if="productListStatus"> </all-clothe>
</template>

<script setup>
import AllClothe from "../clothe/AllClothe.vue";
import { onMounted, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const productListStatus = ref(false);
const productList = ref();

onMounted(async () => {
  try {
    await store.dispatch("product/getProductData");
    productListStatus.value = true;
    productList.value = store.state.product.products;
  } catch (error) {
    console.log(error);
  }
});
</script>
