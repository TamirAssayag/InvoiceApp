<template>
  <div class="navbar">
    <v-app-bar color="navbar" flat dark>
      <ul class="navbar--items">
        <div class="left" @click="getRoute('')">
          <inline-svg class="logo" :src="getImageUrl('logo.svg')"></inline-svg>
        </div>
        <div class="right">
          <v-btn
            v-if="!$vuetify.theme.dark"
            icon
            small
            dark
            plain
            @click="toggleDarkMode"
          >
            <inline-svg
              :src="getImageUrl('icon-moon.svg')"
              :title="toggleModeTitle"
            ></inline-svg>
          </v-btn>
          <v-btn v-else icon small dark plain @click="toggleDarkMode">
            <inline-svg
              :src="getImageUrl('icon-sun.svg')"
              :title="toggleModeTitle"
            ></inline-svg>
          </v-btn>
          <v-divider vertical />
          <img class="user_avatar" :src="getImageUrl('image-avatar.jpg')" />
        </div>
      </ul>
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
  },
};
</script>

<style lang="scss"></style>
