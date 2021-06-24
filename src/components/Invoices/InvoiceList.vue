<template>
  <div class="cards">
    <template v-for="invoice in invoices">
      <div
        class="invoices_card"
        :key="invoice.id"
        @click="directToInvoice(invoice.id)"
      >
        <aside class="left">
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
            <li class="fee d-mobile">
              <v-clamp :autoresize="false" :max-lines="1">
                £
                {{
                  (invoice.total = getTwoDigits(getGrandTotal(invoice.items)))
                }}
              </v-clamp>
            </li>
          </ul>
        </aside>

        <aside class="right">
          <ul class="invoice_information__half">
            <li class="fee d-desktop">
              <v-clamp :autoresize="false" :max-lines="1">
                £
                {{
                  (invoice.total = getTwoDigits(getGrandTotal(invoice.items)))
                }}
              </v-clamp>
            </li>
            <li class="client_name d-mobile">
              {{ invoice.clientName }}
            </li>
            <Status :data="invoice.status" />
            <v-btn
              class="d-desktop"
              icon
              color="transparent"
              elevation=""
              :aria-label="`Invoice #${invoice.id}`"
              :title="`Invoice #${invoice.id}`"
            >
              <v-icon color="purple_500">mdi-chevron-right</v-icon>
            </v-btn>
          </ul>
        </aside>
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
