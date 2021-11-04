<template>
  <div class="pie-echart">
    <MlEchart :options="options" />
  </div>
</template>

<script lang="ts" setup>
import MlEchart from '@/base-ui/echarts';
import { defineProps, computed } from 'vue';
import { IdataType } from '../type/type';

const props = defineProps<{
  roseData: IdataType;
}>();
//监听props里面数据变化，更新option传过去
const options = computed(() => {
  return {
    legend: {
      top: 'bottom',
      show: false
    },
    toolbox: {
      show: false,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    series: [
      {
        name: 'Nightingale Chart',
        type: 'pie',
        radius: [20, 100],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8
        },
        data: props.roseData
      }
    ]
  };
});
</script>

<style scoped></style>
