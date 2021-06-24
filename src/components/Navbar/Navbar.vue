<template>
  <div class="navbar">
    <v-app-bar color="navbar" flat dark>
      <div class="navbar--items">
        <div class="left" @click="getRoute('')">
          <inline-svg
            class="logo"
            :src="getImageUrl('logo.svg')"
            alt="Logo"
          ></inline-svg>
        </div>
        <div class="right">
          <v-btn
            icon
            small
            dark
            @click="toggleDarkMode"
            color="transparent"
            class="mode no-background-hover"
            :title="toggleModeTitle"
            :aria-label="toggleModeTitle"
          >
            <inline-svg
              :src="getImageUrl(toggleModeIcon)"
              :alt="toggleModeTitle"
              class="darkmode"
            />
          </v-btn>
          <div class="custom-divider"></div>
          <img
            class="user_avatar"
            alt="User"
            :src="getImageUrl('image-avatar.jpg')"
          />
        </div>
      </div>
    </v-app-bar>
  </div>
</template>

<script>
import "./navbar.scss";
export default {
  data: () => ({
    mode: ["Dark Mode", "Light Mode"],
  }),

  methods: {
    toggleDarkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
  },
  computed: {
    toggleModeTitle() {
      return !this.$vuetify.theme.dark ? this.mode[0] : this.mode[1];
    },

    toggleModeIcon() {
      return !this.$vuetify.theme.dark ? "icon-moon.svg" : "icon-sun.svg";
    },
  },
};
</script>

<style lang="scss">
.mode {
  .v-btn__content {
    svg {
      path {
        transition: 0.3s ease all;
        &:hover {
          fill: #dfe3fa;
        }
      }
    }
  }
}
</style>
