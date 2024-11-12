<template>
  <div id="signUp" class="card w-25">
    <form class="card-body w-100" @submit.prevent="register">
      <div class="d-flex">
        <div class="w-100">
          <h3 class="card-title mt-2 mb-3">Sign Up</h3>
          <p class="card-text mt-2 mb-3 fs-5">Enter your details below</p>
        </div>
        <button type="button" class="btn-close mt-2 me-1 fs-5" aria-label="Close"></button>
      </div>
      <div class="w-100">
        <label for="Email" class="w-100"> <base-input id="kotak" class="w-100 opacity-75" type="text" placeholder="Enter your fullname" identity="fullname" label="Fullname" v-model="signupData.fullname" /></label>
      </div>
      <br />
      <div class="w-100">
        <label for="Password" class="w-100"> <base-input id="kotak" class="w-100 opacity-75" type="text" placeholder="Enter your username" identity="username" label="Username" v-model="signupData.username" /></label>
      </div>
      <br />
      <div class="w-100">
        <label for="Password" class="w-100"> <base-input id="kotak" class="w-100 opacity-75" type="email" placeholder="Enter your email" identity="email" label="Email" v-model="signupData.email" /></label>
      </div>
      <br />
      <div class="w-100">
        <label for="Password" class="w-100">
          <base-input id="kotak" class="w-100 opacity-75" type="password" placeholder="Enter your password" identity="password" label="Password" v-model="signupData.password" @keyup="passwordCheck" />
          <p class="text-danger mt-1 fw-medium" style="font-size: 11px" :style="{ display: passwordStatusDisplay }">The password field must be at least 8 characters</p>
        </label>
      </div>
      <br />
      <div class="w-100">
        <label for="Password" class="w-100">
          <base-input
            id="kotak"
            class="w-100 opacity-75"
            type="password"
            placeholder="Enter your password"
            identity="confirmationPassword"
            label="Confirmation Password"
            v-model="signupData.confirmationPassword"
            @input="confirmationPasswordCheck"
          />
          <p class="text-danger mt-1 fw-medium" style="font-size: 11px" :style="{ display: confirmPasswordDoesNotMatch }">The paswword confirmation does not match</p>
          <p class="text-success mt-1 fw-medium" style="font-size: 11px" :style="{ display: confirmPasswordDoesMatch }">The paswword confirmation does match</p>
        </label>
      </div>
      <br />
      <div id="text" class="d-flex">
        <input type="checkbox" name="agree" id="agree" class="ms-3 me-3" />
        <p class="tulisan">By clicking sign up, I hereby agree and consent to <span>Term & Condition</span>: I Confirm that I have read <span>Privacy Policy.</span></p>
      </div>
      <base-button class="btn btn-success w-100 fs-5">Sign Up</base-button>
    </form>
  </div>
</template>

<script setup>
import BaseInput from "../ui/BaseInput.vue";
import BaseButton from "../ui/BaseButton.vue";
import { reactive, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const signupData = reactive({
  fullname: "",
  username: "",
  email: "",
  password: "",
  confirmationPassword: "",
  isLogin: false,
});

const passwordStatusDisplay = ref("none");
const confirmPasswordDoesNotMatch = ref("none");
const confirmPasswordDoesMatch = ref("none");

const passwordCheck = () => {
  if (signupData.password.length < 8) {
    passwordStatusDisplay.value = "block";
  } else {
    passwordStatusDisplay.value = "none";
  }
};

const confirmationPasswordCheck = () => {
  if (signupData.confirmationPassword === "") {
    confirmPasswordDoesNotMatch.value = "none";
    confirmPasswordDoesMatch.value = "none";
    return;
  }
  if (signupData.password !== signupData.confirmationPassword) {
    confirmPasswordDoesNotMatch.value = "block";
    confirmPasswordDoesMatch.value = "none";
    return;
  }
  confirmPasswordDoesNotMatch.value = "none";
  confirmPasswordDoesMatch.value = "block";
};

const register = async () => {
  if (signupData.password !== signupData.confirmationPassword || signupData.password.length < 8) {
    signupData.confirmationPassword = "";
    signupData.password = "";
    confirmPasswordDoesNotMatch.value = "none";
    confirmPasswordDoesMatch.value = "none";
  } else {
    await store.dispatch("auth/getRegisterData", signupData);
    router.push("/");
  }
};
</script>

<style>
#signUp {
  margin: 82px auto;
}

#agree {
  margin-top: -40px;
  width: 30px;
}

.tulisan span {
  color: #0dac72;
  font-weight: 500;
}
</style>
