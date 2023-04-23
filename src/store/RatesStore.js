import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";
import axios from "axios";

const URL = "https://nationalbank.kz/rss/get_rates.cfm";

export const useRatesStore = defineStore("rateStore", () => {
  const rates = ref([]);

  const ratesInLocalStorage = localStorage.getItem("rates");
  if (ratesInLocalStorage) {
    rates.value = JSON.parse(ratesInLocalStorage).value;
  }

  const likedRates = computed(() => rates.value.filter((el) => el.isLiked));

  const totalRates = computed(() => rates.value.length);

  const getFakeRates = [
    {
      fullname: "АВСТРАЛИЙСКИЙ ДОЛЛАР",
      title: "AUD",
      description: "306",
      quant: 1,
    },
    {
      fullname: "АЗЕРБАЙДЖАНСКИЙ МАНАТ",
      title: "AZN",
      description: "260.83",
      quant: 1,
    },
    {
      fullname: "АРМЯНСКИЙ ДРАМ",
      title: "AMD",
      description: "11.41",
      quant: 10,
    },
    {
      fullname: "БЕЛОРУССКИЙ РУБЛЬ",
      title: "BYN",
      description: "175.57",
      quant: 1,
    },
    {
      fullname: "БРАЗИЛЬСКИЙ РЕАЛ",
      title: "BRL",
      description: "84.43",
      quant: 1,
    },
    {
      fullname: "ВЕНГЕРСКИХ ФОРИНТОВ",
      title: "HUF",
      description: "12.52",
      quant: 10,
    },
    {
      fullname: "ГОНКОНГСКИЙ ДОЛЛАР",
      title: "HKD",
      description: "56.32",
      quant: 1,
    },
    {
      fullname: "ГРУЗИНСКИЙ ЛАРИ",
      title: "GEL",
      description: "171.36",
      quant: 1,
    },
    {
      fullname: "ДАТСКАЯ КРОНА",
      title: "DKK",
      description: "DKK",
      quant: 1,
    },
  ];
  const getRates = async () => {
    const date = "2.04.2022";
    await axios
      .get(`${URL}`, {
        params: {
          fdate: date,
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => console.log("error: " + error));
  };
  // const getRates = async (date) => {
  //   try {
  //     const res = await axios.get(`${URL}`, {
  //       params: {
  //         fdate: date,
  //       },
  //     });
  //     const data = await res.json();
  //     rates.value = data.results;
  //     console.log(rates);
  //   } catch (err) {
  //     alert(err);
  //   }
  // };

  const toggleLiked = (title) => {
    const idx = rates.value.findIndex((el) => el.title === title);
    rates.value[idx].isWatched = !rates.value[idx].isWatched;
  };
  const unlikeRate = (title) => {
    rates.value = rates.value.filter((el) => el.title !== title);
    localStorage.setItem("rates", JSON.stringify(rates));
  };

  watch(
    () => rates,
    (state) => {
      localStorage.setItem("rates", JSON.stringify(state));
    },
    { deep: true }
  );

  return {
    rates,
    likedRates,
    totalRates,
    getFakeRates,
    getRates,
    toggleLiked,
    unlikeRate,
  };
});
