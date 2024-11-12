<template>
  <li class="list-group-item">
    <p class="my-0 fs-5 fw-semibold">Edit Profile</p>
    <div class="my-4">
      <!-- Full Name -->
      <BaseInput type="text" identity="fullname" placeholder="Ex: Daniel" label="Fullname" v-model="userData.fullname"> </BaseInput>
    </div>
    <div class="my-4">
      <!-- User Name -->
      <BaseInput type="text" identity="username" placeholder="Your username" label="Username" v-model="userData.username"> </BaseInput>
    </div>
    <div class="my-4">
      <!-- Email -->
      <BaseInput type="email" identity="email" placeholder="Your email address" label="Email" v-model="userData.email"> </BaseInput>
    </div>
    <div class="my-4">
      <BaseInput type="file" identity="profileImage" label="Profile Photo" isImage="true" @input="checkImage">
        <div>
          <div class="border p-1 mt-2 rounded-circle">
            <img :src="userData.imageLink" class="rounded-circle" width="140" height="150" style="object-fit: cover" />
          </div>
          <div class="text-center" style="transform: translateY(-24px)">
            <i class="fa-solid fa-camera fs-5 p-2 rounded-circle bg-white"></i>
          </div>
        </div>
      </BaseInput>
    </div>
    <BaseButton class="btn-success w-100 my-3" @click="updateProfile">Edit</BaseButton>
  </li>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import BaseButton from "../ui/BaseButton.vue";
import BaseInput from "../ui/BaseInput.vue";

const store = useStore();
const userData = computed(() => store.state.auth.userLogin);

const checkImage = (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.addEventListener("load", () => {
    userData.value.imageLink = reader.result;
  });
};

const updateProfile = async () => {
  try {
    await store.dispatch("auth/updateUserData", { ...userData.value });
    alert("Profile updated successfully!");
  } catch (err) {
    console.error("Error updating profile:", err);
  }
};
</script>
