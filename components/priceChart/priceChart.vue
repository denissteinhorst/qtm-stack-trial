<template>
  <article class="price-chart">
    <h1 class="price-chart__title">Highcharts</h1>
    <template v-if="isLoading">
      <v-skeleton-loader type="card" class="price-chart__loader" />
    </template>
    <template v-else>
      <client-only>
          <highcharts :options="options" :class="['price-chart__chart', { 'price-chart__chart--fade-in': !isLoading }]" />
      </client-only>
    </template>
  </article>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { usePrice } from '~/composables/usePrice';
import { useUtils } from '~/composables/useUtils';

const isLoading = ref(true);
const options = ref({});

const {
  timestampToRegularTime,
  getTodayDateLong,
  getCurrentTime,
  getYesterdayTimestamps,
  getTodayTimestampsOneYearAgo
} = useUtils();

const fetchData = async () => {
  const { priceData: priceDataToday } = await usePrice('DE-LU');
  const { priceData: priceDataYesterday } = await usePrice('DE-LU', getYesterdayTimestamps('start'), getYesterdayTimestamps('end'));
  const { priceData: priceDataYesterdayAYearAgo } = await usePrice('DE-LU', getTodayTimestampsOneYearAgo('start'), getTodayTimestampsOneYearAgo('end'));
  const currentTimeIndex = getCurrentTime().toString().split(':')[0];

  options.value = {
    chart: {
      type: 'line',
    },
    title: {
      text: `Day-Ahead Market Prices / DE-LU / ${getTodayDateLong()}`
    },
    subtitle: {
      text: 'Source: energy-charts.info'
    },
    xAxis: {
      categories: timestampToRegularTime(priceDataToday?.value?.unix_seconds || []),
      title: {
        text: 'Time'
      },
      plotBands: [{
        color: 'orange',
        from: parseInt(currentTimeIndex),
        to: parseInt(currentTimeIndex) + 1,
        label: {
          text: 'NOW',
          style: {
            color: 'black',
            fontWeight: 'bold',
            fontSize: '10px'
          }
        }
      }],
    },
    yAxis: {
      title: {
        text: 'Price (EUR / MWh)'
      }
    },
    series: [
      {
        name: 'Price (EUR / MWh) Today',
        data: priceDataToday?.value?.price
      },
      {
        name: 'Price (EUR / MWh) Yesterday',
        data: priceDataYesterday?.value?.price
      },
      {
        name: 'Price (EUR / MWh) Today, a year ago',
        data: priceDataYesterdayAYearAgo?.value?.price
      }
    ],
    accessibility: { enabled: false } // Disable accessibility-addon warning
  };

  isLoading.value = false;
};

onMounted(() => {
  fetchData();
});
</script>

<style scoped lang="scss">
$block: 'price-chart';

.#{$block} {
  min-height: 464px;

  &__chart {
    opacity: 0;
    transition: opacity .5s ease;

    &--fade-in {
      opacity: 1;
    }
  }

  &__title {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  :deep(.v-skeleton-loader__image) {
    height: 400px;
  }
}
</style>