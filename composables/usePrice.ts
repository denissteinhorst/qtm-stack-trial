import type { IPriceData } from "~/types/type";
import { useApiStore } from '~/stores/apiStore';

/**
 * Composable function to fetch the price data from the API
 * @param bzn // default: 'DE-LU'
 * @param start // default timestamp today 00:00:00
 * @param end // default timestamp today 23:59:59
 * @returns priceData
 */
export const usePrice = async (bzn: string, start?: number, end?: number) => {
  const apiStore = useApiStore();
  const resolvedLocally = ref<boolean>();

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

  const response = apiStore.getResponse(apiUrl);
  const priceData: Ref<IPriceData | undefined> = ref();

  if (response) {
    console.info(`\`${apiUrl}\` - resolving from STORE`);
    priceData.value = response.data;
    resolvedLocally.value = true;
  } else {
    console.info(`\`${apiUrl}\` - resolving from API`);
    try {
      const response: any = await $fetch(apiUrl);

      if (response.status === 200) {
        priceData.value = response.data;
        apiStore.addResponse(apiUrl, response.data);
        resolvedLocally.value = false;
      } else {
        console.error("No data returned from the API");
      }
    } catch (error) {
      priceData.value = undefined;
      console.error("Error fetching data:", error);
    }
  }

  return {
    priceData,
    resolvedLocally,
  }
}