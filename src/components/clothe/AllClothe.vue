<template>
  <div class="container mt-5">
    <div id="judul" class="d-flex w-100 justify-content-between align-items-center">
      <div class="section-title">All Items</div>
    </div>
    <div class="row">
      <div v-for="products in products" :key="index" class="col-md-2 product-card">
        <router-link :to="`/detail/${products.id}`" class="text-decoration-none">
          <img alt="Vintage chicago cubs white crewneck" height="200" :src="products.image" width="200" />
          <div class="align-content-start mt-4">
            <div class="price">{{ products.price }}</div>
            <div class="description">{{ products.name }}</div>
          </div>
          <div class="details">
            <div class="d-flex justify-content-between ms-2 me-3">
              <div>{{ products.quantity }} / {{ products.size }}</div>
              <div>
                <i class="fa-regular fa-heart"></i>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';

defineProps({
  products: Array,
});
</script>

<style>
#judul {
  height: 50px;
  margin-top: 10px;
  margin-bottom: 10px;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
}

.product-card {
  margin-bottom: 1rem;
}

.product-card img {
  width: 100%;
  height: auto;
}

.product-card .price {
  color: #56c1a2;
  font-weight: bold;
  font-size: 17px;
}

.product-card .description {
  color: #666;
  font-size: 14px;
  height: 35px;
}

.product-card .details {
  color: #999;
  margin-top: 25px;
}

#linkSeeAll {
  color: #56c1a2;
  font-size: 14px;
}

.see-all {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background-color: #e0f7fa;
  border: 1px solid #56c1a2;
  border-radius: 5px;
  color: #56c1a2;
  font-weight: bold;
  font-size: 15px;
  height: 100%;
}
</style>
