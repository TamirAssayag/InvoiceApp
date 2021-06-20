import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  breakpoint: {
    thresholds: {
      xs: 400,
      sm: 768,
      lg: 1440,
      xl: 1920,
    },
  },
  theme: {
    // dark: true,
    themes: {
      dark: {
        primary: "#FFF",
        secondary: "#424242",
        accent: "#82B1FF",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107",
        navbar: "#1e2139",
        purple_500: "#7c5dfa",
      },
      light: {
        primary: "#1e2139",
        secondary: "#424242",
        accent: "#82B1FF",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107",
        navbar: "#373b53",
        purple_500: "#7c5dfa",
      },
    },
  },
});
