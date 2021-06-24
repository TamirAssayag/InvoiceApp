<template>
  <div class="modal">
    <v-dialog
      :value="value"
      overlay-opacity="0.45"
      overlay-color="#000"
      content-class="modal-dialog"
      @click:outside="$emit('onClose')"
    >
      <v-card>
        <v-card-text>
          <v-card-title> {{ title }} </v-card-title>
          <p class="modal-text"><slot /></p>
        </v-card-text>
        <Buttons class="modal-buttons">
          <v-btn
            elevation="0"
            color="#252945"
            rounded
            class="cancel"
            title="Cancel"
            aria-label="Cancel"
            @click="$emit('onClose')"
            >Cancel</v-btn
          >
          <v-btn
            elevation="0"
            color="#ec5757"
            rounded
            @click="$emit('onAction')"
            :title="action"
            :aria-label="action"
            class="action"
            >{{ action }}</v-btn
          >
        </Buttons>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Buttons from "../Invoices/Buttons.vue";
export default {
  components: { Buttons },
  name: "Modal",
  props: {
    value: Boolean,
    title: String,
    action: String,
  },
};
</script>

<style lang="scss">
@import "@/styles/colors.scss";
.modal {
  &-dialog {
    padding: 0 0 !important;
    width: 327px !important;
    overflow: hidden !important;
    border-radius: 8px !important;
    .v-card {
      padding: 32px 0 !important;
      background-color: $dark-300 !important;
      max-height: 220px !important;

      .theme--light & {
        background-color: white !important;
      }

      &__title {
        padding: 0 0 8px !important;
        font-weight: bold;
        line-height: 1.6;
        letter-spacing: -0.42px;
        color: #ffffff;

        .theme--light & {
          color: #0c0e16 !important;
        }
      }
    }
  }
  &-text {
    font-family: Spartan;
    font-size: 12px;
    font-weight: 500;
    line-height: 1.83;
    letter-spacing: -0.25px;
    color: $blue-gray;

    .theme--light & {
      color: $dark-blue-gray;
    }
  }

  &-buttons {
    background-color: unset !important;
    height: unset;
    width: 100% !important;
    margin-left: auto;
    margin-bottom: 1rem;
    box-shadow: unset !important;

    .invoice--buttons__wrapper {
      padding: 0 !important;
    }

    .invoice--buttons {
      justify-content: flex-end !important;
      padding: 0 32px !important;
    }

    .cancel,
    .action {
      width: 91px !important;
      height: 48px !important;
    }
  }
}
</style>
