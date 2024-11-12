import axios from "axios";

export default {
  namespaced: true,
  state() {
    return {
      products: [],
      productDetail: {},
      cartItems: [],
      paidCartItems: [],
    };
  },
  getters: {},
  mutations: {
    setProductData(state, payload) {
      state.products = payload;
    },
    setProductDetail(state, payload) {
      state.productDetail = payload;
    },
    setNewProduct(state, payload) {
      state.products.push(payload);
    },
    setCartData(state, payload) {
      state.cartItems = payload;
    },
    removeItemFromCart(state, itemId) {
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    setPaidCartItems(state, items) {
      state.paidCartItems = items;
    },
  },
  actions: {
    async getProductData({ commit }) {
      try {
        const { data } = await axios.get("https://market-place-54d01-default-rtdb.firebaseio.com/products.json");

        const arr = [];
        for (let key in data) {
          arr.push({ id: key, ...data[key] });
        }

        commit("setProductData", arr);
      } catch (err) {
        console.log(err);
      }
    },
    async getProductDetail({ commit }, payload) {
      try {
        const { data } = await axios.get(`https://market-place-54d01-default-rtdb.firebaseio.com/products/${payload}.json`);
        commit("setProductDetail", data);
      } catch (err) {}
    },
    async addNewProduct({ commit, rootState }, payload) {
      const newData = {
        ...payload,
        username: rootState.auth.userLogin.username,
        createdAt: Date.now(),
        like: ["null"],
        userId: rootState.auth.userLogin.userId,
      };
      try {
        const { data } = await axios.post(`https://market-place-54d01-default-rtdb.firebaseio.com/products.json?auth=${rootState.auth.token}`, newData);
        commit("setNewProduct", { id: data.name, ...newData });
      } catch (err) {
        console.log(err);
      }
    },
    async deleteProduct({ dispatch, rootState }, payload) {
      try {
        const { data } = await axios.delete(`https://market-place-54d01-default-rtdb.firebaseio.com/products/${payload}.json?auth=${rootState.auth.token}`);
        await dispatch("getProductData");
      } catch (err) {
        console.log(err);
      }
    },
    async updateProduct({ dispatch, rootState }, { id, newProduct }) {
      try {
        const { data } = await axios.put(`https://market-place-54d01-default-rtdb.firebaseio.com/products/${id}.json?auth=${rootState.auth.token}`, newProduct);
        await dispatch("getProductData");
      } catch (err) {
        console.log(err);
      }
    },

    async addToCart({ rootState }, productDetail) {
      const cartItem = {
        id: productDetail.id,
        image: productDetail.image,
        name: productDetail.name,
        price: productDetail.price,
        size: productDetail.size,
        quantity: productDetail.quantity,
        condition: productDetail.condition,
        city: productDetail.city,
        description: productDetail.description,
        status: "no paid",
        userId: rootState.auth.userLogin.userId,
        createdAt: Date.now(),
      };

      try {
        await axios.post(`https://market-place-54d01-default-rtdb.firebaseio.com/carts.json?auth=${rootState.auth.token}`, cartItem);
        console.log("Item added to cart:", cartItem);
      } catch (err) {
        console.log("Error adding item to cart:", err);
      }
    },
    async getCartData({ commit, rootState }) {
      try {
        const { data } = await axios.get(`https://market-place-54d01-default-rtdb.firebaseio.com/carts.json?auth=${rootState.auth.token}`);
        const cartItems = [];
        for (let key in data) {
          if (data[key].status === "no paid" && data[key].userId === rootState.auth.userLogin.userId) {
            cartItems.push({ id: key, ...data[key] });
          }
        }
        commit("setCartData", cartItems);
      } catch (err) {
        console.log(err);
      }
    },
    async removeItemFromCart({ commit, rootState }, itemId) {
      try {
        await axios.delete(`https://market-place-54d01-default-rtdb.firebaseio.com/carts/${itemId}.json?auth=${rootState.auth.token}`);
        commit("removeItemFromCart", itemId);
      } catch (err) {
        console.log("Error removing item from cart:", err);
      }
    },
    async updateCartStatusToPaid({ commit, state, dispatch, rootState }) {
      try {
        const updates = state.cartItems.map(async (item) => {
          if (item.status === "no paid") {
            console.log(`Updating item ${item.id} status to 'paid'`);
            await axios.patch(`https://market-place-54d01-default-rtdb.firebaseio.com/carts/${item.id}.json?auth=${rootState.auth.token}`, { status: "paid" });
          }
        });
        await Promise.all(updates);
        commit("setCartData", []);
        await dispatch("getCartData");
        console.log("Status updated to 'paid' for all items in cart");
      } catch (err) {
        console.log("Error updating cart status to 'paid':", err);
      }
    },
    async fetchPaidCartItems({ commit, rootState }) {
      try {
        const { data } = await axios.get(`https://market-place-54d01-default-rtdb.firebaseio.com/carts.json?auth=${rootState.auth.token}`);
        const paidCartItems = [];
        for (let key in data) {
          if (data[key].status === "paid" && data[key].userId === rootState.auth.userLogin.userId) {
            paidCartItems.push({ id: key, ...data[key] });
          }
        }
        commit("setPaidCartItems", paidCartItems); // Assuming you have a mutation for this
      } catch (err) {
        console.log("Error fetching paid cart items:", err);
      }
    },
  },
};
