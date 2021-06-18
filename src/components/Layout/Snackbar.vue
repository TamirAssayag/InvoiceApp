<template>
  <div class="text-center">
    <v-snackbar :timeout="4000" :value="value" @input="$emit('input')">
      <template v-if="text">
        {{ text }}
      </template>
      <template v-slot:action="{ attrs }">
        <v-btn color="indigo" text v-bind="attrs" @click="$emit('input')">
          Close
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
  &:not(.v-snack--centered):not(.v-snack--top) {
    // margin-bottom: 2rem !important;
  }
  &__wrapper {
    width: 100%;
    height: 91px;
    color: white !important;
    background-color: #363b5c !important;
    box-shadow: none !important;
    border-bottom-left-radius: unset !important;
    border-bottom-right-radius: unset !important;

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
