<template>
  <div class="pie-echart">
    <MlEchart :options="options" />
  </div>
</template>

<script lang="ts" setup>
import MlEchart from '@/base-ui/echarts';
import { defineProps, computed } from 'vue';
import { IBarDataType } from '../type/type';
import * as echarts from 'echarts';
const props = defineProps<{
  barData: IBarDataType;
}>();
//监听props里面数据变化，更新option传过去
const options = computed(() => {
  return {
    xAxis: {
      data: props.barData.xData,
      axisLabel: {
        inside: true,
        color: '#fff'
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      z: 10
    },
    yAxis: {
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#999'
      }
    },
    dataZoom: [
      {
        type: 'inside'
      }
    ],
    series: [
      {
        type: 'bar',
        showBackground: true,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#83bff6' },
            { offset: 0.5, color: '#188df0' },
            { offset: 1, color: '#188df0' }
          ])
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#2378f7' },
              { offset: 0.7, color: '#2378f7' },
              { offset: 1, color: '#83bff6' }
            ])
          }
        },
        data: props.barData.yData
      }
    ]
  };
});
</script>

<style scoped></style>
