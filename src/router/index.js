import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../components/HomeView.vue";
import CityView from "../views/CityView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/weater/:state/:city",
      name: "cityView",
      component: CityView,
    },
  ],
});

export default router;