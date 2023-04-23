import { createRouter, createWebHashHistory } from "vue-router";
import FavouritesPage from "../pages/FavouritesPage.vue";
import HomePage from "../pages/HomePage.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/favourites", component: FavouritesPage },
];

export const router = createRouter({
  routes,
  history: createWebHashHistory(),
});
