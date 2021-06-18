export default {
  methods: {
    goHome() {
      if (!this.isOpen) return;
      this.isOpen = false;
      setTimeout(() => this.$router.go(-1), 160);
    },
    addDays(date, days) {
      const result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    },
    getGrandTotal(items) {
      let sum = 0;
      items.forEach((item) => (sum += item.total));
      return sum;
    },
  },
};
