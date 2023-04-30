<template v-slot:default>
  <v-row align="center" class="card">
    <v-col cols="1" align="center">
      <v-img :src="item.icon" height="25" width="70"></v-img>
    </v-col>
    <v-col cols="5">
      <v-list-item-text
        >{{ item.quant }} {{ item.fullname }}</v-list-item-text
      ></v-col
    >
    <v-col cols="3">
      <v-list-item-text>{{ item.title }} / KZT</v-list-item-text>
    </v-col>
    <v-col cols="2">
      <v-list-item-text v-text="item.description"></v-list-item-text
    ></v-col>
    <v-col cols="1" class="text-right">
      <v-btn
        class="ma-2"
        variant="text"
        :icon="item.isLiked ? 'mdi-thumb-down' : 'mdi-thumb-up'"
        @click="item.isLiked ? unlikeRate() : likeRate()"
        :color="item.isLiked ? 'red-lighten-2' : 'blue-lighten-2'"
      ></v-btn>
    </v-col>
  </v-row>
</template>
<script>
import { useRatesStore } from "../store/RatesStore";

export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const ratesStore = useRatesStore();
    const likeRate = () => {
      ratesStore.likeRate(props.item);
      console.log("from like" + props.item);
    };
    const unlikeRate = () => {
      ratesStore.unlikeRate(props.item);
      console.log("from unlike " + props.item.title);
    };
    return { likeRate, unlikeRate };
  },
};
</script>
<style scoped></style>
