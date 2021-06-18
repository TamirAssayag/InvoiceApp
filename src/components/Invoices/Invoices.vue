<template>
  <section class="invoices">
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
.invoices {
  margin-top: 1.5rem;
  padding: 0 1.5rem;

  .container {
    min-height: 100vh;
    width: 100%;
  }
}
</style>
