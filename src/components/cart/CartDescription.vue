<template>
  <div class="cart-page container">
    <!-- <h1>Your Cart</h1> -->
    <div v-if="cartItems.length === 0" class="empty-cart">
      <div class="container align-items-center">
        <img src="" alt="" width="200px" />
        <H1>Your cart still empty.</H1>
        <p>
          Find your favorite items and add to cart<br />
          before check out.
        </p>
        <button class="checkout-button" style="background-color: #0d6a6e">Find Products</button>
      </div>
    </div>
    <div v-else class="cart-container">
      <div class="cart-items">
        <ul>
          <li v-for="item in cartItems" :key="item.id" class="cart-item">
            <div class="item-image-container">
              <img :src="item.image" alt="Product image" class="item-image" />
              <button class="btn btn-danger remove-button" @click="removeItem(item.id)">Remove</button>
            </div>
            <div class="item-details">
              <p>
                <b>{{ item.name }}</b>
              </p>
              <p>{{ item.quantity }}/{{ item.size }}</p>
              <p>Rp {{ item.price }}</p>
              <div class="quantity-selector">
                <button @click="decreaseQuantity(item)">-</button>
                <span>{{ getOrderQuantity(item.id) }}</span>
                <button @click="increaseQuantity(item)">+</button>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div class="cart-summary">
        <div class="card-body">
          <div class="summary-row">
            <div class="summary-left">
              <p>Order Summary</p>
              <p>{{ totalItems }} items</p>
              <p class="shipping-note">Not include shipping fee</p>
            </div>
            <div class="summary-right">
              <p>
                <b>{{ totalPrice }}</b>
              </p>
            </div>
          </div>
          <hr />
        </div>
        <div class="card-footer">
          <button class="checkout-button" @click="goToConfirmationOrder">Checkout ({{ totalItems }})</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed, ref, resolveComponent } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();
const cartItems = computed(() => store.state.product.cartItems);

defineProps({
  products: Array,
});

const removeItem = (itemId) => {
  store.dispatch("product/removeItemFromCart", itemId);
};

const orderQuantities = ref({});

const totalItems = computed(() => {
  return Object.values(orderQuantities.value).reduce((total, qty) => total + qty, 0);
});

const goToConfirmationOrder = () => {
  router.push({ name: "ConfirmationOrder" });
};

const formatCurrency = (value) => {
  return "Rp " + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const totalPrice = computed(() => {
  const total = cartItems.value.reduce((total, item) => {
    const quantity = orderQuantities.value[item.id] || 1;
    const price = parseInt(item.price.replace(/\./g, "").replace(/Rp /g, ""));
    if (isNaN(price)) {
      return total;
    }
    return total + price * quantity;
  }, 0);

  return formatCurrency(total);
});

const getOrderQuantity = (itemId) => {
  return orderQuantities.value[itemId] || 1;
};

const increaseQuantity = (item) => {
  const currentQuantity = orderQuantities.value[item.id] || 1;
  if (currentQuantity < item.quantity) {
    orderQuantities.value[item.id] = currentQuantity + 1;
  }
};

const decreaseQuantity = (item) => {
  const currentQuantity = orderQuantities.value[item.id] || 1;
  if (currentQuantity > 1) {
    orderQuantities.value[item.id] = currentQuantity - 1;
  }
};

onMounted(async () => {
  await store.dispatch("product/getCartData");
  cartItems.value.forEach((item) => {
    orderQuantities.value[item.id] = 1;
  });
});
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: auto;
  padding: 20px;
}

h1,
p,
.checkout-button {
  text-align: center;
  margin: 10px 0;
}

.checkout-button {
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
}

.checkout-button:hover {
  background-color: #45a049;
}

.cart-page {
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .cart-container {
    display: flex;
    gap: 20px;
    width: 100%;
    max-width: 1200px;
    margin-top: 20px;
  }
  
  .cart-items {
    flex: 2;
    background: #ffffff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .cart-item {
    display: flex;
    gap: 15px;
    margin-bottom: 15px;
    padding-bottom: 15px;
    border-bottom: 1px solid #e0e0e0;
  }
  
  .item-image-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .item-image {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 5px;
  }
  
  .remove-button {
    margin-top: 8px;
    padding: 5px 10px;
    font-size: 14px;
  }
  
  .item-details h2 {
    font-size: 18px;
    margin: 0;
  }
  
  .cart-summary {
    flex: 0 0 300px;
    position: sticky;
    top: 20px;
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    height: fit-content;
  }
  
  .card-body {
    padding: 20px;
    margin-bottom: 0;
  }
  
  .summary-row {
    display: flex;
    justify-content: space-between;
  }
  
  .summary-left h2,
  .summary-left p,
  .summary-right p {
    margin: 5px 0; 
  }
  
  .shipping-note {
    font-size: 14px;
    color: #666;
  }
  
  .card-body hr {
    margin: 10px 0;
    border: 0;
    border-top: 1px solid #e0e0e0;
  }
  
  .card-footer {
    padding: 10px 15px;
    text-align: center;
    border-top: 1px solid #e0e0e0;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
  
  .checkout-button {
    padding: 10px 20px;
    font-size: 18px;
    background-color: #0d6a6e;
    color: #ffffff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .checkout-button:hover {
    background-color: #0056b3;
  }
  
  .quantity-selector {
    display: flex;
    align-items: center;
    margin-top: 10px;
  }
  
  .quantity-selector button {
    background-color: #0d6a6e;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 5px;
    width: 30px;
    height: 30px;
    cursor: pointer;
    transition: background-color 0.3s;
    font-size: 16px;
  }
  
  .quantity-selector button:hover {
    background-color: #0056b3;
  }
  
  .quantity-value {
    margin-left: 10px;
    font-size: 1em;
    color: rgba(0, 0, 0, 0.7);
    text-align: center;
    width: 40px;
  }
</style>
