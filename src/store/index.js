import Vue from "vue";
import Vuex from "vuex";
import invoices from "@/store/modules/invoices";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    invoices,
  },
});
