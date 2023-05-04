import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useRatesStore = defineStore("rateStore", () => {
  const favRatez = ref([]);
  const ratesInLocalStorage = localStorage.getItem("rates");
  ratesInLocalStorage !== null
    ? (favRatez.value = JSON.parse(ratesInLocalStorage)._value)
    : (favRatez.value = ref([]));

  const unlikeRate = (object) => {
    const title = object.title;
    object.isLiked = false;
    favRatez.value = favRatez.value.filter((el) => el.title !== title);
    localStorage.setItem("rates", JSON.stringify(favRatez.value));
  };

  const likeRate = (object) => {
    object.isLiked = true;
    favRatez.value ? favRatez.value.push(object) : (favRatez.value = [object]);
    localStorage.setItem("rates", JSON.stringify(favRatez.value));
  };

  watch(
    () => favRatez,
    (state) => {
      localStorage.setItem("rates", JSON.stringify(state));
    },
    { deep: true }
  );
  return {
    favRatez,
    likeRate,
    unlikeRate,
  };
});
