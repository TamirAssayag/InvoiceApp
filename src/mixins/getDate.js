export default {
  methods: {
    getDate(param) {
      const date = new Date(param).toLocaleDateString("en", {
        year: "numeric",
        day: "numeric",
        month: "short",
      });
      return date;
    },
  },
};
