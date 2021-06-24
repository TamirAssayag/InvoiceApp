<template>
  <div>
    <v-menu
      bottom
      offset-y
      :close-on-content-click="false"
      id="filter-status"
      transition="scroll-y-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="filter-btn no-background-hover"
          :ripple="false"
          color="transparent"
          elevation="0"
          v-bind="attrs"
          v-on="on"
          title="Filter by status"
          aria-label="Filter by status"
        >
          <v-icon icon id="arrow-down"> mdi-chevron-down </v-icon>
          {{
            $vuetify.breakpoint.xs || $vuetify.breakpoint.sm
              ? "Filter"
              : "Filter by status"
          }}
        </v-btn>
      </template>

      <v-list id="filter-dropdown">
        <v-checkbox
          v-for="(key, i) in Object.keys(items)"
          :key="key + i"
          :label="key"
          hide-details
          color="purple_500"
          v-model="items[key]"
        />
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import "./filter.scss";
import { mapActions } from "vuex";
export default {
  name: "FilterByStatus",
  data: () => ({
    status: null,
    items: {
      paid: false,
      pending: false,
      draft: false,
    },
    checkedItems: "",
  }),

  methods: {
    ...mapActions({
      filter: "invoices/updateFilter",
    }),
  },

  watch: {
    items: {
      deep: true,
      immediate: true,
      handler(value) {
        this.filter(value);
      },
    },
  },
};
</script>

<style lang="scss"></style>
