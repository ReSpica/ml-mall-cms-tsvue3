<template>
  <div class="user">
    <PageSearch :searchFormConfig="searchFormConfig" @resetBtnClick="handleResetBtnClick" @queryBtnClick="handleQueryBtnClick" />
    <PageContent ref="pageContentRef" :contentTableConfig="contentTableConfig" @newBtnClick="newBtnClick" @editBtnClick="editBtnClick"> </PageContent>
    <PageModal ref="pageModalRef" :defaultInfo="defaultInfo" :modalConfig="modalConfig" :otherInfo="otherInfo">
      <el-tree
        style="padding-left: 20px"
        ref="elTreeRef"
        :data="menus"
        :props="{
          children: 'children',
          label: 'name'
        }"
        show-checkbox
        node-key="id"
        @check="handleCheckChange"
      />
    </PageModal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, nextTick } from 'vue';
import { newUseStore } from '@/store';
import { getMenuLeafKey } from '@/util/map-menus';

import PageSearch from '@/components/page-search';
import PageContent from '@/components/page-content';
import PageModal from '@/components/page-modal';

import { searchFormConfig } from './config/search.config';
import { contentTableConfig } from './config/content.config';
import { modalConfig } from './config/modal.config';

import { usePageSearch } from '@/hooks/use-page-search';
import { usePageModal } from '@/hooks/use-page-modal';
import { ElTree } from 'element-plus';

export default defineComponent({
  name: 'role',
  components: { PageSearch, PageContent, PageModal },

  setup() {
    //抽取搜索的相关逻辑
    const [pageContentRef, handleResetBtnClick, handleQueryBtnClick] = usePageSearch();
    //调用hook获取公共变量和函数
    const newCallback = () => {
      modalConfig.dialogTitle = '新增角色';
    };
    const elTreeRef = ref<InstanceType<typeof ElTree>>();
    const editCallback = (_row: any) => {
      modalConfig.dialogTitle = '修改角色';
      const menuIds = getMenuLeafKey(_row.menuList);
      nextTick(() => {
        console.log(elTreeRef.value);

        elTreeRef.value?.setCheckedKeys(menuIds, false);
      });
    };
    const [pageModalRef, defaultInfo, newBtnClick, editBtnClick] = usePageModal(newCallback, editCallback);

    const store = newUseStore();
    const menus = computed(() => store.state.entireMenu);
    const otherInfo = ref({});

    const handleCheckChange = (data1: any, data2: any) => {
      const menuList = data2.checkedKeys;
      otherInfo.value = { menuList };
    };
    return {
      searchFormConfig,
      contentTableConfig,
      modalConfig,
      pageContentRef,
      handleResetBtnClick,
      handleQueryBtnClick,
      pageModalRef,
      defaultInfo,
      newBtnClick,
      editBtnClick,
      menus,
      otherInfo,
      handleCheckChange,
      elTreeRef
    };
  }
});
</script>

<style scoped lang="less">
.user {
  height: 100%;
}
</style>
