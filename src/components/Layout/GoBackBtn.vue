<template>
  <div class="goback--wrapper">
    <div class="goback--button" @click="$router.go(-1)">
      <v-icon color="purple_500">mdi-chevron-left</v-icon>
      <span>Go back</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoBackBtn",
};
</script>

<style lang="scss">
@import "@/styles/import";
@import "@/styles/colors.scss";

.v-dialog--fullscreen {
  @include media(">=lg") {
    .goback {
      display: none;
    }
  }
}

.goback--wrapper {
  min-height: 4.9rem;
  display: flex;
  align-items: center;
  padding: 0 1.5rem;

  .goback--button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;

    .mdi-chevron-left {
      margin-bottom: 2px;
      font-size: 18px;
    }

    &:hover,
    &:active {
      color: $blue-gray;
    }
  }

  span {
    font-size: 12px;
    font-weight: bold;
    letter-spacing: -0.25px;
    transition: all 0.2s ease;
  }
}
</style>
