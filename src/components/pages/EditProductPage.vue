<template>
    <main>
      <div class="container-md my-5 py-5">
        <product-form 
        v-if="detailData && !isLoading" 
        :isEdit="true"></product-form>
      </div>
    </main>
  </template>
  
  <script setup>
      import ProductForm from '../productForm/ProductForm.vue';
      import { useStore } from 'vuex';
      import { useRoute } from 'vue-router';
      import { onMounted, ref } from 'vue';
  
      const store = useStore()
      const route = useRoute()
      const detailData = ref()
      const isLoading = ref(false)
  
      onMounted(async () => {
          isLoading.value = true
          try {
              // Get id dari dynamic route
              const productId = route.params.id;
              // Fetch product detail dari store vuex
              await store.dispatch("product/getProductDetail", productId);
              // Store data ke dalam productData
              // console.log(productId);
              detailData.value = store.state.product.productDetail;
              // console.log(detailData.value);
              // console.log(store.state);
              isLoading.value = false;
          } catch (err) {
              console.error(err);
          }
      })
      
  </script>
  