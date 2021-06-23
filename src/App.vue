<template>
  <v-app>
    <Layout />
    <Snackbar v-model="snackbar" :text="snackbarConfig.text" />
    <router-view />
  </v-app>
</template>

<script>
import data from "@/json/data.json";
import Layout from "@/components/Layout/Layout.vue";
import Snackbar from "@/components/Layout/Snackbar.vue";
import { mapActions } from "vuex";
export default {
  components: { Layout, Snackbar },
  name: "App",

  data: () => ({
    snackbar: false,
    snackbarConfig: {},
  }),

  methods: {
    ...mapActions({
      setInvoices: "invoices/setInvoices",
    }),
  },

  created() {
    if (localStorage.getItem("invoices")) {
      this.setInvoices(JSON.parse(localStorage.getItem("invoices")));
    } else {
      this.setInvoices(data);
    }

    this.$root.$on("snackbar", ({ config }) => {
      this.snackbarConfig = { ...config };
      this.snackbar = true;
    });
  },
};
</script>
