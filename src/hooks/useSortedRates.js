import { ref, computed } from "vue";

export default function useSortedRates(ratez) {
  const selectedOption = ref("");
  const sortedRates = computed(() => {
    return [...ratez.value].sort((r1, r2) =>
      r1[selectedOption.value]?.localeCompare(r2[selectedOption.value])
    );
  });

  return {
    selectedOption,
    sortedRates,
  };
}
