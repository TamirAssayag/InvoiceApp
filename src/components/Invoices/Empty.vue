<template>
  <div class="empty">
    <img
      class="empty--illustration"
      :src="getImageUrl('illustration-empty.svg')"
    />
    <h3 class="empty--title">There is nothing here</h3>
    <p class="empty--text">
      Create an invoice by clicking the <strong>New</strong> button and get
      started
    </p>
  </div>
</template>

<script>
export default {
  name: "Empty",
  data: () => ({}),
};
</script>

<style lang="scss">
.empty {
  height: 457px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &--illustration {
    height: 160px;
    margin-bottom: 2.5rem;
  }

  &--title {
    margin-bottom: 1.5rem;
  }

  &--text {
    width: 199px;
    font-size: 12px;
    font-weight: 500;
    line-height: 1.25;
    letter-spacing: -0.25px;
    text-align: center;
    color: #dfe3fa;

    .theme--light & {
      color: #888eb0;
    }
  }
}
</style>
