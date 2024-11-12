<template>
  <div id="login" class="card w-25">
    <form class="card-body w-100" @submit.prevent="login">
      <div class="d-flex">
        <div class="w-100">
          <h3 class="card-title mt-2 mb-3">Login</h3>
          <p class="card-text mt-2 mb-3 fs-5">Enter your details below</p>
        </div>
        <button type="button" class="btn-close mt-2 me-1 fs-5" aria-label="Close"></button>
      </div>
      <div class="w-100">
        <label for="Email" class="w-100"> <base-input id="kotak" class="w-100 opacity-75" type="email" placeholder="Enter your email" identity="email" label="Email" v-model="loginData.email"/></label>
      </div>
      <br />
      <div class="w-100">
        <label for="Password" class="w-100"> <base-input id="kotak" class="w-100 opacity-75" type="password" placeholder="Enter your password" identity="password" label="Password" v-model="loginData.password"/></label>
      </div>
      <br />
      <base-button class="btn btn-success w-100 fs-5">Continue</base-button>
    </form>
  </div>
</template>

<script setup>
import BaseInput from "../ui/BaseInput.vue";
import BaseButton from "../ui/BaseButton.vue";
import { reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const login = async () => {
  await store.dispatch("auth/getLoginData", loginData);
  router.push("/");
};

const loginData = reactive({
  email: "",
  password: "",
  isLogin: true,
})
</script>

<style>
#login {
  margin: 82px auto;
}

#kotak {
  font-size: 14px;
}
</style>
