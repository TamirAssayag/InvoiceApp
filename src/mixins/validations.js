export default {
  computed: {
    streetFieldErrors() {
      const errors = [];
      const $v = this.$v.newInvoice.senderAddress.street;
      if (!$v.$dirty) {
        return errors;
      } else {
        !$v.required && errors.push("can't be empty");
      }
      return errors;
    },
    cityFieldError() {
      const errors = [];
      const $v = this.$v.newInvoice.senderAddress.city;
      if (!$v.$dirty) {
        return errors;
      } else {
        !$v.required && errors.push("can't be empty");
      }
      return errors;
    },
    postCodeError() {
      const errors = [];
      const $v = this.$v.newInvoice.senderAddress.postCode;
      if (!$v.$dirty) {
        return errors;
      } else {
        !$v.required && errors.push("can't be empty");
      }
      return errors;
    },
    countryError() {
      const errors = [];
      const $v = this.$v.newInvoice.senderAddress.country;
      if (!$v.$dirty) {
        return errors;
      } else {
        !$v.required && errors.push("can't be empty");
      }
      return errors;
    },
    clientStreetAddressError() {
      const errors = [];
      const $v = this.$v.newInvoice.clientAddress.street;
      if (!$v.$dirty) {
        return errors;
      } else {
        !$v.required && errors.push("can't be empty");
      }
      return errors;
    },
    clientNameError() {
      const errors = [];
      const $v = this.$v.newInvoice.clientName;
      if (!$v.$dirty) {
        return errors;
      } else {
        !$v.required && errors.push("can't be empty");
      }
      return errors;
    },
    emailErrors() {
      const errors = [];
      const $v = this.$v.newInvoice.clientEmail;
      if (!$v.$dirty) return errors;
      !$v.email && errors.push("Must be valid e-mail");
      !$v.required && errors.push("E-mail can't be empty");
      return errors;
    },
    clientCityError() {
      const errors = [];
      const $v = this.$v.newInvoice.clientAddress.city;
      if (!$v.$dirty) {
        return errors;
      } else {
        !$v.required && errors.push("can't be empty");
      }
      return errors;
    },
    clientPostCodeError() {
      const errors = [];
      const $v = this.$v.newInvoice.clientAddress.postCode;
      if (!$v.$dirty) {
        return errors;
      } else {
        !$v.required && errors.push("can't be empty");
      }
      return errors;
    },
    clientCountryError() {
      const errors = [];
      const $v = this.$v.newInvoice.clientAddress.country;
      if (!$v.$dirty) {
        return errors;
      } else {
        !$v.required && errors.push("can't be empty");
      }
      return errors;
    },
    createdAtError() {
      const errors = [];
      const $v = this.$v.newInvoice.createdAt;
      if (!$v.$dirty) {
        return errors;
      } else {
        !$v.required && errors.push("can't be empty");
      }
      return errors;
    },
    paymentTermsError() {
      const errors = [];
      const $v = this.$v.newInvoice.paymentTerms;
      if (!$v.$dirty) {
        return errors;
      } else {
        !$v.required && errors.push("can't be empty");
      }
      return errors;
    },
    descriptionError() {
      const errors = [];
      const $v = this.$v.newInvoice.description;
      if (!$v.$dirty) {
        return errors;
      } else {
        !$v.required && errors.push("can't be empty");
      }
      return errors;
    },
  },
};
