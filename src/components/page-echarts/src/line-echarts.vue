<template>
  <div class="pie-echart">
    <MlEchart :options="options" />
  </div>
</template>

<script lang="ts" setup>
import MlEchart from '@/base-ui/echarts';
import { defineProps, computed } from 'vue';
import { ILineDataType } from '../type/type';

const props = defineProps<{
  lineData: ILineDataType;
}>();
//监听props里面数据变化，更新option传过去
const options = computed(() => {
  console.log('props.lineData.xData', props.lineData.xData);

  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: props.lineData.xData
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: props.lineData.yData,
        type: 'line',
        areaStyle: {}
      }
    ]
  };
});
</script>

<style scoped></style>
