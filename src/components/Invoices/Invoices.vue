<template>
  <section class="invoices">
    <div class="container">
      <InvoicesHeader />
      <InvoicesCard />
    </div>
  </section>
</template>

<script>
import InvoicesCard from "./InvoicesCard.vue";
import InvoicesHeader from "./InvoicesHeader.vue";
export default {
  components: { InvoicesHeader, InvoicesCard },
  data: () => ({}),
};
</script>

<style lang="scss">
.invoices {
  margin-top: 1.8rem;
  padding: 0 1.5rem;

  .container {
    min-height: 100vh;
    width: 100%;
  }
}
</style>
