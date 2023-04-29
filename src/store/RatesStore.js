import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";
import axios from "axios";
// import { XMLParser } from "fast-xml-parser";

// const URL = "http://localhost:8010/proxy/rss/get_rates.cfm";

export const useRatesStore = defineStore("rateStore", () => {
  const ratez = ref([]);
  const loading = ref(false);
  const ratesInLocalStorage = localStorage.getItem("rates");
  if (ratesInLocalStorage) {
    ratez.value = JSON.parse(ratesInLocalStorage).value;
  }

  const likedRates = computed(() => ratez.value.filter((el) => el.isLiked));

  const totalRates = computed(() => ratez.value.length);

  const toggleLiked = (title) => {
    const idx = ratez.value.findIndex((el) => el.title === title);
    ratez.value[idx].isLiked = !ratez.value[idx].isLiked;
  };
  const unlikeRate = (title) => {
    ratez.value = ratez.value.filter((el) => el.title !== title);
    localStorage.setItem("ratez", JSON.stringify(ratez));
  };

  function parseXMLToJSON2(xmlString) {
    const parser = new DOMParser().parseFromString(xmlString, "text/xml");
    console.log("im a parser");
    console.log(parser);
    const currentRates = parser.querySelectorAll("item");
    for (const item of currentRates) {
      const rate = {
        fullname: item.querySelector("fullname").textContent,
        title: item.querySelector("title").textContent,
        description: parseFloat(item.querySelector("description").textContent),
        quant: item.querySelector("quant").textContent,
        icon: `https://flagcdn.com/w320/${item
          .querySelector("title")
          .textContent.toLowerCase()
          .slice(0, 2)}.png`,
        isLiked: false,
      };
      console.log(rate);
      // ratez.value[index] = rate;
      ratez.value.push(rate);
    }
    console.log("Ratez.value from parser function" + ratez.value);
    return ratez.value;
  }
  // function parseXMLToJSON3(xmlString) {
  //   const parser = new XMLParser();
  //   rates.value = parser.parse(xmlString);
  //   // const currentRates = parser.parse(xmlString);
  //   console.log("THIS IS PARSER #3:" + rates.value);
  // }
  const getRates = async (date) => {
    try {
      loading.value = true;
      const response = await axios.get(`${URL}`, {
        params: {
          fdate: date,
          // _limit: 10,
        },
      });
      ratez.value = parseXMLToJSON2(response.data);
      console.log("Darina:" + ratez.value);
    } catch (err) {
      console.log("Your error:" + err);
    } finally {
      loading.value = false;
    }
  };
  // const getRates = async (date) => {
  //   await axios
  //     .get(`${URL}`, {
  //       params: {
  //         fdate: date,
  //         // _limit: 10,
  //       },
  //     })
  //     .then((response) => {
  //       // console.log("Darina:" + response.data);
  //       const data = parseXMLToJSON2(response.data);
  //       parseXMLToJSON3(response.data);
  //       console.log("Darina:" + data);
  //     })
  //     .catch((error) => console.log("Error: " + error));
  // };

  watch(
    (state) => {
      localStorage.setItem("rates", JSON.stringify(state));
    },
    { deep: true }
  );
  // onMounted(getRates);

  return {
    ratez,
    likedRates,
    totalRates,
    getRates,
    toggleLiked,
    unlikeRate,
  };
});
