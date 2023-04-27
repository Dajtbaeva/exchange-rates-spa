import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";
import axios from "axios";
import { XMLParser } from "fast-xml-parser";

const URL = "http://localhost:8010/proxy/rss/get_rates.cfm";

export const useRatesStore = defineStore("rateStore", () => {
  const rates = ref([]);
  const ratez = ref([]);

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
      };
      console.log(rate);
      ratez.value.push(rate);
    }
    console.log(ratez.value);
    return ratez.value;
  }
  function parseXMLToJSON3(xmlString) {
    const parser = new XMLParser();
    const currentRates = parser.parse(xmlString);
     console.log("THIS IS PARSER #3:" + currentRates[0]);
  }
  // function parseXMLToJSON(xmlString) {
  //   const parser = new DOMParser().parseFromString(xmlString, "text/xml");
  //   const xmlDoc = parser.parseFromString(xmlString, "text/xml");
  //   const rates = xmlDoc.getElementsByTagName("item");
  //   const result = [];

  //   for (let i = 0; i < rates.length; i++) {
  //     const rate = rates[i];
  //     const item = {
  //       fullname: rate.getElementsByTagName("fullname")[0].textContent,
  //       title: rate.getElementsByTagName("title")[0].textContent,
  //       description: parseFloat(
  //         rate.getElementsByTagName("description")[0].textContent
  //       ),
  //       quant: parseFloat(rate.getElementsByTagName("quant")[0].textContent),
  //     };
  //     result.push(item);
  //   }
  //   return result;
  // }
  const getRates = async (date) => {
    await axios
      .get(`${URL}`, {
        params: {
          fdate: date,
          // _limit: 10,
        },
      })
      .then((response) => {
        // console.log("Darina:" + response.data);
        const data = parseXMLToJSON2(response.data);
        parseXMLToJSON3(response.data);
        console.log("Darina:" + data);
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
    ratez,
    likedRates,
    totalRates,
    getFakeRates,
    getRates,
    toggleLiked,
    unlikeRate,
  };
});
