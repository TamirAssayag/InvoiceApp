import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Invoices",
    component: () =>
      import(
        /* webpackChunkName: "invoices" */ "@/components/Invoices/Invoices.vue"
      ),
    children: [
      {
        path: "new",
        name: "sku-new",
        component: () =>
          import(
            /* webpackChunkName: "CreateInvoice" */ "@/components/Invoices/EditNew/CreateInvoice.vue"
          ),
      },
    ],
  },

  {
    path: "/invoice",
    name: "invoice",
    component: { template: "<router-view />" },
    children: [
      {
        path: ":id",
        name: "sku",
        component: () =>
          import(
            /* webpackChunkName: "Invoice" */ "@/views/Invoice/Invoice.vue"
          ),
        children: [
          {
            path: "edit",
            name: "sku-edit",
            component: () =>
              import(
                /* webpackChunkName: "CreateInvoice" */ "@/components/Invoices/EditNew/CreateInvoice.vue"
              ),
          },
        ],
      },
    ],
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
