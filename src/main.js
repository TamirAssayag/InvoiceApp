import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

import InlineSvg from "vue-inline-svg";
Vue.component("inline-svg", InlineSvg);

// Mixins
import ImageUrlMixin from "./mixins/ImageUrlMixin";
import getRoute from "./mixins/getRoute";
import getDate from "./mixins/getDate";
Vue.mixin(ImageUrlMixin);
Vue.mixin(getRoute);
Vue.mixin(getDate);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
