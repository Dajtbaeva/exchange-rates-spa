<template>
  <v-app-bar color="#fff">
    <v-img
      src="https://www.nationalbank.kz/site/img/logo/logo-abbr-en.svg?v=1.2"
      height="30"
      max-width="80"
      style="margin-left: 50px; pointer: cursor"
      @click="$router.push('/')"
    ></v-img>
    <v-app-bar-title>National Bank of Kazakhstan</v-app-bar-title>
    <v-spacer></v-spacer>
    <v-btn icon @click="$router.push('/favourites')">
      <v-icon>mdi-heart</v-icon>
    </v-btn>
  </v-app-bar>
</template>
<script>
export default {
  setup() {},
};
</script>
