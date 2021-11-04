<template>
  <!-- elementui国际化组件，把el-config-provider包裹的内容存在elment的都变成本地语言-->
  <el-config-provider :locale="zhCn">
    <router-view></router-view>
  </el-config-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import zhCn from 'element-plus/lib/locale/lang/zh-cn';
export default defineComponent({
  name: 'App',
  props: {
    name: {
      type: String
    }
  },
  setup() {
    return {
      zhCn
    };
  }
});
</script>

<style lang="less"></style>
