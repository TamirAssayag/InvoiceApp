<template>
  <div class="goback" @click="$router.go(-1)">
    <inline-svg :src="getImageUrl('icon-arrow-left.svg')"></inline-svg>
    <span>Go back</span>
  </div>
</template>

<script>
export default {
  name: "GoBackBtn",
};
</script>

<style lang="scss">
.goback {
  min-height: 4.9rem;
  display: flex;
  justify-content: left;
  align-items: center;
  cursor: pointer;
  gap: 21px;
  padding: 0 1.5rem;

  span {
    font-size: 12px;
    font-weight: bold;
    line-height: 1.25;
    letter-spacing: -0.25px;
    transition: all 0.2s ease;

    &:hover,
    &:active {
      color: #888eb0;
    }
  }
}
</style>
