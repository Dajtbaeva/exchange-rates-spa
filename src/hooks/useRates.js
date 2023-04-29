import axios from "axios";
import { ref, computed, watch, onMounted } from "vue";

export function useRates() {
  const ratez = ref([]);
  //   const tempRatez = ref([]);
  const selectedDay = ref(new Date());
  const selectedDate = computed(() =>
    selectedDay.value.toLocaleString().slice(0, 10)
  );

  const loading = ref(false);
  const URL = "http://localhost:8010/proxy/rss/get_rates.cfm";

  //   const ratez = computed(() => parseXMLToJSON2(ratez.value));
  //   function parseXMLToJSON2(xmlString) {
  //     const parser = new DOMParser().parseFromString(xmlString, "text/xml");
  //     console.log("im a parser");
  //     console.log(parser);
  //     const currentRates = parser.querySelectorAll("item");
  //     for (const item of currentRates) {
  //       const rate = {
  //         fullname: item.querySelector("fullname").textContent,
  //         title: item.querySelector("title").textContent,
  //         description: parseFloat(item.querySelector("description").textContent),
  //         quant: item.querySelector("quant").textContent,
  //         icon: `https://flagcdn.com/w320/${item
  //           .querySelector("title")
  //           .textContent.toLowerCase()
  //           .slice(0, 2)}.png`,
  //         isLiked: false,
  //       };
  //       console.log(rate);
  //       [...ratez.value].push(rate);
  //     }
  //     console.log("Ratez.value from parser function" + ratez.value);
  //     return ratez.value;
  //   }
  function parseXMLToJSON2(xmlString) {
    const parser = new DOMParser().parseFromString(xmlString, "text/xml");
    console.log("im a parser");
    console.log(parser);
    const tempRatez = [];
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
      tempRatez.push(rate);
    }
    [...ratez.value] = tempRatez;
    console.log("Ratez.value from parser function" + ratez.value);
    return ratez.value;
  }

  //   const getRates = async () => {
  //     try {
  //       loading.value = true;
  //       const response = await axios.get(`${URL}`, {
  //         params: {
  //           fdate: selectedDate.value,
  //           // _limit: 10,
  //         },
  //       });
  //       ratez.value = response.data;
  //       console.log("Darina:" + ratez.value);
  //     } catch (err) {
  //       console.log("Your error:" + err);
  //     } finally {
  //       loading.value = false;
  //     }
  //   };
  const getRates = async () => {
    try {
      loading.value = true;
      const response = await axios.get(`${URL}`, {
        params: {
          fdate: selectedDate.value,
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

  watch(selectedDate, () => {
    console.log("This is from watch:" + selectedDate);
    getRates();
  });

  onMounted(getRates);
  return {
    loading,
    ratez,
    selectedDay,
    selectedDate,
  };
}
