import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Invoice from "../views/Invoice.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/invoice/",
    name: "invoice",
    children: [
      {
        path: ":id",
        name: "sku",
        component: { Invoice },
      },
    ],
    component: () =>
      import(/* webpackChunkName: "Invoice" */ "@/views/Invoice.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    // https://stackoverflow.com/questions/50449123/vue-js-scroll-to-top-of-page-for-same-route
    window.scrollTo(0, 0);
  },
});

export default router;
