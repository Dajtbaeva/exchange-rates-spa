import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useRatesStore = defineStore("rateStore", () => {
  const favRatez = ref([]);
  const ratesInLocalStorage = localStorage.getItem("rates");
  // if (ratesInLocalStorage !== null) {
  //   favRatez.value = JSON.parse(ratesInLocalStorage);
  // } else {
  //   favRatez.value = ref([]);
  // }
  if (ratesInLocalStorage) favRatez.value = JSON.parse(ratesInLocalStorage);

  const unlikeRate = (object) => {
    const title = object.title;
    object.isLiked = false;
    favRatez.value = favRatez.value.filter((el) => el.title !== title);
    localStorage.setItem("rates", JSON.stringify(favRatez.value));
  };

  const likeRate = (object) => {
    object.isLiked = true;
    // console.log(favRatez);
    // console.log(favRatez.value);

    if (favRatez.value.length > 0) {
      favRatez.value.push(object);
    } else {
      favRatez.value = [object];
    }
    localStorage.setItem("rates", JSON.stringify(favRatez.value));
  };

  watch(
    () => favRatez.value,
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
