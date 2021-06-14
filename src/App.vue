<template>
  <v-app>
    <Layout />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Layout from "./components/Layout.vue";
import "./styles/app.scss";
export default {
  components: { Layout },
  name: "App",

  data: () => ({
    //
  }),
};
</script>
