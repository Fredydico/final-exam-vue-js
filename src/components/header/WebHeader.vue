<template>
  <nav class="navbar bg-body-tertiary">
    <div class="container-fluid justify-content-around">
      <router-link to="/" class="navbar-brand fs-1">
        <img src="/src/assets/image/Logo Horizontal.png" alt="Bootstrap" height="50px" />
      </router-link>
      <form class="d-flex w-50" role="search">
        <input class="form-control me-2 fs-5 col-12" type="search" placeholder="Search for items" aria-label="Search" />
      </form>
      <div class="d-flex justify-content-between">
        <component :is="component[menuComponent]"></component>
        <dropdown-menu></dropdown-menu>
      </div>
    </div>
  </nav>
</template>

<script setup>
import AuthMenu from "./AuthMenu.vue";
import ProfileMenu from "./ProfileMenu.vue";
import DropdownMenu from "./DropdownMenu.vue";
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";

const store = useStore();
const menuComponent = ref("auth-menu");

const component = {
  "auth-menu": AuthMenu,
  "profile-menu": ProfileMenu,
};

const getToken = computed(() => {
  return store.state.auth.token;
});
if (!getToken.value) {
  menuComponent.value = "auth-menu";
} else {
  menuComponent.value = "profile-menu";
}

watch(getToken, (newValue) => {
  if (!newValue) {
    menuComponent.value = "auth-menu";
  } else {
    menuComponent.value = "profile-menu";
  }
});
</script>
