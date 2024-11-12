<template>
  <div class="confirmation-order-description container">
    <div v-if="cartItems.length === 0">
      <p>Your cart is empty.</p>
    </div>
    <div class="confirmation-content">
      <div class="order-summary-container">
        <div class="order-items-card">
          <p>Order Items</p>
          <ul class="confirmation-items-list">
            <li v-for="item in cartItems" :key="item.id" class="confirmation-item">
              <div class="item-image-container">
                <img :src="item.image" alt="Product image" class="item-image" />
              </div>
              <div class="item-details">
                <p class="item-name">
                  <b>{{ item.name }}</b>
                </p>
                <p class="item-quantity-size">{{ getOrderQuantity(item.id) }} | {{ item.size }}</p>
                <p class="item-price">Rp {{ item.price }}</p>
              </div>
            </li>
          </ul>
        </div>

        <div class="order-summary-card">
          <div class="card-header">
            <h3>Order Summary</h3>
          </div>
          <div class="card-body">
            <div class="summary-item">
              <span>Order</span>
              <span>Rp {{ totalPrice }}</span>
            </div>
            <div class="summary-item">
              <span>Protection Fee</span>
              <span>Rp 500000</span>
            </div>
            <div class="summary-item">
              <span>Shipping</span>
              <span>Rp 200000</span>
            </div>
          </div>
          <div class="card-footer">
            <div class="total-to-pay">
              <span>Total to Pay</span>
              <span>Rp {{ totalPrice }}</span>
            </div>
            <button class="order-now-button" @click="handleOrderNow">Order Now</button>
          </div>
        </div>
      </div>

      <div v-if="isModalVisible" class="modal-overlay">
        <div class="modal-content">
          <p>Thank you for shopping at Vintage. You can track your order in the Transaction History menu.</p>
          <button @click="continueShopping" class="btn-continue-shopping">Continue Shopping</button>
          <button @click="goToTransactionHistory" class="btn-transaction-history">Go to Transaction History</button>
        </div>
      </div>

      <div class="additional-cards">
        <div class="info-card location-card">
          <h5>PT. Timedoor Indonesia</h5>
          <p>Jl. Tukad Yeh Aya IX No.46, Renon, Denpasar Selatan, Kota Denpasar, Bali 80226</p>
        </div>
        <div class="info-card shipping-method-card" style="color: grey">
          <h5 style="color: black">Fedex Express Shipping</h5>
          <p>Rp20.000</p>
          <p>Standard Shipping (3-5 days)</p>
        </div>
        <div class="info-card payment-method-card">
          <h5>Payment Method</h5>
          <p>Credit Card (Visa)</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router"; // Import useRouter

const store = useStore();
const router = useRouter(); // Define router here
const props = defineProps({
  cartItems: Array,
});

const orderQuantities = ref({});
const isModalVisible = ref(false);

const totalItems = computed(() => {
  return Object.values(orderQuantities.value).reduce((total, qty) => total + qty, 0);
});

const totalPrice = computed(() => {
  return props.cartItems.reduce((total, item) => {
    const quantity = orderQuantities.value[item.id] || 1;
    const price = parseInt(item.price.replace(/\./g, "").replace(/Rp /g, ""));
    return total + (isNaN(price) ? 0 : price * quantity);
  }, 0);
});

const getOrderQuantity = (itemId) => {
  return orderQuantities.value[itemId] || 1;
};

onMounted(() => {
  props.cartItems.forEach((item) => {
    orderQuantities.value[item.id] = 1;
  });
});

const handleOrderNow = async () => {
  isModalVisible.value = true;
  await store.dispatch("product/updateCartStatusToPaid");
  console.log("Status updated to 'paid' for all items in cart");
};

const continueShopping = () => {
  isModalVisible.value = false;
  router.push("/");
};

const goToTransactionHistory = () => {
  console.log("Navigasi ke Riwayat Transaksi");
};
</script>

<style>
.confirmation-order-description {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.confirmation-content {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.order-summary-container {
  display: flex;
  gap: 20px;
}

.order-items-card,
.order-summary-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 15px;
}

.order-items-card {
  flex: 2;
}

.order-summary-card {
  flex: 1;
}

.order-items-card h3,
.order-summary-card h3 {
  margin-top: 0;
}

.confirmation-items-list {
  list-style-type: none;
  padding: 0;
}

.confirmation-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 15px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
}

.item-image-container {
  margin-right: 15px;
}

.item-image {
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 4px;
}

.item-details {
  flex-grow: 1;
}

.item-name {
  margin: 0;
}

.item-quantity-size {
  margin: 5px 0;
}

.item-price {
  margin: 5px 0;
}

.card-header {
  margin-bottom: 10px;
}

.card-body {
  margin-bottom: 10px;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
}

.card-footer {
  display: flex;
  flex-direction: column;
}

.total-to-pay {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.order-now-button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
}

.order-now-button:hover {
  background-color: #0056b3;
}

.additional-cards {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
}

.info-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 15px;
  width: 100%;
  min-width: 150px;
}

.info-card h3 {
  margin-top: 0;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}

.btn-continue-shopping,
.btn-transaction-history {
  margin: 10px;
  padding: 8px 16px;
  border: none;
  cursor: pointer;
}

.btn-continue-shopping {
  background-color: #28a745;
  color: white;
}

.btn-transaction-history {
  background-color: #007bff;
  color: white;
}
</style>
