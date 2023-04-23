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
          :items="items"
          label="Sort"
        ></v-autocomplete>
      </v-col>
    </VContainer>
    <VRow dense>
      {{ selectedDate }}
      <VCol v-for="n in 4" :key="n" cols="12">
        <VCard
          :title="`Content ${n}`"
          :subtitle="`Subtitle for Content ${n}`"
          text="Lorem ipsum dolor sit amet consectetur, adipisicing elit.?"
        ></VCard>
      </VCol>
    </VRow>
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
}
.datepicker {
  border: 1px solid #000000;
  width: 100%;
  height: 50%;
}
</style>
