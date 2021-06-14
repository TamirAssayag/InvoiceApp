<template>
  <div class="cards">
    <div class="invoices_card" v-for="data in myJson" :key="data.id">
      <div class="invoices_card--info">
        <li class="sku-number">#{{ data.id }}</li>
        <li class="addressee">{{ data.clientName }}</li>
      </div>
      <div class="invoices_card--info--bottom">
        <div class="invoices_information">
          <li class="due-date">Due {{ data.paymentDue }}</li>
          <li class="fee">
            £
            {{ data.total.toLocaleString("en", { minimumFractionDigits: 2 }) }}
          </li>
        </div>
        <div class="invoices_status">
          <div class="status">
            <div
              class="status-dot"
              :style="[
                data.status === 'paid'
                  ? { backgroundColor: statusColor[0] }
                  : data.status === 'pending'
                  ? { backgroundColor: statusColor[1] }
                  : { backgroundColor: statusColor[2] },
              ]"
            ></div>
            <li
              :style="[
                data.status === 'paid'
                  ? { color: statusColor[0] }
                  : data.status === 'pending'
                  ? { color: statusColor[1] }
                  : { color: statusColor[2] },
              ]"
            >
              {{ data.status }}
            </li>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import data from "../../json/data.json";

export default {
  data: () => ({
    myJson: data,
    statusColor: ["#33d69f", "#ff8f00", "#dfe3fa"],
  }),
};
</script>

<style lang="scss">
.cards {
  display: grid;
  place-items: center;
  gap: 1rem;
  margin: 1rem 0;
  .invoices_card {
    width: 327px;
    min-height: 134px;
    border-radius: 8px;
    box-shadow: 0 10px 10px -10px rgba(72, 84, 159, 0.1);
    background-color: #1e2139;
    padding: 1.5rem 1.5rem 0;

    &--info {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.8rem;

      .sku-number,
      .addressee {
        font-size: 12px;
        line-height: 1.25;
        letter-spacing: -0.25px;
      }
    }

    &--info--bottom {
      margin-top: 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .due-date {
        margin-bottom: 0.5rem;
        font-size: 12.5px;
        font-weight: 500;
        line-height: 1.25;
        letter-spacing: -0.25px;
      }
      .fee {
        font-size: 16px;
        font-weight: 600;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.5;
        letter-spacing: -0.8px;
      }

      .invoices_status {
        z-index: 500;
        .status {
          width: 104px;
          height: 40px;
          display: flex;
          position: relative;
          justify-content: center;
          align-items: center;
          font-size: 12px;
          line-height: 1.25;
          letter-spacing: -0.25px;
          // color: #33d69f;
          font-weight: bold;
          gap: 0.5rem;
          text-transform: capitalize;

          &:after {
            width: 100%;
            height: 100%;
            content: "";
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            border-radius: 6px;
            background-color: #33d69f;
            opacity: 0.06;
            z-index: 600;
          }
        }
        .status-dot {
          width: 8px;
          height: 8px;
          background-color: #33d69f;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>
