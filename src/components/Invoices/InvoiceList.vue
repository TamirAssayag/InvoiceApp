<template>
  <div class="cards">
    <template v-for="invoice in invoices">
      <div
        class="invoices_card"
        :key="invoice.id"
        @click="directToInvoice(invoice.id)"
      >
        <section class="left">
          <ul class="invoice_information">
            <li class="invoice_id">
              <div class="hashtag">#</div>
              {{ invoice.id }}
            </li>
            <li class="due-date">
              Due
              {{ getDate(addDays(invoice.createdAt, invoice.paymentTerms)) }}
            </li>
            <li class="client_name d-desktop">
              {{ invoice.clientName }}
            </li>
            <li class="fee text-elipsis d-mobile">
              £
              {{ (invoice.total = getTwoDigits(getGrandTotal(invoice.items))) }}
            </li>
          </ul>
        </section>

        <section class="right">
          <ul class="invoice_information__half">
            <li class="fee text-elipsis d-desktop">
              £
              {{ (invoice.total = getTwoDigits(getGrandTotal(invoice.items))) }}
            </li>
            <li class="client_name d-mobile">
              {{ invoice.clientName }}
            </li>
            <Status :data="invoice.status" />
            <v-btn class="d-desktop" icon color="transparent" elevation="">
              <v-icon color="purple_500">mdi-chevron-right</v-icon>
            </v-btn>
          </ul>
        </section>
      </div>
    </template>
  </div>
</template>

<script>
import Status from "./Status.vue";
import { mapGetters } from "vuex";
import "./invoices.scss";

export default {
  components: { Status },
  data: () => ({}),

  computed: {
    ...mapGetters({
      invoices: "invoices/invoicesByFilter",
      filter: "invoices/getFilter",
    }),
  },

  methods: {
    directToInvoice(id) {
      this.$router.push({ name: "sku", params: { id } });
    },
  },
};
</script>

<style lang="scss"></style>
