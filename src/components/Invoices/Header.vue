<template>
  <header class="invoices_header">
    <div class="header_left">
      <h3 class="invoices_title">Invoices</h3>
      <p class="invoices_amount">
        {{ displayInvoiceAmount }}
      </p>
    </div>
    <div class="header_right">
      <FilterByStatus />
      <div class="add">
        <v-btn
          elevation="0"
          class="new_invoice"
          @click="$router.push({ name: 'sku-new' })"
          aria-label="New Invoice"
          title="New Invoice"
        >
          <li>
            {{
              $vuetify.breakpoint.xs || $vuetify.breakpoint.sm
                ? "New"
                : "New Invoice"
            }}
          </li>
          <li icon class="plus">
            <inline-svg
              :src="getImageUrl('icon-plus.svg')"
              alt="plus"
            ></inline-svg>
          </li>
        </v-btn>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from "vuex";
import FilterByStatus from "../Layout/Filter/FilterByStatus.vue";
export default {
  components: { FilterByStatus },
  name: "Invoices",
  data: () => ({}),
  computed: {
    ...mapGetters({
      invoicesByFilter: "invoices/invoicesByFilter",
      filter: "invoices/getFilter",
    }),
    displayInvoiceAmount() {
      if (this.invoicesByFilter.length) {
        if (
          !this.$vuetify.breakpoint.xs &&
          !this.$vuetify.breakpoint.sm & this.noFilters
        ) {
          return `There are ${this.invoicesByFilter.length} total Invoices`;
        } else {
          if (this.noFilters) {
            return `${this.invoicesByFilter.length} Invoices`;
          } else {
            return `${this.invoicesByFilter.length} ${Object.values(
              this.activeFilters
            ).join(", ")} Invoices`;
          }
        }
      } else {
        return `No ${!this.noFilters ? this.filter : ""} Invoices`;
      }
    },
  },
};
</script>

<style lang="scss">
@import "@/styles/import";
@import "@/styles/colors.scss";

.invoices_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1.5rem 0;
  padding: 0 1.5rem;

  @include media(">=md") {
    min-height: 196px;
    max-width: 730px;
    margin: 0 auto;
    padding: 0;
  }

  .theme--light & {
    .header_right {
      li {
        color: white;
      }
    }

    .invoices_amount {
      color: $blue-gray;

      font-weight: normal;
    }
  }
}
.header_left {
  .invoices_title {
    font-size: 20px;
    font-weight: bold;
    letter-spacing: -0.63px;
    margin-top: -4px;

    @include media(">=md") {
      font-size: 2rem;
    }
  }
  .invoices_amount {
    font-size: 12px;
    font-weight: 300;
    color: #dfe3fa;
  }
}

.header_right {
  width: 49.8%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // margin-bottom: 0.8rem;

  @include media(">sm") {
    justify-content: flex-end;
    gap: 3rem;
  }

  #arrow-down {
    margin-left: 5px;
  }

  .add {
    li {
      &:nth-of-type(1) {
        margin-left: 0.4rem;
      }
    }
    .new_invoice {
      justify-content: flex-end;
      min-width: 90px;
      height: 44px;
      border-radius: 24px;
      background-color: $purple-500;
      font-size: 12px;
      font-weight: bold;
      line-height: 1.25;
      letter-spacing: -0.25px;
      padding: 0 0rem 0 0.4rem !important;
      transition: all 0.3s ease !important;

      &:hover {
        background-color: $purple_400;
      }

      @include media(">=md") {
        padding: 0.5rem 0.93rem 0.5rem 0.5rem !important;
      }
    }

    .plus {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 32px;
      height: 32px;
      background-color: white;
      border-radius: 24px;
    }
  }
}
</style>
