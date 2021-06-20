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

      <v-form
        v-model="valid"
        @submit.prevent="handleSaveChanges"
        id="edited-form"
      >
        <section class="bill--form">
          <span class="from">Bill From</span>
          <div class="createInvoice--form">
            <label for="street-address">Street Address</label>
            <v-text-field
              :error-messages="streetFieldErrors"
              dense
              rounded
              type="text"
              name="street-address"
              required
              @blur="touch('senderAddress.street')"
              v-model="newInvoice.senderAddress.street"
            />

            <div class="input--flex">
              <div class="input-row">
                <label for="city">City</label>
                <v-text-field
                  dense
                  rounded
                  type="text"
                  name="city"
                  required
                  :error-messages="cityFieldError"
                  @blur="touch('senderAddress.city')"
                  v-model="newInvoice.senderAddress.city"
                />
              </div>
              <div class="input-column">
                <label for="post-code">Post Code</label>
                <v-text-field
                  :error-messages="postCodeError"
                  dense
                  rounded
                  name="post-code"
                  type="text"
                  required
                  @blur="touch('senderAddress.postCode')"
                  v-model="newInvoice.senderAddress.postCode"
                />
              </div>
            </div>
            <label for="country">Country</label>
            <v-text-field
              dense
              rounded
              name="country"
              type="text"
              required
              :error-messages="countryError"
              @blur="touch('senderAddress.country')"
              v-model="newInvoice.senderAddress.country"
            />
          </div>

          <div class="bill--form">
            <span class="to">Bill To</span>
            <div class="createInvoice--form">
              <label for="street-address">Client's Name</label>
              <v-text-field
                dense
                rounded
                type="text"
                name="name"
                required
                @blur="touch('clientName')"
                :error-messages="clientNameError"
                v-model="newInvoice.clientName"
              />

              <label for="street-address">Client's Email</label>
              <v-text-field
                dense
                rounded
                type="email"
                name="email"
                :error-messages="emailErrors"
                @blur="touch('clientEmail')"
                v-model="newInvoice.clientEmail"
              />

              <label for="street-address">Street Address</label>
              <v-text-field
                :error-messages="clientStreetAddressError"
                dense
                rounded
                required
                type="text"
                name="street-address"
                @blur="touch('clientAddress.street')"
                v-model="newInvoice.clientAddress.street"
              />

              <div class="input--flex">
                <div class="input-row">
                  <label for="city">City</label>
                  <v-text-field
                    dense
                    rounded
                    type="text"
                    name="city"
                    required
                    :error-messages="clientCityError"
                    @blur="touch('clientAddress.city')"
                    v-model="newInvoice.clientAddress.city"
                  />
                </div>
                <div class="input-column">
                  <label for="post-code">Post Code</label>
                  <v-text-field
                    dense
                    rounded
                    name="post-code"
                    type="text"
                    required
                    :error-messages="clientPostCodeError"
                    @blur="touch('clientAddress.postCode')"
                    v-model="newInvoice.clientAddress.postCode"
                  />
                </div>
              </div>

              <label for="country">Country</label>
              <v-text-field
                dense
                rounded
                name="country"
                type="text"
                required
                :error-messages="clientCountryError"
                @blur="touch('clientAddress.country')"
                v-model="newInvoice.clientAddress.country"
              />
            </div>
          </div>
        </section>

        <section class="date--section">
          <div class="createInvoice--form">
            <label for="Invoice-date">Invoice Date</label>
            <!-- <v-dialog
              v-model="modal"
              :click:outside="(modal = false)"
              :scrollable="false"
            > -->

            <v-menu
              v-model="modal"
              :close-on-content-click="false"
              :nudge-right="15"
              transition="scroll-y-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  readonly
                  :color="
                    $vuetify.theme.dark ? textFieldColor[0] : textFieldColor[1]
                  "
                  v-on="on"
                  append-icon="mdi-calendar"
                  required
                  :error-messages="createdAtError"
                  @blur="touch('createdAt')"
                  :value="getDate(newInvoice.createdAt)"
                ></v-text-field>
              </template>
              <v-date-picker v-model="newInvoice.createdAt" no-title>
              </v-date-picker>
              <!-- </v-dialog> -->
            </v-menu>

            <label for="payment-terms">Payment Terms</label>

            <v-select
              append-icon="mdi-chevron-down"
              :items="net"
              dense
              required
              :item-text="(i) => `Net ${i} Days`"
              :menu-props="{ transition: 'scroll-y-transition' }"
              :color="
                $vuetify.theme.dark ? textFieldColor[0] : textFieldColor[1]
              "
              :error-messages="paymentTermsError"
              @blur="touch('paymentTerms')"
              v-model="newInvoice.paymentTerms"
            >
              <template v-slot:item="{ item }">Net {{ item }} Days</template>
              <template v-slot:selection="{ item }"
                ><b>Net {{ item }} Days</b></template
              >
            </v-select>

            <label for="street-address">Project / Description</label>
            <v-text-field
              dense
              rounded
              type="text"
              name="Description"
              required
              :error-messages="descriptionError"
              @blur="touch('description')"
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
        color="purple_500"
        rounded
        form="edited-form"
        type="submit"
        class="save"
        >{{ saveMode ? "Save & Send" : "Save Changes" }}</v-btn
      >
    </Buttons>
  </section>
</template>

<script>
import validations from "@/mixins/validations";
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
import { mapActions, mapGetters } from "vuex";
import cloneDeep from "lodash/cloneDeep";
import Buttons from "../Buttons.vue";
import get from "lodash/get";

export default {
  name: "Form",
  components: { Buttons },
  mixins: [validationMixin, validations],
  data: () => ({
    btnColor: ["#252945", "#f9fafe"],
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    modal: false,
    valid: false,
    snackbar: false,
    text: `Saved changes.`,
    vertical: true,
    textFieldColor: ["purple_500", "#7e88c3"],
    net: [1, 7, 14, 30],
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

  validations: {
    newInvoice: {
      createdAt: { required },
      paymentDue: { required },
      description: { required },
      paymentTerms: { required },
      clientName: { required },
      clientEmail: { required, email },
      senderAddress: {
        street: { required },
        city: { required },
        postCode: { required },
        country: { required },
      },
      clientAddress: {
        street: { required },
        city: { required },
        postCode: { required },
        country: { required },
      },
      $each: {
        items: {
          name: { required },
          quantity: { required },
          price: { required },
          total: { required },
        },
      },
    },
  },

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
      if (!this.valid) return false;
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
      });
    },
    deleteItem(i) {
      this.newInvoice.items.splice(i, 1);
    },
    touch(path) {
      return get(this.$v.newInvoice, path).$touch();
    },
    submit() {
      this.$v.$touch();
    },
  },

  created() {
    if (!this.saveMode) this.newInvoice = cloneDeep(this.invoice);
  },

  mounted() {
    if (this.newInvoice.paymentTerms !== null)
      return this.net.unshift(this.newInvoice.paymentTerms);
  },
};
</script>

<style lang="scss">
#edited-form {
  .v-text-field--rounded {
    border-radius: 8px !important;
  }

  .v-input {
    height: 50px !important;
  }
}

.save {
  max-width: 111px !important;
}
</style>
