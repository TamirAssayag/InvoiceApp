<template>
  <header class="invoices_header">
    <div class="header_left">
      <h3 class="invoices_title">Invoices</h3>
      <p class="invoices_amount">7 invoices</p>
    </div>
    <div class="header_right">
      <h4 class="filter">Filter</h4>
      <v-btn
        icon
        color="transparent"
        elevation="0"
        x-small
        plain
        class="arrow-down"
      >
        <inline-svg :src="getImageUrl('icon-arrow-down.svg')"></inline-svg>
      </v-btn>
      <div class="add">
        <v-btn elevation="0" class="new_invoice">
          <li>New</li>
          <li icon class="plus">
            <inline-svg :src="getImageUrl('icon-plus.svg')"></inline-svg>
          </li>
        </v-btn>
      </div>
    </div>
  </header>
</template>

<script>
// import data from "./../../json/data.json";
export default {
  name: "Invoices",
  // data: () => ({
  //   myJson: data,
  // }),
};
</script>

<style lang="scss">
.invoices_header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .theme--light & {
    .header_right {
      li {
        color: white;
      }
    }

    .invoices_amount {
      color: #888eb0;

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
  margin-bottom: 0.8rem;

  .filter {
    font-size: 12px;
    font-weight: bold;
    line-height: 1.25;
    letter-spacing: -0.25px;
    margin-bottom: -4px;
  }

  .arrow-down {
    margin-right: 5px;
    margin-bottom: -4px;
  }

  .add {
    li {
      &:nth-of-type(1) {
        margin-left: 0.4rem;
      }
    }
    .new_invoice {
      justify-content: flex-end;
      width: 90px;
      height: 44px;
      border-radius: 24px;
      background-color: #7c5dfa;
      font-size: 12px;
      font-weight: bold;
      line-height: 1.25;
      letter-spacing: -0.25px;
      padding: 0 0rem 0 0.4rem !important;
      margin-top: 0.5rem;
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
