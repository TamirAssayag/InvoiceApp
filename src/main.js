import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Dayjs from "vue-dayjs";
import "@/styles/app.scss";
import Vuelidate from "vuelidate";

import InlineSvg from "vue-inline-svg";
Vue.component("inline-svg", InlineSvg);

Vue.use(Dayjs);
Vue.use(Vuelidate);

// Mixins
import ImageUrlMixin from "./mixins/ImageUrlMixin";
import getRoute from "./mixins/getRoute";
import helpers from "./mixins/helpers";
import AppMixin from "./mixins/AppMixin";
Vue.mixin(ImageUrlMixin);
Vue.mixin(getRoute);
Vue.mixin(helpers);
Vue.mixin(AppMixin);

Vue.config.productionTip = false;

new Vue({
  created() {
    const theme = JSON.parse(localStorage.getItem("theme"));
    if (localStorage.getItem("theme")) {
      this.$vuetify.theme.dark = theme;
    } else if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      this.$vuetify.theme.dark = true;
    } else {
      this.$vuetify.theme.dark = false;
    }
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        this.$vuetify.theme.dark = e.matches ? true : false;
      });
  },

  watch: {
    "$vuetify.theme": {
      deep: true,
      handler: function (value) {
        localStorage.setItem("theme", value.isDark);
      },
    },
  },

  render: (h) => h(App),
  router,
  store,
  vuetify,
}).$mount("#app");
