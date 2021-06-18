<template>
  <section>
    <div class="createInvoice--wrapper">
      <div class="createInvoice--title">
        <h2>
          {{ $route.name === "sku-edit" ? "Edit &nbsp;" : "New &nbsp;" }}
          <div class="hashtag">#</div>
          {{ newInvoice.id }}
        </h2>
      </div>

      <v-form ref="edited" @submit.prevent="handleSaveChanges" id="edited-form">
        <section class="bill--form">
          <span class="from">Bill From</span>
          <div class="createInvoice--form">
            <label for="street-address">Street Adress</label>
            <input
              type="text"
              name="street-address"
              v-model="newInvoice.senderAddress.street"
            />

            <div class="input--flex">
              <div class="input-row">
                <label for="city">City</label>
                <input
                  type="text"
                  name="city"
                  v-model="newInvoice.senderAddress.city"
                />
              </div>
              <div class="input-column">
                <label for="post-code">Post Code</label>
                <input
                  name="post-code"
                  type="text"
                  v-model="newInvoice.senderAddress.postCode"
                />
              </div>
            </div>
            <label for="country">Country</label>
            <input
              name="country"
              type="text"
              v-model="newInvoice.senderAddress.country"
            />
          </div>

          <div class="bill--form">
            <span class="to">Bill To</span>
            <div class="createInvoice--form">
              <label for="street-address">Client's Name</label>
              <input type="text" name="name" v-model="newInvoice.clientName" />

              <label for="street-address">Client's Email</label>
              <input
                type="email"
                name="email"
                v-model="newInvoice.clientEmail"
              />

              <label for="street-address">Street Address</label>
              <input
                type="text"
                name="street-address"
                v-model="newInvoice.clientAddress.street"
              />

              <div class="input--flex">
                <div class="input-row">
                  <label for="city">City</label>
                  <input
                    type="text"
                    name="city"
                    v-model="newInvoice.clientAddress.city"
                  />
                </div>
                <div class="input-column">
                  <label for="post-code">Post Code</label>
                  <input
                    name="post-code"
                    type="text"
                    v-model="newInvoice.clientAddress.postCode"
                  />
                </div>
              </div>

              <label for="country">Country</label>
              <input
                name="country"
                type="text"
                v-model="newInvoice.clientAddress.country"
              />
            </div>
          </div>
        </section>

        <section class="date--section">
          <div class="createInvoice--form">
            <label for="Invoice-date">Invoice Date</label>
            <v-dialog
              v-model="modal"
              :click:outside="(modal = false)"
              :scrollable="false"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  :color="
                    $vuetify.theme.dark ? textFieldColor[0] : textFieldColor[1]
                  "
                  v-on="on"
                  hide-details
                  append-icon="mdi-calendar"
                  :value="getDate(newInvoice.createdAt)"
                ></v-text-field>
              </template>
              <v-date-picker v-model="newInvoice.createdAt" no-title>
              </v-date-picker>
            </v-dialog>

            <label for="payment-terms">Payment Terms</label>

            <v-select
              append-icon="mdi-chevron-down"
              :items="net"
              dense
              :item-text="(i) => `Net ${i} Days`"
              hide-details
              :menu-props="{ transition: 'scroll-y-transition' }"
              :color="
                $vuetify.theme.dark ? textFieldColor[0] : textFieldColor[1]
              "
              v-model="newInvoice.paymentTerms"
            >
              <template v-slot:item="{ item }">Net {{ item }} Days</template>
              <template v-slot:selection="{ item }"
                ><b>Net {{ item }} Days</b></template
              >
            </v-select>

            <label for="street-address">Project / Description</label>
            <input
              type="text"
              name="Description"
              v-model="newInvoice.description"
            />
          </div>
        </section>

        <h4 class="item--list__title">Item List</h4>
        <v-scroll-y-reverse-transition
          appear
          v-for="(item, index) in newInvoice.items"
          :key="item.price"
        >
          <section :class="['item--list', `item--list__${index}`]">
            <div class="item--list__form">
              <label :for="`itemname-${index}`">Item Name</label>
              <input
                name="`itemname-${index}`"
                :id="`itemname-${index}`"
                type="text"
                v-model="item.name"
              />

              <div class="input--flex">
                <div class="input-row">
                  <label :for="`quantity-${index}`">Qty.</label>
                  <input
                    type="number"
                    :id="`quantity-${index}`"
                    name="quantity"
                    pattern="[0-9]*"
                    maxlength="2"
                    max="99"
                    min="0"
                    @input="
                      (e) => {
                        item.total = item.price * e.target.value;
                        // Asigning invoice.total to item.total multipled by the input value
                        item.price ? item.total : e.target.value;
                      }
                    "
                    v-model="item.quantity"
                  />
                </div>
                <div class="input-column">
                  <label :for="`item-price-${index}`">Price</label>
                  <input
                    :id="`item-price-${index}`"
                    min="0"
                    maxlength="9999"
                    max="9999"
                    type="number"
                    name="item-price"
                    pattern="[0-9]*"
                    :value="item.price"
                    @input="
                      (e) => {
                        item.total = item.quantity * e.target.value;
                        item.quantity
                          ? (item.price = e.target.value)
                          : e.target.value;

                        newInvoice.total = item.total;
                      }
                    "
                  />
                </div>
                <div class="input-column grow-0 text-elipsis">
                  <div class="item-total-price">
                    {{ getTwoDigits(item.total) }}
                  </div>
                </div>
                <div class="input-row grow-0">
                  <div class="trash-icon">
                    <v-btn
                      plain
                      icon
                      elevation="0"
                      color="transparent"
                      @click="deleteItem(index)"
                    >
                      <inline-svg :src="getImageUrl('icon-delete.svg')" />
                    </v-btn>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </v-scroll-y-reverse-transition>
      </v-form>

      <div class="add__new">
        <v-btn
          class="add__new__btn"
          elevation="0"
          :color="this.$vuetify.theme.dark ? btnColor[0] : btnColor[1]"
          rounded
          @click="addNewItem"
          >+ Add New Item</v-btn
        >
      </div>
    </div>
    <Buttons>
      <v-btn elevation="0" color="#252945" rounded @click="$router.go(-1)">{{
        saveMode ? "Discard" : "Cancel"
      }}</v-btn>

      <v-btn
        v-if="$route.name === 'sku-new'"
        elevation="0"
        color="#373b53"
        rounded
        form="edited-form"
        type="submit"
        id="draft"
        @click="newInvoice.status = 'draft'"
        >Save as Draft</v-btn
      >
      <v-btn
        elevation="0"
        color="#7c5dfa"
        rounded
        form="edited-form"
        type="submit"
        >{{ saveMode ? "Save & Send" : "Save Changes" }}</v-btn
      >
    </Buttons>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Buttons from "../Buttons.vue";
