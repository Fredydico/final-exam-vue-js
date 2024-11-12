<template>
  <div id="hero" class="row align-items-center container-fluid">
    <div class="col-sm-6 ms-5">
      <div class="card w-50">
        <div class="card-body">
          <h1 class="card-title">Ready to declutter your closet?</h1>
          <a href="" class="btn btn-success w-100 w-75 mt-5 fs-4">Shop Now</a>
        </div>
      </div>
    </div>
  </div>
  <product-list :products="productList" v-if="productListStatus"> </product-list>
  <brand-list></brand-list>
  <new-list :products="productList" v-if="productListStatus"> </new-list>
</template>

<script setup>
import ProductList from "../clothe/ProductList.vue";
import BrandList from "../clothe/BrandList.vue";
import NewList from "../clothe/NewList.vue";
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

<style>
#hero {
  background: url(/src/assets/image/store.jpg);
  background-size: 100%;
  width: 100%;
  height: 660px;
}
</style>
