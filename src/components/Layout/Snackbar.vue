<template>
  <div class="text-center">
    <v-snackbar :timeout="4000" :value="value" @input="$emit('input')">
      <template v-if="text">
        {{ text }}
      </template>
      <template v-slot:action="{ attrs }">
        <v-btn
          icon
          small
          color="indigo"
          text
          v-bind="attrs"
          @click="$emit('input')"
          title="Close"
          aria-label="Close"
        >
          X
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  props: {
    value: Boolean,
    text: String,
  },
};
</script>

<style lang="scss">
.v-snack {
  .v-btn__content {
    color: rgb(230, 230, 230) !important;
    text-decoration: none !important;
    font-weight: bold;
    font-size: 12px;
  }
  &__wrapper {
    width: 50%;
    height: 80px;
    color: white !important;
    background-color: #363b5c !important;
    box-shadow: none !important;
    border-radius: 1rem !important;

    .theme--light & {
      color: #373b53 !important;
      background-color: white !important;
    }
  }
  &__content {
    letter-spacing: 0em !important;
    font-weight: bold !important;
  }
}
</style>
