<template>
  <v-container fluid>
    <v-list>
      <h3 align="center">Your favourite exchange rates</h3>
      <v-list-item>
        <RateItem v-for="item of favRatez" :key="item.title" :item="item" />
      </v-list-item>
    </v-list>
    <!-- <h3 align="center" v-else>You haven't favourite exchange rates yet!</h3> -->
  </v-container>
</template>
<script>
import { useRatesStore } from "../store/RatesStore";

export default {
  setup() {
    const { favRatez } = useRatesStore();

    return { favRatez };
  },
};
</script>