export default {
  components: { Buttons },
  name: "Form",
  data: () => ({
    btnColor: ["#252945", "#f9fafe"],
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    modal: false,
    snackbar: false,
    text: `Saved changes.`,
    vertical: true,
    textFieldColor: ["#7C5DFA", "#7e88c3"],
    net: [7, 10, 30, 60, 90],
    newInvoice: {
      id: Math.random().toString(36).substring(7).toUpperCase(),
      status: "pending",
      createdAt: null,
      paymentDue: null,
      description: null,
      paymentTerms: null,
      clientName: null,
      clientEmail: null,
      senderAddress: {
        street: null,
        city: null,
        postCode: null,
        country: null,
      },
      clientAddress: {
        street: null,
        city: null,
        postCode: null,
        country: null,
      },
      items: [
        {
          name: null,
          quantity: null,
          price: null,
          total: null,
        },
      ],
      total: null,
    },
  }),

  computed: {
    saveMode() {
      return this.$route.name === "sku-new";
    },
    ...mapGetters({
      invoices: "invoices/getInvoices",
    }),
  },

  methods: {
    ...mapActions({
      saveInvoiceById: "invoices/saveInvoiceById",
      addInvoice: "invoices/addInvoice",
    }),
    handleSaveChanges() {
      if (this.saveMode) {
        this.addInvoice(this.newInvoice);
      } else {
        this.saveInvoiceById({
          id: this.$route.params.id,
          data: this.newInvoice,
        });
      }
      this.$root.$emit("snackbar", {
        config: {
          text: "Saved succesfully",
        },
      });
      this.$router.go(-1);
    },
    saveAsDraft() {
      this.newInvoice.status = "draft";
    },
    addNewItem() {
      this.newInvoice.items.push({
        name: null,
        quantity: null,
        price: null,
        total: null,
      });
      // Scrolling to the new item list added according to the index set
      setTimeout(() => {
        this.$vuetify.goTo(`.item--list__${this.newInvoice.items.length - 1}`);
      }, 100);
    },
    deleteItem(i) {
      this.newInvoice.items.splice(i, 1);
    },
  },
  mounted() {
    if (this.newInvoice.paymentTerms !== null)
      return this.net.unshift(this.newInvoice.paymentTerms);
  },
};
</script>

<style></style>
