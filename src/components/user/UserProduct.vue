<template>
  <ul class="list-group">
    <li class="list-group-item">
      <div class="d-flex flex-sm-row flex-column justify-content-between align-items-sm-center">
        <div class="mb-3 mb-sm-0">
          <p class="my-0 fs-4 fw-semibold">My Product</p>
          <p class="my-0 text-secondary">Add your original product here</p>
        </div>
        <div>
          <button class="btn btn-success px-3 py-2 rounded-pill" @click="$router.push('/new-product')"><i class="fa-solid fa-circle-plus pe-2"></i>Add Product</button>
        </div>
      </div>
    </li>
    <li class="list-group-item" id="container">
      <p class="mt-2 mb-4 fs-5 fw-semibold">Product</p>
      <div class="row">
        <!-- User Product Card -->
        <user-product-card v-for="product in products" :key="product.id" :product="product" :buttonName="['Delete', 'Edit']" @btnRemove="deleteProduct(product.id)" @btnEdit="editProduct(product.id)">
          <p>{{ new Date(product.createdAt).toDateString() }}</p>
        </user-product-card>
      </div>
    </li>
  </ul>
  <br />
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import UserProductCard from "./UserProductCard.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useStore();

const products = computed(() => {
  const allProduct = store.state.product.products;
  const userId = store.state.auth.userLogin.userId;
  return allProduct.filter((product) => product.userId === userId);
});

const deleteProduct = async (id) => {
  await store.dispatch("product/deleteProduct", id);
};

const editProduct = async (id) => {
  await store.dispatch("product/getProductDetail", id);
  router.push(`/product/edit/${id}`);
};
</script>
