<template>
  <div class="invoice--page">
    <div class="goback" @click="getRoute('')">
      <inline-svg :src="getImageUrl('icon-arrow-left.svg')"></inline-svg>
      <span>Go back</span>
    </div>

    <div class="wrapper">
      <div class="status__card card">
        <span id="card__title">Status</span>
        <div id="status">
          <InvoiceStatus :data="invoice.status" />
        </div>
      </div>

      <section class="invoice card">
        <div class="invoice__info">
          <ul class="hashtag">
            #
          </ul>
          {{ invoice.id }}
        </div>
        <p class="invoice__description">{{ invoice.description }}</p>

        <div class="invoice__sender--address">
          <p>{{ invoice.senderAddress.street }}</p>
          <p>{{ invoice.senderAddress.city }}</p>
          <p>{{ invoice.senderAddress.postCode }}</p>
          <p>{{ invoice.senderAddress.country }}</p>
        </div>

        <section class="invoice__details">
          <div class="invoice_left">
            <div class="invoice--date">
              <p class="invoice__header">Invoice Date</p>
              <h3 id="date">
                {{ getDate(invoice.createdAt) }}
              </h3>
            </div>
            <div>
              <p class="invoice__header">Payment Due</p>
              <h3 id="date">
                {{ getDate(invoice.paymentDue) }}
              </h3>
            </div>
          </div>
          <div class="invoice_right">
            <p class="invoice__header">Bill To</p>
            <h3 id="client-name">{{ invoice.clientName }}</h3>
            <div class="client-address">
              <p>{{ invoice.clientAddress.street }}</p>
              <p>{{ invoice.clientAddress.city }}</p>
              <p>{{ invoice.clientAddress.postCode }}</p>
              <p>{{ invoice.clientAddress.country }}</p>
            </div>
          </div>
        </section>
        <div class="client--email">
          <p>Sent To</p>
          <p class="email">
            {{ invoice.clientEmail }}
          </p>
        </div>
        <div class="invoice__total__details">
          <section
            class="invoice__total"
            v-for="item in invoice.items"
            :key="item.name"
          >
            <div class="transaction">
              <div class="transaction__details">
                <h4 class="items">{{ item.name }}</h4>
                <h4 class="quantity__value">
                  {{ item.quantity }} x £ {{ item.price.toFixed(2) }}
                </h4>
              </div>
              <div class="items__total">£ {{ item.total.toFixed(2) }}</div>
            </div>
          </section>
        </div>
        <div class="total_transaction_fee">
          <p id="grand_total">Grand Total</p>
          <h1>£ {{ invoice.total.toFixed(2) }}</h1>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import "../styles/invoice.scss";
import data from "./../json/data.json";
import InvoiceStatus from "../components/Invoices/InvoiceStatus.vue";
export default {
  components: { InvoiceStatus },
  name: "Invoice",
  data: () => ({
    myJson: data,
  }),

  computed: {
    invoice() {
      return data.find((invoice) => this.$route.params.id === invoice.id);
    },
  },
};
</script>

<style lang="scss"></style>
