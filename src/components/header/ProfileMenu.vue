<template>
  <div class="header__signup col-8 col-sm-4 fw-semibold d-flex justify-content-evenly align-items-center text-decoration-none" style="text-align: right">
    <ul class="navbar-nav">
      <div class="d-flex align-items-center">
        <div class="cart-menu me-5 d-flex">
          <i class="fa-solid fa-cart-shopping me-4 fs-5" @click="goToCart"></i>
          <i class="fa-solid fa-heart fs-5" @click="goToFavorites"></i>
        </div>
        <div class="profile-menu d-flex align-items-center me-5">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
              <img :src="userData.imageLink" alt="image" class="rounded-circle me-3" v-if="userData.imageLink" width="40" height="40" />
              <i v-else class="fa-solid fa-user me-3 border border-dark border-1 rounded-circle p-2"></i>
            </a>
            <ul class="dropdown-menu">
              <router-link to="/user/personal-info" class="dropdown-item"> <i class="fa-solid fa-user me-2"></i> My Profile </router-link>
              <router-link to="/product/cart" class="dropdown-item"> <i class="fa-solid fa-scroll me-1"></i> Order </router-link>
              <li>
                <hr class="dropdown-divider" />
              </li>
              <li class="text-danger dropdown-item cursor-pointer" @click="openModal"><i class="fa-solid fa-arrow-right-from-bracket me-2"></i> Logout</li>
            </ul>
          </li>
        </div>
      </div>
    </ul>
  </div>

  <!-- Modal -->
  <div v-if="showModal" class="modal custom-modal-overlay">
    <div class="modal-dialog w-100">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Logout</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body ms-4">
          <p>Are you sure you want to logout?</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="closeModal">Close</button>
          <button type="button" class="btn btn-danger" @click="logout">Logout</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Overlay to darken the background */
.custom-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.dropdown-menu .dropdown-item {
  cursor: pointer;
}

.dropdown-menu {
  position: absolute;
  z-index: 1000;
}

/* Animation for modal */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();
const showModal = ref(false);

const userData = computed(() => {
  return store.state.auth.userLogin;
});

const logout = () => {
  store.commit("auth/setUserLogout");
  router.push("/");
};

const openModal = () => {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const goToCart = () => {
  router.push("/user/cart");
};

const goToFavorites = () => {
  router.push("/favorites");
};
</script>
