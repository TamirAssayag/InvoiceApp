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
          {{
            $vuetify.breakpoint.xs || $vuetify.breakpoint.sm
              ? "Filter"
              : "Filter by status"
          }}
        </v-btn>
      </template>

      <v-list id="filter-dropdown">
        <v-checkbox
          v-for="(item, i) in items"
          :key="i"
          :label="item"
          hide-details
          color="purple_500"
          :value="item"
          v-model="checkedItems"
          @click="
            () => {
              if (!checkedItems) return filter((item = 'all'));
              filter(item);
            }
          "
        ></v-checkbox>
        <!-- <v-list-item
          v-for="(item, i) in items"
          :key="i"
          @click="
            () => {
              filter(item);
            }
          "
        >
          <v-list-item-title>{{ item }}</v-list-item-title>
        </v-list-item> -->
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import "./filter.scss";
import { mapActions } from "vuex";
export default {
  name: "FilterByStatus",
  data() {
    return {
      status: null,
      items: ["paid", "pending", "draft"],
      checkedItems: "",
    };
  },
  methods: {
    ...mapActions({
      filter: "invoices/updateFilter",
    }),
  },
};
</script>

<style lang="scss"></style>
