<template>
  <li class="list-group-item">
    <p class="my-0 fs-5 fw-semibold">Change Password</p>
    <br />

    <!-- Old Password Input -->
    <div class="w-100">
      <label for="Password" class="w-100">
        <base-input id="oldPassword" class="w-100 opacity-75" type="password" placeholder="Enter your current password" identity="oldPassword" label="Old Password" v-model="oldPassword" />
      </label>
    </div>
    <br />

    <!-- New Password Input -->
    <div class="w-100">
      <label for="newPassword" class="w-100">
        <base-input id="newPassword" class="w-100 opacity-75" type="password" placeholder="Enter your new password" identity="newPassword" label="New Password" v-model="newPassword" @keyup="passwordCheck" />
        <p class="text-danger mt-1 fw-medium" style="font-size: 11px" v-if="showPasswordLengthError">The password must be at least 8 characters</p>
      </label>
    </div>
    <br />

    <!-- Confirmation Password Input -->
    <div class="w-100">
      <label for="confirmationPassword" class="w-100">
        <base-input
          id="confirmationPassword"
          class="w-100 opacity-75"
          type="password"
          placeholder="Confirm your new password"
          identity="confirmationPassword"
          label="Confirmation Password"
          v-model="confirmationPassword"
          @input="confirmationPasswordCheck"
        />
        <p class="text-danger mt-1 fw-medium" style="font-size: 11px" v-if="showConfirmPasswordError">The password confirmation does not match</p>
        <p class="text-success mt-1 fw-medium" style="font-size: 11px" v-if="showConfirmPasswordMatch">The password confirmation matches</p>
      </label>
    </div>
    <br />

    <!-- Update Button -->
    <BaseButton class="btn-success w-100 my-3" @click="handleChangePassword">Update Password</BaseButton>
  </li>
  <br>
  <br>
</template>

<script setup>
import BaseInput from "../ui/BaseInput.vue";
import BaseButton from "../ui/BaseButton.vue";
import { ref } from "vue";
import { useStore } from "vuex";

const store = useStore();

const oldPassword = ref("");
const newPassword = ref("");
const confirmationPassword = ref("");
const passwordError = ref("");

const showPasswordLengthError = ref(false);
const showConfirmPasswordError = ref(false);
const showConfirmPasswordMatch = ref(false);

const passwordCheck = () => {
  if (newPassword.value.length < 8) {
    showPasswordLengthError.value = true;
  } else {
    showPasswordLengthError.value = false;
  }
};

const confirmationPasswordCheck = () => {
  if (confirmationPassword.value === "") {
    showConfirmPasswordError.value = false;
    showConfirmPasswordMatch.value = false;
    return;
  }
  if (newPassword.value !== confirmationPassword.value) {
    showConfirmPasswordError.value = true;
    showConfirmPasswordMatch.value = false;
    return;
  }
  showConfirmPasswordError.value = false;
  showConfirmPasswordMatch.value = true;
};

const handleChangePassword = async () => {
  if (newPassword.value !== confirmationPassword.value) {
    passwordError.value = "New password and confirmation do not match.";
    return;
  }
  passwordError.value = "";
  try {
    await store.dispatch("auth/changePassword", {
      oldPassword: oldPassword.value,
      newPassword: newPassword.value,
    });
    alert("Password changed successfully.");
  } catch (error) {
    passwordError.value = "Failed to change password. Please check the old password.";
    console.error("Error changing password:", error);
  }
};
</script>
