<template>
  <div
    class="status--button"
    :v-model="data"
    v-if="data"
    :class="[
      {
        'status--draft': data === 'draft',
        'status--paid': data === 'paid',
        'status--pending': data === 'pending',
      },
    ]"
  >
    <span class="status-dot" />
    {{ data }}
  </div>
</template>

<script>
export default {
  name: "Status",
  props: {
    data: String,
  },
};
</script>

<style lang="scss">
.status {
  &--button {
    text-transform: capitalize;
    display: flex;
    line-height: 1.25;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 12px;
    width: 104px;
    height: 40px;
    content: "";
    border-radius: 6px;
    gap: 0.5rem;
  }
}
.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: currentColor;
}
</style>
