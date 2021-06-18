<template>
  <div>
    <v-menu bottom offset-y id="filter-status" transition="scroll-y-transition">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="filter-btn"
          :ripple="false"
          color="transparent"
          id="no-background-hover"
          elevation="0"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon icon id="arrow-down"> mdi-chevron-down </v-icon>
          Filter
        </v-btn>
      </template>
      <v-list id="filter-dropdown">
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          @click="
            () => {
              filter(item);
            }
          "
        >
          <v-list-item-title>{{ item }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "FilterByStatus",
  data() {
    return {
      status: null,
      items: ["all", "paid", "pending", "draft"],
    };
  },
  methods: {
    ...mapActions({
      filter: "invoices/updateFilter",
    }),
  },
};
</script>

<style lang="scss">
.filter-btn {
  .v-btn__content {
    font-size: 12px;
    font-weight: bold;
    line-height: 1.25;
    letter-spacing: -0.25px;
    margin-bottom: -4px;
  }
}

#arrow-down {
  width: 100%;
  color: rgb(124, 93, 250);
  font-size: 18px;
  display: flex !important;
  align-items: center;
  gap: 2rem !important;
}

#filter-dropdown {
  max-width: 36px;
  margin: 0 !important;
  background-color: #141625 !important;

  .theme--light & {
    background-color: white !important;
  }

  .v-list-item {
    padding: 0 !important;
    font-size: 12px !important;
    width: 70px !important;
    padding: 0 0.5rem !important;

    &__title {
      text-transform: capitalize;
      font-size: 11px;
    }
  }

  .v-sheet {
    font-size: 12px !important;
    margin: 0 !important;
  }
}

.v-menu__content {
  box-shadow: 0 10px 10px 2px rgba(79, 88, 168, 0.048) !important;
  border-bottom-left-radius: 0.8rem !important;
  border-bottom-right-radius: 0.8rem !important;
  background-color: #141625 !important;
  width: 70px !important;

  .theme--light & {
    background-color: white !important;
    box-shadow: 0 5px 10px 2px rgba(21, 25, 58, 0.075) !important;
  }
}

#filter-status {
  padding: 0 !important;
}
</style>
