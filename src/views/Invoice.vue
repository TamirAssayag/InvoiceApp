<template>
  <div class="invoice">
    <router-view />
    <template v-if="invoice">
      <GoBackBtn />
      <div class="invoice--page" v-if="invoice">
        <div class="wrapper">
          <div class="status__card card">
            <span id="card__title">Status</span>
            <div id="status">
              <Status :data="invoice.status" />
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
                    {{
                      (invoice.paymentDue = getDate(
                        addDays(invoice.createdAt, invoice.paymentTerms)
                      ))
                    }}
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
                      {{ item.quantity }} x £
                      {{ getTwoDigits(item.price) }}
                    </h4>
                  </div>
                  <div class="items__total">
                    £
                    {{ getTwoDigits(item.total) }}
                  </div>
                </div>
              </section>
            </div>
            <div class="total_transaction_fee">
              <p id="grand_total">Grand Total</p>
              <!-- //BUG// Broken function, gets only index 0 and not more than that, gotta loop through items array -->
              <h1>
                £
                {{ getTwoDigits(getGrandTotal(invoice.items)) }}
              </h1>
            </div>
          </section>
        </div>
      </div>

      <Buttons>
        <v-btn elevation="0" color="#252945" rounded @click="editInvoice"
          >Edit</v-btn
        >

        <v-btn elevation="0" color="#ec5757" rounded @click="dialog = true"
          >Delete</v-btn
        >
        <v-btn
          v-if="invoice.status !== 'paid'"
          elevation="0"
          color="#7c5dfa"
          rounded
          @click="markAsPaid()"
          >Mark As Paid</v-btn
        >
      </Buttons>

      <Modal
        v-model="dialog"
        :title="deleteModal.title"
        :action="deleteModal.delete"
        @onClose="dialog = false"
        @onAction="removeInvoice()"
      >
        Are you sure you want to delete Invoice #{{ invoice.id }} ? This action
        cannot be undone.
      </Modal>
    </template>
  </div>
</template>

<script>
import "../styles/invoice.scss";
import Status from "../components/Invoices/Status.vue";
import GoBackBtn from "../components/Layout/GoBackBtn.vue";
import { mapActions } from "vuex";
import Modal from "../components/Layout/Modal.vue";
import Buttons from "../components/Invoices/Buttons.vue";
export default {
  components: { Status, GoBackBtn, Modal, Buttons },
  name: "Invoice",
  data: () => ({
    dialog: false,
    deleteModal: {
      title: "Confirm Deletion",
      delete: "Delete",
    },
  }),

  methods: {
    editInvoice() {
      this.$router.push({ name: "sku-edit" }).catch((err) => console.log(err));
    },
    ...mapActions({
      deleteInvoice: "invoices/deleteInvoice",
      updateStatusById: "invoices/updateStatusById",
    }),
    removeInvoice() {
      this.$router.go(-1);
      this.$root.$emit("snackbar", { config: { text: "Deleted succesfully" } });
      this.deleteInvoice(this.$route.params.id);
    },
    markAsPaid() {
      this.updateStatusById({
        id: this.$route.params.id,
        status: "paid",
      });
    },
  },
  computed: {
    editMode() {
      return this.$route.name === "sku-edit";
    },
  },
};
</script>

<style lang="scss"></style>
