<template>
  <div class="invoice">
    <router-view />
    <template v-if="invoice">
      <GoBackBtn class="goback--invoice" />
      <div class="invoice--page" v-if="invoice">
        <div class="wrapper">
          <div class="status__card desktop card">
            <span id="card__title">Status</span>
            <div id="status">
              <Status :data="invoice.status" />
            </div>

            <Buttons>
              <v-btn
                elevation="0"
                color="#252945"
                rounded
                @click="editInvoice"
                title="Edit"
                aria-label="Edit"
              >
                Edit
              </v-btn>
              <v-btn
                elevation="0"
                color="#ec5757"
                rounded
                @click="dialog = true"
                title="Delete"
                aria-label="Delete"
                >Delete</v-btn
              >
              <v-btn
                v-if="invoice.status !== 'paid'"
                elevation="0"
                color="purple_500"
                rounded
                @click="markAsPaid()"
                title="Mark As Paid"
                aria-label="Mark As Paid"
                >Mark As Paid</v-btn
              >
            </Buttons>
          </div>

          <section class="invoice card">
            <section class="top">
              <div class="invoice__info">
                <ul>
                  <li class="hashtag">#</li>
                  <li>{{ invoice.id }}</li>
                </ul>
                <p class="invoice__description">{{ invoice.description }}</p>
              </div>

              <div class="invoice__sender--address">
                <p>{{ invoice.senderAddress.street }}</p>
                <p>{{ invoice.senderAddress.city }}</p>
                <p>{{ invoice.senderAddress.postCode }}</p>
                <p>{{ invoice.senderAddress.country }}</p>
              </div>
            </section>

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
              <div class="client--email d-desktop">
                <p>Sent To</p>
                <p class="email">
                  {{
                    invoice.clientEmail ? invoice.clientEmail : "No Email Set"
                  }}
                </p>
              </div>
            </section>
            <div class="client--email d-mobile">
              <p>Sent To</p>
              <p class="email">
                {{ invoice.clientEmail ? invoice.clientEmail : "No Email Set" }}
              </p>
            </div>

            <div class="invoice__total__details">
              <section
                class="invoice__total d-mobile"
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

              <v-simple-table class="d-desktop">
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left table-header">Item Name</th>
                      <th class="text-center table-header">QTY.</th>
                      <th class="text-right table-header">Price</th>
                      <th class="text-right table-header">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in invoice.items" :key="item.name">
                      <td>{{ item.name }}</td>
                      <td class="text-center">{{ item.quantity }}</td>
                      <td class="text-right">
                        <v-clamp autoresize :max-lines="1">
                          £ {{ getTwoDigits(item.price) }}
                        </v-clamp>
                      </td>
                      <td class="text-right">
                        <v-clamp autoresize :max-lines="1">
                          £ {{ getTwoDigits(item.total) }}
                        </v-clamp>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </div>

            <div class="total_transaction_fee">
              <p id="grand_total">Grand Total</p>
              <h1>
                <v-clamp autoresize :max-lines="1">
                  £
                  {{ getTwoDigits(getGrandTotal(invoice.items)) }}
                </v-clamp>
              </h1>
            </div>
          </section>
        </div>
      </div>

      <Buttons class="buttons-mobile">
        <v-btn
          elevation="0"
          color="#252945"
          aria-label="Edit"
          title="Edit"
          rounded
          @click="editInvoice"
          >Edit</v-btn
        >

        <v-btn
          elevation="0"
          color="#ec5757"
          aria-label="Delete"
          title="Delete"
          rounded
          @click="dialog = true"
          >Delete</v-btn
        >
        <v-btn
          v-if="invoice.status !== 'paid'"
          elevation="0"
          color="purple_500"
          rounded
          @click="markAsPaid()"
          aria-label="Mark As Paid"
          title="Mark As Paid"
          >Mark As Paid</v-btn
        >
      </Buttons>

      <Modal
        v-model="dialog"
        :title="deleteModal.title"
        :action="deleteModal.delete"
        @onClose="closeDialog()"
        @onAction="removeInvoice()"
      >
        Are you sure you want to delete Invoice #{{ invoice.id }} ? This action
        cannot be undone.
      </Modal>
    </template>
  </div>
</template>

<script>
import "./invoice.scss";
import Status from "@/components/Invoices/Status.vue";
import GoBackBtn from "@/components/Layout/GoBackBtn.vue";
import Modal from "@/components/Layout/Modal.vue";
import Buttons from "@/components/Invoices/Buttons.vue";
import { mapActions } from "vuex";
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
    closeDialog() {
      this.dialog = false;
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
