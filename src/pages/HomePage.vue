<template>
  <v-container fluid>
    <v-container class="container">
      <v-col cols="3">
        <datepicker
          v-model="selectedDay"
          class="datepicker"
          :upper-limit="Date.now()"
      /></v-col>
      <v-col cols="3">
        <v-autocomplete
          v-model="selectedOption"
          :items="options"
          label="Sort"
        ></v-autocomplete>
      </v-col>
    </v-container>
    <v-list v-if="!loading">
      <h3 align="center">Exchange Rates for {{ selectedDate }}</h3>
      <v-list-item>
        <RateItem v-for="item of sortedRates" :key="item.title" :item="item" />
      </v-list-item>
    </v-list>
    <h3 align="center" v-else>Loading...</h3>
  </v-container>
</template>
<script>
import Datepicker from "vue3-datepicker";
import { useRates } from "../hooks/useRates";
import useSortedRates from "../hooks/useSortedRates";
import RateItem from "../components/RateItem.vue";

export default {
  components: {
    Datepicker,
    RateItem,
  },
  data() {
    return {
      options: [
        { value: "fullname", title: "By name" },
        { value: "title", title: "By code" },
      ],
    };
  },
  setup() {
    // const {
    //   loading,
    //   ratez,
    //   likedRates,
    //   totalRates,
    //   getRates,
    //   toggleLiked,
    //   unlikeRate,
    // } = useRatesStore();
    // const selectedOption = ref("");
    // const selectedDay = ref(new Date());
    // const selectedDate = computed(() =>
    //   selectedDay.value.toLocaleString().slice(0, 10)
    // );
    const { loading, ratez, selectedDay, selectedDate } = useRates();
    const { selectedOption, sortedRates } = useSortedRates(ratez);
    // const sortedRates = computed(() => {
    //   return [...ratez].sort((r1, r2) =>
    //     r1[selectedOption.value]?.localeCompare(r2[selectedOption.value])
    //   );
    // });

    // watch(selectedDate, (newValue) => {
    //   console.log("This is from watch:" + selectedDate);
    //   getRates(newValue);
    // });
    return {
      loading,
      ratez,
      selectedDay,
      selectedOption,
      selectedDay,
      selectedDate,
      sortedRates,
    };
  },
  // mounted() {
  //   this.getRates(this.selectedDate);
  // },
  // watch: {
  //   selectedDate(newValue) {
  //     console.log(newValue);
  //     this.ratez.sort((r1, r2) => {
  //       return r1[newValue]?.localeCompare(r2[newValue]);
  //     });
  //   },
  // },
};
</script>
<style>
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  /* margin: 0; */
  padding: 0;
}
.datepicker {
  border: 1px solid #000000;
  width: 100%;
  height: 50%;
}
.card {
  border: 1px solid #5f5f5f;
  margin: 0;
  padding: 0;
}
h3 {
  margin-bottom: 30px;
}
</style>
