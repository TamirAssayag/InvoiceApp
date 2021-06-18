<template>
  <section class="invoices">
    <router-view />
    <InvoicesHeader />
    <div class="container" v-if="invoices.length">
      <InvoicesCard />
    </div>
    <Empty v-else />
  </section>
</template>
<script>
import { mapGetters } from "vuex";
import InvoicesCard from "./InvoicesCard.vue";
import InvoicesHeader from "./InvoicesHeader.vue";
import Empty from "./NoInvoices/Empty.vue";
export default {
  components: { InvoicesHeader, InvoicesCard, Empty },

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
  @include media(">lg") {
    padding: 0 15rem;
    margin: 0 0 0 3.6rem;
  }

  @include media(">xl") {
    margin: auto;
    width: 120em;
    padding: 0 10rem;
  }
  .container {
    padding: 0 1.5rem !important;
    min-height: 100vh;
    width: 100%;
  }
}
</style>
