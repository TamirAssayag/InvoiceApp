<template>
  <section class="invoices">
    <router-view />
    <Header />
    <div class="container" v-if="invoices.length">
      <InvoiceList />
    </div>
    <Empty v-else />
  </section>
</template>
<script>
import { mapGetters } from "vuex";
import InvoiceList from "./InvoiceList.vue";
import Header from "./Header.vue";
import Empty from "./Empty.vue";
export default {
  components: { Header, InvoiceList, Empty },

  computed: {
    ...mapGetters({
      invoices: "invoices/invoicesByFilter",
    }),
  },
};
</script>

<style lang="scss">
@import "@/styles/import";
.invoices {
  @include media(">=lg") {
    padding: 0 15rem;
    margin: 0 0 0 3.6rem;
  }

  @include media(">=xl") {
    margin: 0 auto;
    width: 120em;
    padding: 0 10rem;
  }
  .container {
    padding: 0 1.5rem !important;
    min-height: calc(100vh - 196px);
    width: 100%;
  }
}
</style>
