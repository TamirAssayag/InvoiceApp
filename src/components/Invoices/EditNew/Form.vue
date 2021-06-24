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

      <v-form @submit.prevent="handleSaveChanges" id="edited-form">
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
              @focus="reset('senderAddress.street')"
              @blur="touch('senderAddress.street')"
              v-model="newInvoice.senderAddress.street"
            />

            <div class="input--flex in-row">
              <div class="input--flex">
                <div class="input-row">
                  <label class="mb-1" for="city">City</label>
                  <v-text-field
                    dense
                    rounded
                    type="text"
                    name="city"
                    required
                    :error-messages="cityFieldError"
                    @focus="reset('senderAddress.city')"
                    @blur="touch('senderAddress.city')"
                    v-model="newInvoice.senderAddress.city"
                  />
                </div>
                <div class="input-column">
                  <label class="mb-1" for="post-code">Post Code</label>
                  <v-text-field
                    :error-messages="postCodeError"
                    dense
                    rounded
                    name="post-code"
                    type="text"
                    required
                    @focus="reset('senderAddress.postCode')"
                    @blur="touch('senderAddress.postCode')"
                    v-model="newInvoice.senderAddress.postCode"
                  />
                </div>
              </div>
              <div class="input--flex">
                <div class="input-column">
                  <label class="mb-1" for="country">Country</label>
                  <v-text-field
                    dense
                    rounded
                    name="country"
                    type="text"
                    required
                    :error-messages="countryError"
                    @focus="reset('senderAddress.country')"
                    @blur="touch('senderAddress.country')"
                    v-model="newInvoice.senderAddress.country"
                  />
                </div>
              </div>
            </div>
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
                @focus="reset('clientName')"
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
                @focus="reset('clientEmail')"
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
                @focus="reset('clientAddress.street')"
                @blur="touch('clientAddress.street')"
                v-model="newInvoice.clientAddress.street"
              />

              <div class="input--flex in-row">
                <div class="input--flex">
                  <div class="input-row">
                    <label class="mb-1" for="city">City</label>
                    <v-text-field
                      dense
                      rounded
                      type="text"
                      name="city"
                      required
                      :error-messages="clientCityError"
                      @focus="reset('clientAddress.city')"
                      @blur="touch('clientAddress.city')"
                      v-model="newInvoice.clientAddress.city"
                    />
                  </div>
                  <div class="input-column">
                    <label class="mb-1" for="post-code">Post Code</label>
                    <v-text-field
                      dense
                      rounded
                      name="post-code"
                      type="text"
                      required
                      :error-messages="clientPostCodeError"
                      @focus="reset('clientAddress.postCode')"
                      @blur="touch('clientAddress.postCode')"
                      v-model="newInvoice.clientAddress.postCode"
                    />
                  </div>
                </div>
                <div class="input--flex">
                  <div class="input-column">
                    <label class="mb-1" for="country">Country</label>
                    <v-text-field
                      dense
                      rounded
                      name="country"
                      type="text"
                      required
                      :error-messages="clientCountryError"
                      @focus="reset('clientAddress.country')"
                      @blur="touch('clientAddress.country')"
                      v-model="newInvoice.clientAddress.country"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="date--section">
          <div class="createInvoice--form">
            <div class="input--flex in-row">
              <div class="input--column flex-1">
                <label for="Invoice-date">Invoice Date</label>
                <v-menu
                  :close-on-content-click="false"
                  transition="scroll-y-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                  attach
                  :nudge-right="$vuetify.breakpoint.xs ? 15 : 0"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      style="cursor: pointer"
                      readonly
                      :color="
                        $vuetify.theme.dark
                          ? textFieldColor[0]
                          : textFieldColor[1]
                      "
                      v-on="on"
                      append-icon="mdi-calendar"
                      required
                      :error-messages="createdAtError"
                      @focus="reset('createdAt')"
                      @blur="touch('createdAt')"
                      :value="getDate(newInvoice.createdAt)"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="newInvoice.createdAt" no-title>
                  </v-date-picker>
                </v-menu>
              </div>

              <div class="input--column flex-1">
                <label for="payment-terms">Payment Terms</label>

                <v-select
                  append-icon="mdi-chevron-down"
                  :items="net"
                  required
                  attach
                  :item-text="(i) => `Net ${i} Days`"
                  :menu-props="{
                    transition: 'scroll-y-transition',
                    top: false,
                    offsetY: true,
                  }"
                  :color="
                    $vuetify.theme.dark ? textFieldColor[0] : textFieldColor[1]
                  "
                  :error-messages="paymentTermsError"
                  @focus="reset('paymentTerms')"
                  @blur="touch('paymentTerms')"
                  v-model="newInvoice.paymentTerms"
                >
                  <template v-slot:item="{ item }"
                    >Net {{ item }} Days</template
                  >
                  <template v-slot:selection="{ item }"
                    ><b>Net {{ item }} Days</b></template
                  >
                </v-select>
              </div>
            </div>

            <label for="description">Project Description</label>
            <v-text-field
              dense
              rounded
              type="text"
              id="description"
              name="description"
              required
              :error-messages="descriptionError"
              @focus="reset('description')"
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
              <v-text-field
                dense
                rounded
                :name="`itemname-${index}`"
                :id="`itemname-${index}`"
                type="text"
                required
                v-model="item.name"
                @focus="getItemEachIter(index).name.$reset()"
                @blur="getItemEachIter(index).name.$touch()"
                :error-messages="itemNameErrorMessages(index)"
              />

              <div class="input--flex" style="width: 100%">
                <div class="input-row">
                  <label class="mb-1" :for="`quantity-${index}`">Qty.</label>
                  <v-text-field
                    :color="
                      $vuetify.theme.dark
                        ? textFieldColor[0]
                        : textFieldColor[1]
                    "
                    type="number"
                    :id="`quantity-${index}`"
                    name="quantity"
                    pattern="[0-9]*"
                    maxlength="2"
                    max="99"
                    min="0"
                    required
                    @focus="getItemEachIter(index).quantity.$reset()"
                    @blur="getItemEachIter(index).quantity.$touch()"
                    :error-messages="itemQuantityErrorMessages(index)"
                    @input.native="
                      (e) => {
                        item.total = item.price * e.target.value;
                        item.price ? item.total : e.target.value;
                      }
                    "
                    v-model="item.quantity"
                  />
                </div>
                <div class="input-column">
                  <label class="mb-1" :for="`item-price-${index}`">Price</label>
                  <v-text-field
                    :color="
                      $vuetify.theme.dark
                        ? textFieldColor[0]
                        : textFieldColor[1]
                    "
                    :id="`item-price-${index}`"
                    min="0"
                    maxlength="9999"
                    max="9999"
                    type="number"
                    name="item-price"
                    pattern="[0-9]*"
                    :value="item.price"
                    @focus="getItemEachIter(index).price.$reset()"
                    @blur="getItemEachIter(index).price.$touch()"
                    :error-messages="itemPriceErrorMessages(index)"
                    @input.native="
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
                  <v-btn
                    icon
                    elevation="0"
                    color="transparent"
                    @click="deleteItem(index)"
                    :aria-label="`Delete Item List`"
                    :title="`Delete Item List`"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </div>
              </div>
            </div>
          </section>
        </v-scroll-y-reverse-transition>

        <div class="add__new">
          <v-btn
            class="add__new__btn"
            elevation="0"
            :color="this.$vuetify.theme.dark ? btnColor[0] : btnColor[1]"
            rounded
            @click="addNewItem"
            title="Add New Item"
            aria-label="Add New Item"
            >+ Add New Item</v-btn
          >
          <p class="text__error mt-7">{{ text_error }}</p>
        </div>
      </v-form>
    </div>

    <Buttons class="created-invoice__buttons">
      <v-btn
        elevation="0"
        color="#252945"
        :title="saveMode ? 'Discard' : 'Cancel'"
        :aria-label="saveMode ? 'Discard' : 'Cancel'"
        rounded
        @click="$emit('onCancel')"
      >
        {{ saveMode ? "Discard" : "Cancel" }}
      </v-btn>
      <v-btn
        v-if="$route.name === 'sku-new'"
        elevation="0"
        color="#373b53"
        rounded
        form="edited-form"
        type="submit"
        id="draft"
        @click="newInvoice.status = 'draft'"
        title="Draft"
        aria-label="Draft"
        >Save as Draft</v-btn
      >
      <v-btn
        elevation="0"
        color="purple_500"
        rounded
        form="edited-form"
        type="submit"
        class="save"
        :title="saveMode ? 'Save & Send' : 'Save Changes'"
        :aria-label="saveMode ? 'Save & Send' : 'Save Changes'"
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
    snackbar: false,
    text: `Saved changes.`,
    text_error: null,
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
      items: {
        $each: {
          name: { required },
          quantity: { required },
          price: { required },
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
      this.$v.$touch();
      if (this.$v.$invalid) {
        Promise.resolve().then(() => {
          this.$scrollTo(".error--text", 500, {
            container: ".create-invoice",
            offset: -200,
          });
        });
        return (this.text_error = `- All fields must be added`);
      }

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

      // Wait until new item created in DOM
      Promise.resolve().then(() => {
        // Scrolling to the new item list added according to the index set
        this.$scrollTo(
          `.item--list__${this.newInvoice.items.length - 1}`,
          500,
          { container: ".create-invoice" }
        );
      });
    },
    deleteItem(i) {
      this.newInvoice.items.splice(i, 1);
    },
    reset(path) {
      return get(this.$v.newInvoice, path).$reset();
    },
    touch(path) {
      return get(this.$v.newInvoice, path).$touch();
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
@import "@/styles/colors.scss";

#edited-form {
  .v-text-field--rounded {
    border-radius: 4px !important;
  }

  .v-input {
    height: 50px !important;
  }
}

.save {
  max-width: 111px !important;
}

.created-invoice__buttons {
  display: flex !important;
  .v-btn {
    transition: all 0.2s ease;
    &:nth-child(2) {
      &:hover {
        background-color: $dark_500 !important;
      }
    }
    &:nth-child(3) {
      &:hover {
        background-color: $purple_400 !important;
      }
    }
  }
}

.mdi-delete {
  transition: all 0.3s ease !important;
  color: $blue-gray !important;

  &:hover {
    color: $warning !important;
  }
}

.text__error {
  color: $warning;
  font-size: 12px;
  font-weight: 600;
}

#input-88 {
  cursor: pointer !important;
}
</style>
