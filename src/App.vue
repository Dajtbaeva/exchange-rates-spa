<template>
  <VApp>
    <NavBar />
    <VMain>
      <VContainer fluid>
        <!-- <template v-slot:activator="{ on }">
          <VTextField
            v-model="dateFormatted"
            label="Date"
            hint="MM/DD/YYYY format"
            persistent-hint
            prepend-icon="event"
            @blur="date = parseDate(dateFormatted)"
            v-on="on"
          ></VTextField>
        </template> -->
        <datepicker v-model="selected" />
        <VRow dense>
          {{ selected }}
          <VCol v-for="n in 4" :key="n" cols="12">
            <VCard
              :title="`Content ${n}`"
              :subtitle="`Subtitle for Content ${n}`"
              text="Lorem ipsum dolor sit amet consectetur, adipisicing elit.?"
            ></VCard>
          </VCol>
        </VRow>
      </VContainer>
    </VMain>
  </VApp>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import { ref } from "vue";
import Datepicker from "vue3-datepicker";

export default {
  components: {
    NavBar,
    Datepicker,
  },
  setup() {
    const selected = ref(new Date());
    return { selected };
  },
};
</script>
