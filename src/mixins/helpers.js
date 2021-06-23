import mapValues from "lodash/mapValues";
import { mapGetters } from "vuex";

export default {
  methods: {
    getTwoDigits(number) {
      if (number)
        return number.toLocaleString("en", {
          minimumFractionDigits: 2,
        });
    },
    getDate(param) {
      if (param) return this.$dayjs(param).format("D MMM YYYY");
    },
    logConsole(param) {
      return console.log(param);
    },

    /**
     * @param {*} obj - recieves an object, and covert all values to null
     * @returns same object structure only with null values
     */
    recursiveClearValues(obj) {
      return mapValues(obj, (val) => {
        if (typeof val === "object") {
          return this.recursiveClearValues(val);
        } else {
          return null;
        }
      });
    },

    /**
     * @param {*} arr - recieves an an array, and convert all array object to null
     * @returns same array structure only with null object values
     */
    recursiveClearArrayValues(arr) {
      return arr?.map((x) => this.recursiveClearValues(x));
    },
  },

  computed: {
    ...mapGetters({ getInvoiceById: "invoices/getInvoiceById" }),
    invoice() {
      return this.getInvoiceById(this.$route.params.id);
    },
  },
};
