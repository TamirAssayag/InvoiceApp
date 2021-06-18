import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Dayjs from "vue-dayjs";
import "@/styles/app.scss";

import InlineSvg from "vue-inline-svg";
Vue.component("inline-svg", InlineSvg);

Vue.use(Dayjs);

// Mixins
import ImageUrlMixin from "./mixins/ImageUrlMixin";
import getRoute from "./mixins/getRoute";
import helpers from "./mixins/helpers";
Vue.mixin(ImageUrlMixin);
Vue.mixin(getRoute);
Vue.mixin(helpers);

Vue.config.productionTip = false;

new Vue({
  created() {
    const theme = JSON.parse(localStorage.getItem("theme"));
    if (localStorage.getItem("theme")) {
      this.$vuetify.theme.dark = theme;
    } else {
      this.$vuetify.theme.dark = false;
    }
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
