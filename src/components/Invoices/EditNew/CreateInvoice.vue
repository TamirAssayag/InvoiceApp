<template>
  <section>
    <v-fade-transition>
      <v-overlay v-if="isOpen" :opacity="0.6" z-index="100" color="black">
        <v-dialog
          v-model="isOpen"
          no-click-animation
          content-class="create-invoice"
          persistent
          transition="dialog-bottom-transition"
          mobile-breakpoint="0"
          fullscreen
          @keydown.esc="goHome"
          @click:outside="goHome"
        >
          <div class="createInvoice">
            <GoBackBtn class="goback-invoice" />
            <Form />
          </div>
        </v-dialog>
      </v-overlay>
    </v-fade-transition>
  </section>
</template>

<script>
import "./create_invoice.scss";
import GoBackBtn from "../../Layout/GoBackBtn.vue";
import Form from "./Form.vue";
export default {
  components: { GoBackBtn, Form },
  name: "CreatInvoice",
  data: () => ({
    isOpen: true,
  }),
  computed: {
    saveMode() {
      return this.$route.name === "sku-new";
    },
  },

  watch: {
    "$route.name"(name) {
      this.isOpen = name === "sku-new";
    },
  },

  created() {
    document.querySelector("body").classList.add("popup-open");
    document.querySelector("html").classList.add("popup-open");
  },

  destroyed() {
    document.querySelector("body").classList.remove("popup-open");
    document.querySelector("html").classList.remove("popup-open");
  },
};
</script>
<style lang="scss">
@import "@/styles/import";

.create-invoice {
  border-radius: 0rem !important;
  opacity: 1 !important;
  max-width: 100% !important;
  background-color: #141625 !important;

  .goback-invoice {
    @include media(">md") {
      margin: 2rem 0;
      min-height: 3rem;
      display: none;
    }
  }

  .invoice--buttons__container {
    @include media(">=md") {
      position: fixed !important;
      bottom: 0;
      max-width: 712px;
      height: 110px;
      border-top-right-radius: 1rem;
      border-top-left-radius: 1rem;
    }

    @include media(">=lg") {
      position: unset !important;
      box-shadow: none !important;
      background-color: unset !important;
      align-items: flex-start;
      height: 80px;
    }

    .invoice--buttons {
      @include media(">md") {
        justify-content: flex-end;
      }
    }
    .invoice--buttons__wrapper {
      @include media(">md") {
        padding: 0 3.5rem;
      }
    }
  }

  @include media(">=md") {
    max-width: 719px !important;
    top: 80px !important;
    max-height: calc(100% - 80px) !important;
  }

  @include media(">=lg") {
    max-width: 719px !important;
    max-height: 100% !important;
    top: 0 !important;
  }

  .theme--light & {
    background-color: white !important;
  }
}

.v-dialog--fullscreen {
  margin: unset !important;
  width: 100% !important;
  border-radius: 0rem !important;

  @include media(">lg") {
    margin-left: 103px !important;
    z-index: 300;
  }
}

.buttons {
  .v-btn {
    &:nth-child(1) {
      max-width: 138px !important;
    }
    &:nth-child(2) {
      max-width: 138px !important;
    }
  }
}
</style>
