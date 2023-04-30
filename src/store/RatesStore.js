import { defineStore } from "pinia";
import { ref, watch } from "vue";
// import axios from "axios";
// import { XMLParser } from "fast-xml-parser";
// const URL = "http://localhost:8010/proxy/rss/get_rates.cfm";

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

// function parseXMLToJSON2(xmlString) {
//   const parser = new DOMParser().parseFromString(xmlString, "text/xml");
//   console.log("im a parser");
//   console.log(parser);
//   const currentRates = parser.querySelectorAll("item");
//   for (const item of currentRates) {
//     const rate = {
//       fullname: item.querySelector("fullname").textContent,
//       title: item.querySelector("title").textContent,
//       description: parseFloat(item.querySelector("description").textContent),
//       quant: item.querySelector("quant").textContent,
//       icon: `https://flagcdn.com/w320/${item
//         .querySelector("title")
//         .textContent.toLowerCase()
//         .slice(0, 2)}.png`,
//       isLiked: false,
//     };
//     console.log(rate);
//     favRatez.value.push(rate);
//   }
//   console.log("favRatez.value from parser function" + favRatez.value);
//   return favRatez.value;
// }
// function parseXMLToJSON3(xmlString) {
//   const parser = new XMLParser();
//   rates.value = parser.parse(xmlString);
//   // const currentRates = parser.parse(xmlString);
//   console.log("THIS IS PARSER #3:" + rates.value);
// }
// const getRates = async (date) => {
//   try {
//     const response = await axios.get(`${URL}`, {
//       params: {
//         fdate: date,
//         // _limit: 10,
//       },
//     });
//     favRatez.value = parseXMLToJSON2(response.data);
//     console.log("Darina:" + favRatez.value);
//   } catch (err) {
//     console.log("Your error:" + err);
//   }
// };
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
