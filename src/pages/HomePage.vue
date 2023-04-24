<template>
  <VContainer fluid>
    <VContainer class="container">
      <v-col cols="3">
        <datepicker
          v-model="selected"
          class="datepicker"
          :upper-limit="selected"
      /></v-col>
      <v-col cols="3">
        <v-autocomplete
          v-model="values"
          :items="options"
          label="Sort"
        ></v-autocomplete>
      </v-col>
    </VContainer>
    <v-list>
      <h3 align="center">Exchange Rates for {{ selectedDate }}</h3>
      <v-list-item v-for="item of ratesStore.ratez" :key="item.title">
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
              <v-btn class="ma-2" variant="text" icon="mdi-thumb-up"></v-btn>
            </v-col>
          </v-row>
        </template>
      </v-list-item>
    </v-list>
  </VContainer>
</template>
<script>
import { ref, computed } from "vue";
import Datepicker from "vue3-datepicker";
import { useRatesStore } from "../store/RatesStore";

export default {
  components: {
    Datepicker,
  },
  data() {
    return {
      loading: false,
      options: [
        { value: "fullname", name: "By name" },
        { value: "title", name: "By code" },
      ],
    };
  },
  setup() {
    const ratesStore = useRatesStore();
    const selected = ref(new Date());
    const selectedDate = computed(() =>
      selected.value.toLocaleString().slice(0, 10)
    );
    return { ratesStore, selected, selectedDate };
  },
  mounted() {
    this.ratesStore.getRates(this.selectedDate);
  },
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
</style>
