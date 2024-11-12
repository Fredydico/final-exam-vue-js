import HomePage from "./components/pages/HomePage.vue";
import LoginPage from "./components/pages/LoginPage.vue";
import SignupPage from "./components/pages/SignupPage.vue";
import UserPage from "./components/pages/UserPage.vue";
import AllProduct from "./components/pages/AllProduct.vue";
import DetailPage from "./components/pages/DetailPage.vue";
import NewProductPage from "./components/pages/NewProductPage.vue";
import EditProductPage from "./components/pages/EditProductPage.vue";
import CartPage from "./components/pages/CartPage.vue";
import ConfirtmationOrder from "./components/pages/ConfirmationOrder.vue";
import Cookies from "js-cookie";
import { store } from "./store/index";

export const routes = [
  {
    path: "/",
    name: "homePage",
    component: HomePage,
    beforeEnter: () => {
      checkAuth();
    },
  },
  { path: "/signup", name: "signup", component: SignupPage },
  { path: "/login", name: "login", component: LoginPage },
  { path: "/all-product", name: "allProduct", component: AllProduct },
  { path: "/user/cart", name: "cart", component: CartPage },
  { path: "/confirmation-order", name: "ConfirmationOrder", component: ConfirtmationOrder },
  {
    path: "/new-product",
    name: "newProduct",
    component: NewProductPage,
    beforeEnter: (to, from, next) => {
      checkAuth() ? next() : next({ name: "login" });
    },
  },
  { path: "/detail/:id", name: "detail", component: DetailPage },
  {
    path: "/user/:component",
    name: "userPage",
    component: UserPage,
    beforeEnter: (to, from, next) => {
      checkAuth() ? next() : next({ name: "login" });
    },
  },
  {
    path: "/product/edit/:id",
    name: "editProductPage",
    component: EditProductPage,
    beforeEnter: (to, from, next) => {
      checkAuth() ? next() : next({ name: "login" });
    },
  },
];

const checkAuth = () => {
  const jwtCookie = Cookies.get("jwt");
  const expirationDate = Cookies.get("tokenExpirationDate");
  const ueserId = Cookies.get("UID");

  if (jwtCookie) {
    if (new Date().getTime() < +expirationDate) {
      store.commit("auth/setToken", {
        idToken: jwtCookie,
        expiresIn: expirationDate,
      });
      store.dispatch("auth/getUser", ueserId);
      return true;
    } else {
      store.commit("auth/setUserLogout");
      return false;
    }
  } else {
    return false;
  }
};
