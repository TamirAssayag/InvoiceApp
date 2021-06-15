export default {
  methods: {
    getRoute(page) {
      const path = `/${page || ""}`;
      if (this.$route.path !== path) this.$router.push(path);
    },
  },
};
