<template>
  <div class="user">
    <PageSearch :searchFormConfig="searchFormConfig" @resetBtnClick="handleResetBtnClick" @queryBtnClick="handleQueryBtnClick" />
    <PageContent :contentTableConfig="contentTableConfig" @newBtnClick="newBtnClick" @editBtnClick="editBtnClick" ref="pageContentRef"> </PageContent>
    <PageModal :modalConfig="modalConfigRef" :defaultInfo="defaultInfo" ref="pageModalRef" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { newUseStore } from '@/store';
import PageSearch from '@/components/page-search';
import PageContent from '@/components/page-content';
import PageModal from '@/components/page-modal';

import { searchFormConfig } from './config/search.config';
import { contentTableConfig } from './config/content.config';
import { modalConfig } from './config/modal.config';

import { usePageSearch } from '@/hooks/use-page-search';
import { usePageModal } from '@/hooks/use-page-modal';

export default defineComponent({
  name: 'user',
  components: { PageSearch, PageContent, PageModal },
  setup() {
    //抽取搜索的相关逻辑
    const [pageContentRef, handleResetBtnClick, handleQueryBtnClick] = usePageSearch();

    //抽取弹框的相关逻辑
    //1.通过两个回调函数分情况改变modalConfig.formItems里面的内容
    const newCallback = () => {
      modalConfig.dialogTitle = '新增用户';
      const pwd = modalConfig.formItems.find((item) => item.field === 'password');

      if (pwd?.isHidden !== undefined) {
        pwd.isHidden = false;
      }
    };
    const editCallback = () => {
      modalConfig.dialogTitle = '修改用户';

      const pwd = modalConfig.formItems.find((item) => item.field === 'password');

      if (pwd?.isHidden !== undefined) {
        pwd.isHidden = true;
      }
    };
    //2.动态添加部门和角色列表
    const store = newUseStore();
    const modalConfigRef = computed(() => {
      //本页刷新，会发生下拉框没值的情况，需要放在computed上，只要发生改变就要做一轮操作，再重新返回modalConfig
      const departmentItem = modalConfig.formItems.find((item) => item.field === 'departmentId');
      const roleItem = modalConfig.formItems.find((item) => item.field === 'roleId');

      if (departmentItem?.options) {
        departmentItem.options = store.state.entireDepartment.map((item: any) => {
          return { title: item.name, value: item.id };
        });
      }
      if (roleItem?.options) {
        roleItem.options = store.state.entireRole.map((item: any) => {
          return { title: item.name, value: item.id };
        });
      }
      return modalConfig;
    });

    //调用hook获取公共变量和函数
    const [pageModalRef, defaultInfo, newBtnClick, editBtnClick] = usePageModal(newCallback, editCallback);

    return {
      searchFormConfig,
      contentTableConfig,
      handleResetBtnClick,
      handleQueryBtnClick,
      pageContentRef,
      newBtnClick,
      editBtnClick,
      pageModalRef,
      defaultInfo,
      modalConfigRef
    };
  }
});
</script>

<style scoped lang="less">
.user {
  height: 100%;
}
</style>
