<template>
  <div class="cards">
    <div
      class="invoices_card"
      v-for="data in myJson"
      :key="data.id"
      @click="directToInvoice(data.id)"
    >
      <div class="invoices_card--info">
        <li class="sku-number">
          <ul id="hashtag">
            #
          </ul>
          {{ data.id }}
        </li>
        <li class="addressee">{{ data.clientName }}</li>
      </div>
      <div class="invoices_card--info--bottom">
        <div class="invoices_information">
          <li class="due-date">Due {{ getDate(data.paymentDue) }}</li>
          <li class="fee">
            £
            {{ data.total.toLocaleString("en", { minimumFractionDigits: 2 }) }}
          </li>
        </div>
        <InvoiceStatus :data="data.status" />
      </div>
    </div>
  </div>
</template>

<script>
import data from "../../json/data.json";
import InvoiceStatus from "./InvoiceStatus.vue";

export default {
  components: { InvoiceStatus },
  data: () => ({
    myJson: data,
  }),

  methods: {
    directToInvoice(id) {
      this.$router.push({ name: "sku", params: { id } });
    },
  },
};
</script>

<style lang="scss">
.cards {
  display: grid;
  place-items: center;
  gap: 1rem;
  margin: 1rem 0;
  .invoices_card {
    width: 327px;
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
        .addressee {
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
      .addressee {
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
