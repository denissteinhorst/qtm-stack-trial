import type { IPriceData } from "~/types/type";

/**
 * Composable function to fetch the price data from the API
 * @param bzn // default: 'DE-LU'
 * @param start // default timestamp today 00:00:00
 * @param end // default timestamp today 23:59:59
 * @returns priceData
 */
export const usePrice = async (bzn: string, start?: number, end?: number) => {
  let apiUrl = '/api/energy-charts?endpoint=price';

  if (bzn) {
    apiUrl += `&bzn=${bzn}`;
  }

  if (start) {
    apiUrl += `&start=${start}`;
  }

  if (end) {
    apiUrl += `&end=${end}`;
  }

  const priceData: Ref<IPriceData | undefined> = ref();

  try {
    const response: any = await $fetch(apiUrl);

    if (response.status === 200) {
      priceData.value = response.data;
    } else {
      console.error("No data returned from the API");
    }
  } catch (error) {
    priceData.value = undefined;
    console.error("Error fetching data:", error);
  }

  return {
    priceData,
  }
}