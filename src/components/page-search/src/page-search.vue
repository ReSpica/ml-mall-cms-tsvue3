<template>
  <ml-form class="ml-form" v-bind="searchFormConfig" v-model="formData">
    <template #header>
      <h1 class="header">高级检索</h1>
    </template>
    <template #footer>
      <div class="footer">
        <el-button type="inffo" icon="el-icon-refresh" size="small" @click="handleResetClick">重置</el-button>
        <el-button type="primary" icon="el-icon-search" size="small" @click="handleSearchClick">搜索</el-button>
      </div>
    </template>
  </ml-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import MlForm from '@/base-ui/form';
export default defineComponent({
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    }
  },
  components: { MlForm },
  emits: ['resetBtnClick', 'queryBtnClick'],
  setup(props, { emit }) {
    //双向绑定的属性应该由配置文件决定的
    const formItems = props.searchFormConfig.formItems ?? [];
    const forOriginData: any = {};
    for (const item of formItems) {
      forOriginData[item.field] = '';
    }
    const formData = ref(forOriginData);

    //重置
    const handleResetClick = () => {
      // for (const key in forOriginData) {
      //   formData.value[`${key}`] = forOriginData[key];
      // }
      formData.value = forOriginData;
      emit('resetBtnClick');
    };

    //高级搜索
    const handleSearchClick = () => {
      emit('queryBtnClick', formData.value);
    };
    return { formData, handleResetClick, handleSearchClick };
  }
});
</script>

<style scoped lang="less">
.ml-form {
  position: relative;
  padding-bottom: 20px;
  .header {
    font-size: 18px;
    margin-bottom: 10px;
    margin-left: 20px;
  }
  .footer {
    position: absolute;
    right: 20px;
    bottom: 10px;
  }
}
</style>
