<template>
  <li class="list-group-item">
    <form @submit.prevent="addNewProduct">
      <!-- General Information Start -->
      <div>
        <p class="my-3 fs-5 fw-semibold">General Information</p>
        <div>
          <!-- Image Start -->
          <div class="my-4">
            <BaseInput type="file" identity="profileImage" label="Profile Photo" isImage="true" @input="checkImage">
              <div>
                <div class="border p-1 mt-2 rounded-circle">
                  <img :src="productData.imageLink" class="rounded-circle" width="140" height="150" style="object-fit: cover" />
                </div>
                <div class="text-center" style="transform: translateY(-24px)">
                  <i class="fa-solid fa-camera fs-5 p-2 rounded-circle bg-white"></i>
                </div>
              </div>
            </BaseInput>
          </div>
          <!-- Image End -->

          <!-- Product Name Start -->
          <div class="mb-3"><base-input type="text" identity="productName" placeholder="Product Name" label="Product Name" v-model="productData.name"></base-input></div>
          <!-- Product Name  End -->

          <!-- Product Description Start -->
          <div class="mb-3"><base-input type="text" identity="productDescription" label="Description" placeholder="Share story behind product and what is make it special" v-model="productData.description"></base-input></div>
          <!-- Product Description End -->

          <!-- Product Cateogry Start -->
          <div class="mb-3"><base-input type="text" identity="productCategory" placeholder="Enter product category" label="Product Category" v-model="productData.category"></base-input></div>
          <!-- Product Category End -->

          <!-- Product Color Start -->
          <div class="mb-3"><base-input type="text" identity="productColor" placeholder="Enter product color" label="Color" v-model="productData.color"></base-input></div>
          <!-- Product Color End -->

          <!-- Product Condition Start -->
          <div class="mb-3"><base-input type="text" identity="productCondition" placeholder="Enter product condition" label="Condition" v-model="productData.condition"></base-input></div>
          <!-- Product Condition End -->

          <!-- Product City Start -->
          <div class="mb-3"><base-input type="text" identity="productCity" placeholder="Enter product city" label="City" v-model="productData.city"></base-input></div>
          <!-- Product City End -->

          <!-- Product Size Start -->
          <div class="mb-3"><base-input type="text" identity="productSize" placeholder="Enter product size" label="Size" v-model="productData.size"></base-input></div>
          <!-- Product Size End -->

          <!-- Product Price Start -->
          <div class="mb-3"><base-input type="text" identity="productPrice" placeholder="Enter product price" label="Price" v-model="productData.price"></base-input></div>
          <!-- Product Price End -->

          <!-- Product Shipping Start -->
          <div class="mb-3"><base-input type="text" identity="productShipping" placeholder="Enter product shipping" label="Shipping" v-model="productData.shipping"></base-input></div>
          <!-- Product Shipping End -->

          <!-- Product Quantity Start -->
          <div class="mb-3"><base-input type="text" identity="productQuantity" placeholder="Enter product quantity" label="Quantity" v-model="productData.quantity"></base-input></div>
          <!-- Product Quantity End -->
        </div>
      </div>
      <!-- General Information End -->

      <!-- Form Button Start -->
      <div class="border-top py-3 d-flex my-4 justify-content-end">
        <!-- Cancel Button Start -->
        <base-button class="btn btn-outline-success px-3 py-2 ms-1">Cancel</base-button>
        <!-- Cancel Button End -->

        <!-- Submit Button Start -->
        <base-button class="btn btn-success px-3 py-2 ms-1">Submit</base-button>
        <!-- Submit Button End -->
      </div>
      <!-- Form Button End -->
    </form>
  </li>
</template>

<script setup>
import BaseButton from "../ui/BaseButton.vue";
import BaseInput from "../ui/BaseInput.vue";
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";

const productData = ref({
  imagelink: "",
  name: "",
  description: "",
  category: "",
  color: "",
  condition: "",
  city: "",
  size: "",
  price: "",
  shipping: "",
  quantity: "",
});

const checkImage = (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.addEventListener("load", () => {
    productData.value.imageLink = reader.result;
  });
};

const props = defineProps({
  isEdit: { type: Boolean, default: false },
  detailData: { type: Object, default: () => ({}) },
});

onMounted(() => {
  if (props.isEdit) {
    productData.value = store.state.product.productDetail;
  }
});

const store = useStore();
const router = useRouter();
const route = useRoute();

const addNewProduct = async () => {
  if (props.isEdit) {
    await store.dispatch("product/updateProduct", {
      id: route.params.id,
      newProduct: productData.value,
    });
    router.push("/user/user-product");
  } else {
    await store.dispatch("product/addNewProduct", productData.value);
    router.push("/user/user-product");
  }
};
</script>
