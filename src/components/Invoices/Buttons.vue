<template>
  <div class="invoice--buttons__container">
    <div class="invoice--buttons__wrapper">
      <div class="invoice--buttons">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Buttons",
};
</script>

<style lang="scss">
@import "@/styles/colors.scss";
@import "@/styles/import";
.invoice--buttons__container {
  width: 100%;
  background-color: $dark-300;
  height: 91px;
  display: flex;
  align-items: center;

  .theme--light & {
    background-color: white;
    box-shadow: 0 10px 110px rgba(0, 0, 0, 0.295);
  }
}
.invoice--buttons__wrapper {
  width: 100%;
  padding: 0 1.5rem;
}
.invoice--buttons {
  display: flex;
  justify-content: space-between;
  gap: 8px;

  .v-btn {
    flex: 1;
    padding: 24px 0 !important;
    &__content {
      font-size: 12px !important;
      font-weight: bold !important;
      line-height: 1.25 !important;
      letter-spacing: -0.25px !important;
      color: $light-blue-gray;

      .theme--light & {
        color: white !important;
      }
    }

    &:nth-child(1) {
      max-width: 84px;
      .theme--light & {
        background-color: #f9fafe !important;

        .v-btn__content {
          color: $dark-blue-gray !important;
        }
      }
    }

    &:nth-child(2) {
      max-width: 89px;
    }

    &:nth-child(3) {
      max-width: 149px;
    }
  }
  #draft {
    max-width: 117px !important;

    .theme--light & {
      .v-btn__content {
        color: $blue-gray !important;
      }
    }
  }
}
</style>
