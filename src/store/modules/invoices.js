const state = {
  invoices: [],
  filter: [],
};

const mutations = {
  setInvoices(state, payload) {
    state.invoices = payload;
  },
  saveInvoiceById(state, { id, data }) {
    const identifier = state.invoices.findIndex((i) => i.id === id);
    state.invoices[identifier] = data;
  },
  updateStatusById(state, { id, status }) {
    /* finding the index of invoice id that is matching to the $route.params.id
     then updating the status value that matches the invoice id */
    const identifier = state.invoices.findIndex((i) => i.id === id);
    state.invoices[identifier].status = status;
  },
  addInvoice(state, data) {
    // Pushing to the invoices array the new invoice object
    state.invoices.push(data);
  },
  deleteInvoice(state, id) {
    // keeps all invoices except for that specific invoice.id that matches $route.params.id
    state.invoices = state.invoices.filter((invoice) => invoice.id !== id);
  },
  updateFilter(state, payload) {
    state.filter = payload;
  },
};

const saveToLs = () =>
  localStorage.setItem("invoices", JSON.stringify(state.invoices));

const actions = {
  setInvoices({ commit }, payload) {
    commit("setInvoices", payload);
    saveToLs();
  },
  saveInvoiceById({ commit }, { id, data }) {
    commit("saveInvoiceById", { id, data });
    saveToLs();
  },
  updateStatusById({ commit }, { id, status }) {
    commit("updateStatusById", { id, status });
    saveToLs();
  },
  addInvoice({ commit }, data) {
    commit("addInvoice", data);
    saveToLs();
  },
  deleteInvoice({ commit }, id) {
    commit("deleteInvoice", id);
    saveToLs();
  },
  updateFilter({ commit }, filter) {
    commit("updateFilter", filter);
  },
};

const getters = {
  getInvoices: (state) => state.invoices,
  getInvoiceById(state) {
    return (id) => {
      return state.invoices.find((invoice) => invoice.id === id);
    };
  },
  getFilter: (state) => state.filter,
  invoicesByFilter: (state) => {
    const noFilters = !Object.values(state.filter).some(Boolean);
    if (noFilters) return state.invoices;

    return state.invoices.filter((invoice) =>
      Object.entries(state.filter).some(
        ([key, value]) => key === invoice.status && value
      )
    );
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
