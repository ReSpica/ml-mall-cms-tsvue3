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
  pieData: IdataType;
}>();
//监听props里面数据变化，更新option传过去
const options = computed(() => {
  return {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'horizontal',
      left: 'left'
    },
    series: [
      {
        name: '详情',
        type: 'pie',
        radius: '50%',
        data: props.pieData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
});
</script>

<style scoped></style>
