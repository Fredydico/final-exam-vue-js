<template>
    <div class="col-lg-3 mb-4">
      <ul class="list-group">
        <li class="list-group-item">
          <div class="d-flex align-items-center">
            <img :src="userData.imageLink" alt="Profile" width="36" height="36" class="rounded-circle" style="object-fit: cover" />
            <div class="ps-3">
              <p class="my-0 fs-5 fw-semibold">{{ userData.fullname }}</p>
              <p class="my-0 fs-6 text-secondary">{{ userData.email }}</p>
            </div>
          </div>
        </li>
        <li class="list-group-item user-menu" @click="menuClicked('personal-info')"><i class="fa-solid fa-user pe-2"></i>Profile Detail</li>
        <li class="list-group-item user-menu" @click="menuClicked('change-password')"><i class="fa-solid fa-key pe-2"></i>Change Password</li>
        <li class="list-group-item user-menu" @click="menuClicked('transaction-history')"><i class="fa-solid fa-receipt pe-2"></i>Transaction History</li>
        <li class="list-group-item user-menu" @click="menuClicked('user-product')"><i class="fa-brands fa-product-hunt pe-2"></i>My Product</li>
      </ul>
    </div>
  </template>
  
  <script setup>
      import { computed } from 'vue';
      import { useStore } from 'vuex';
  
      const emit = defineEmits(['changeComponent']);
      const menuClicked = option => {
          emit('changeComponent', option);
      }
      
      const store = useStore();
      const userData = computed(() => {
          return store.state.auth.userLogin
      })
  </script>
  
  <style scoped>
  .user-menu:hover {
    cursor: pointer;
  }
  
  .active-color {
    color: #4c4ddc;
  }
  
  .inactive-color {
    color: #404040;
  }
  </style>
  