import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  customVariables: ["~/styles/variables.scss"],
  theme: {
    options: {
      customProperties: true,
    },
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
      },
    },
  },
});
