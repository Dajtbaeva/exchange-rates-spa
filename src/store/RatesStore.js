import { defineStore } from "pinia";
import { ref, watch } from "vue";
// import { XMLParser } from "fast-xml-parser";

export const useRatesStore = defineStore("rateStore", () => {
  const favRatez = ref([]);
  const ratesInLocalStorage = localStorage.getItem("rates");
  if (ratesInLocalStorage !== null) {
    favRatez.value = JSON.parse(ratesInLocalStorage)._value;
  } else {
    favRatez.value = ref([]);
  }

  const unlikeRate = (object) => {
    const title = object.title;
    object.isLiked = false;
    favRatez.value = favRatez.value.filter((el) => el.title !== title);
    console.log(favRatez.value);
    localStorage.setItem("rates", JSON.stringify(favRatez.value));
  };

  const likeRate = (object) => {
    object.isLiked = true;
    if (favRatez.value) {
      favRatez.value.push(object);
    } else {
      favRatez.value = [object];
    }
    console.log(favRatez.value);
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