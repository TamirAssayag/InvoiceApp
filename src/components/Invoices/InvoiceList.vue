<template>
  <div class="cards">
    <template v-for="invoice in invoices">
      <div
        class="invoices_card"
        :key="invoice.id"
        @click="directToInvoice(invoice.id)"
      >
        <aside class="left">
          <div class="invoice_information">
            <div class="invoice_id">
              <div class="hashtag">#</div>
              {{ invoice.id }}
            </div>
            <div class="due-date">
              Due
              {{ getDate(addDays(invoice.createdAt, invoice.paymentTerms)) }}
            </div>
            <div class="client_name d-desktop">
              {{ invoice.clientName }}
            </div>
            <div class="fee d-mobile">
              <v-clamp :autoresize="false" :max-lines="1">
                £
                {{
                  (invoice.total = getTwoDigits(getGrandTotal(invoice.items)))
                }}
              </v-clamp>
            </div>
          </div>
        </aside>

        <aside class="right">
          <div class="invoice_information__half">
            <div class="fee d-desktop">
              <v-clamp :autoresize="false" :max-lines="1">
                £
                {{
                  (invoice.total = getTwoDigits(getGrandTotal(invoice.items)))
                }}
              </v-clamp>
            </div>
            <div class="client_name d-mobile">
              {{ invoice.clientName }}
            </div>
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
          </div>
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
