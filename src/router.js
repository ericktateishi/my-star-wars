import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Characters from "./views/Characters.vue";
import Planets from "./views/Planets.vue";
import StarShips from "./views/StarShips.vue";
import Apod from "./views/Apod.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/characters",
      name: "characters",
      component: Characters
    },
    {
      path: "/planets",
      name: "planets",
      component: Planets
    },
    {
      path: "/starships",
      name: "starships",
      component: StarShips
    },
    {
      path: "/apod",
      name: "apod",
      component: Apod
    }
  ]
});
