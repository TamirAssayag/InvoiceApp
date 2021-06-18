<template>
  <div class="cards">
    <template v-for="invoice in invoices">
      <div
        class="invoices_card"
        :key="invoice.id"
        @click="directToInvoice(invoice.id)"
      >
        <div class="invoices_card--info">
          <li class="sku-number">
            <ul id="hashtag">
              #
            </ul>
            {{ invoice.id }}
          </li>
          <li class="client_name">{{ invoice.clientName }}</li>
        </div>
        <div class="invoices_card--info--bottom">
          <div class="invoices_information">
            <li class="due-date">
              Due
              {{ getDate(addDays(invoice.createdAt, invoice.paymentTerms)) }}
            </li>
            <li class="fee text-elipsis">
              £
              {{ (invoice.total = getTwoDigits(getGrandTotal(invoice.items))) }}
            </li>
          </div>
          <InvoiceStatus :data="invoice.status" />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import InvoiceStatus from "./InvoiceStatus.vue";
import { mapGetters } from "vuex";

export default {
  components: { InvoiceStatus },
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
    updateByStatus(status) {
      if (this.filter === "all") return true;
      return this.filter === status;
    },
  },
};
</script>

<style lang="scss">
.cards {
  display: grid;
  place-items: center;
  gap: 1rem;
  margin: 1.1rem 0;
  .invoices_card {
    width: 100%;
    min-height: 134px;
    border-radius: 8px;
    box-shadow: 0 10px 10px -10px rgba(72, 84, 159, 0.1);
    background-color: #1e2139;
    padding: 1.5rem 1.5rem 0;
    cursor: pointer;

    .theme--light & {
      background-color: #ffffff;

      &--info {
        .sku-number {
          #hashtag {
            color: #7e88c3;
          }
        }
        .client_name {
          color: #858bb2;
        }
        &--bottom {
          .due-date {
            color: #7e88c3;
          }
        }
      }
    }

    &--info {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.8rem;

      .sku-number {
        display: flex;
        font-size: 12px;
        font-size: 12px;
        line-height: 1.25;
        letter-spacing: -0.25px;
        font-weight: bold;
      }
      .client_name {
        font-size: 12px;
        line-height: 1.25;
        letter-spacing: -0.25px;
      }
    }

    &--info--bottom {
      margin-top: 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .due-date {
        margin-bottom: 0.5rem;
        font-size: 12.5px;
        font-weight: 500;
        line-height: 1.25;
        letter-spacing: -0.25px;
      }
      .fee {
        font-size: 16px;
        font-weight: 600;
        font-weight: bold;
        line-height: 1.5;
        letter-spacing: -0.8px;
      }
    }
  }
}
</style>
