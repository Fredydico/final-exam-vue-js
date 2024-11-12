import axios from "axios";
import Cookies from "js-cookie";

export default {
  namespaced: true,
  state() {
    return {
      token: null,
      tokenExpirationDate: null,
      userLogin: {},
      firebaseKey: null,
      isLogin: false,
    };
  },
  mutations: {
    setToken(state, { idToken, expiresIn }) {
      state.token = idToken;
      state.tokenExpirationDate = expiresIn;
      Cookies.set("tokenExpirationDate", expiresIn);
      Cookies.set("jwt", idToken);
    },
    setUserLogin(state, { userData, firebaseKey, loginStatus }) {
      state.userLogin = userData;
      state.firebaseKey = firebaseKey;
      state.isLogin = loginStatus;
    },
    setUserLogout(state) {
      state.token = null;
      state.userLogin = {};
      state.firebaseKey = null;
      state.isLogin = false;
      state.tokenExpirationDate = null;
      Cookies.remove("jwt");
      Cookies.remove("tokenExpirationDate");
      Cookies.remove("UID");
    },
  },
  actions: {
    async getRegisterData({ commit, dispatch }, payload) {
      const APIkey = "AIzaSyDeqmuHpzUueXHe2L-ZX6PeQtEkB93CWyo";
      const authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${APIkey}`;

      try {
        const { data } = await axios.post(authUrl, {
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        });

        commit("setToken", {
          idToken: data.idToken,
          expiresIn: new Date().getTime() + Number.parseInt(data.expiresIn) * 1000,
        });

        const newUserData = {
          userId: data.localId,
          fullname: payload.fullname,
          username: payload.username,
          email: payload.email,
          imageLink: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        };

        Cookies.set("UID", newUserData.userId);
        await dispatch("addNewUser", newUserData);
      } catch (err) {
        console.error("Error registering:", err.response?.data?.error?.message || err.message);
      }
    },

    async addNewUser({ commit, state }, payload) {
      try {
        const { data } = await axios.post(`https://market-place-54d01-default-rtdb.firebaseio.com/users.json?auth=${state.token}`, payload);
        commit("setUserLogin", {
          userData: payload,
          firebaseKey: data.name,
          loginStatus: true,
        });
      } catch (err) {
        console.error("Error adding new user:", err);
      }
    },

    async getLoginData({ commit, dispatch }, payload) {
      const APIkey = "AIzaSyDeqmuHpzUueXHe2L-ZX6PeQtEkB93CWyo";
      const authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${APIkey}`;

      try {
        const { data } = await axios.post(authUrl, {
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        });

        commit("setToken", {
          idToken: data.idToken,
          expiresIn: new Date().getTime() + Number.parseInt(data.expiresIn) * 1000,
        });

        Cookies.set("UID", data.localId);
        await dispatch("getUser", data.localId);
      } catch (err) {
        console.error("Error logging in:", err.response?.data?.error?.message || err.message);
      }
    },

    async getUser({ commit, state }, userId) {
      try {
        const { data } = await axios.get(`https://market-place-54d01-default-rtdb.firebaseio.com/users.json?auth=${state.token}`);
        for (let key in data) {
          if (data[key].userId === userId) {
            commit("setUserLogin", {
              userData: data[key],
              firebaseKey: key,
              loginStatus: true,
            });
            return;
          }
        }
        console.error("User not found in database.");
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    },

    async updateUserData({ state, commit }, updatedData) {
      if (!state.firebaseKey) {
        throw new Error("User ID not found for updating data.");
      }
      try {
        if (updatedData.email && updatedData.email !== state.userLogin.email) {
          const auth = getAuth();
          const user = auth.currentUser;
          if (user) {
            await updateEmail(user, updatedData.email);
          } else {
            throw new Error("User not authenticated");
          }
        }
        await axios.patch(`https://market-place-54d01-default-rtdb.firebaseio.com/users/${state.firebaseKey}.json?auth=${state.token}`, updatedData);
        commit("setUserLogin", {
          userData: { ...state.userLogin, ...updatedData },
          firebaseKey: state.firebaseKey,
          loginStatus: true,
        });
      } catch (err) {
        console.error("Error updating user data:", err);
      }
    },

    async changePassword({ state }, { oldPassword, newPassword }) {
      const APIkey = "AIzaSyDeqmuHpzUueXHe2L-ZX6PeQtEkB93CWyo";
      const authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${APIkey}`;
      try {
        const { data: signInData } = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${APIkey}`, {
          email: state.userLogin.email,
          password: oldPassword,
          returnSecureToken: true,
        });
        await axios.post(authUrl, {
          idToken: signInData.idToken,
          password: newPassword,
          returnSecureToken: true,
        });
        alert("Password changed successfully!");
      } catch (error) {
        console.error("Error changing password:", error.response?.data || error.message || error);
        throw error;
      }
    },
  },
};
