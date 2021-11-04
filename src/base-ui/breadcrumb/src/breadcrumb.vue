<template>
  <el-breadcrumb separator="/">
    <template v-for="item of breadcrumbs" :key="item.name">
      <el-breadcrumb-item :to="{ path: item.path }">{{ item.name }}</el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { IBreadcrumb } from '../types';
export default defineComponent({
  props: {
    breadcrumbs: {
      type: Array as PropType<IBreadcrumb[]>,
      default: () => []
    }
  },
  setup() {
    return {};
  }
});
</script>

<style scoped lang="less">
.el-breadcrumb {
  display: flex;
  align-items: center;
}
</style>
