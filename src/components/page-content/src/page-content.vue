<template>
  <div class="page-content">
    <MlTable v-bind="contentTableConfig" :dataList="dataList" :dataCount="dataCount" @handleSelectChange="handleSelectChange" v-model:page="pageInfo">
      <!-- 列中的插槽 -->
      <template #enable="scope">
        <el-button :type="scope.row.enable ? 'success' : 'danger'" size="mini">{{ scope.row.enable ? '启用' : '禁用' }}</el-button>
      </template>

      <template #createAt="scope">
        {{ $filters.formatTime(scope.row.createAt) }}
      </template>

      <template #updateAt="scope">
        {{ $filters.formatTime(scope.row.updateAt) }}
      </template>

      <template #handler="scope">
        <div class="handle-btns">
          <el-button icon="el-icon-edit" size="mini" type="text" @click="handleEditClick(scope.row)">编辑</el-button>
          <el-button icon="el-icon-delete" size="mini" type="text" style="color: red" @click="handleDeleteClick(scope.row)">删除</el-button>
        </div>
      </template>

      <template v-for="item of ortherPropSlots" :key="item.prop" #[item.slotName]="scope">
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>

      <!-- 头部右侧插槽 -->
      <template #headerRight>
        <el-button size="small" type="primary" @click="handleNewClick">新建</el-button>
      </template>
      <!-- 尾部插槽 -->
      <!-- <template #tableFooter></template> -->
    </MlTable>
  </div>
</template>

<script lang="ts">
import MlTable from '@/base-ui/table';
import { defineComponent, computed, ref, watch } from 'vue';
import { newUseStore } from '@/store';
import { usePermission } from '@/hooks/use-permission';

export default defineComponent({
  components: {
    MlTable
  },
  props: {
    contentTableConfig: {
      type: Object,
      required: true
    }
  },
  emits: ['handleSelectChange', 'newBtnClick', 'editBtnClick'],

  setup(props, { emit }) {
    const handleSelectChange = (val: any) => {
      emit('handleSelectChange', val);
    };
    const store = newUseStore();
    //0.获取操作的权限
    const isCreate = usePermission(props.contentTableConfig.pageName, 'create'); //新增数据权限
    const isUpdate = usePermission(props.contentTableConfig.pageName, 'update'); //更新数据权限
    const isDelete = usePermission(props.contentTableConfig.pageName, 'delete'); //删除数据权限
    // const isQuery = usePermission(props.contentTableConfig.pageName, 'query'); //查看列表权限

    //1.双向绑定pageInfo
    const pageInfo = ref({ currentPage: 1, pageSize: 5 });
    watch(pageInfo, () => {
      getPageData();
    });

    //2.vuex那边方法做接口请求
    const getPageData = (queryInfos: any = {}) => {
      // if (!isQuery) return;
      store.dispatch(`${props.contentTableConfig.pageGroup}/getPageListAction`, {
        pageName: props.contentTableConfig.pageName,
        queryInfo: {
          offset: pageInfo.value.currentPage !== 1 ? (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize : 0,
          size: pageInfo.value.pageSize,
          ...queryInfos
        }
      });
    };
    getPageData();

    //3.vuex那边getter获取对应的数据
    const dataList = computed(() => store.getters[`${props.contentTableConfig.pageGroup}/getPageListData`](props.contentTableConfig.pageName));
    const dataCount = computed(() => store.getters[`${props.contentTableConfig.pageGroup}/getPageListCount`](props.contentTableConfig.pageName));

    //4.获取其他动态插槽名称,跳过公开的插槽
    const ortherPropSlots = props.contentTableConfig.propsList.filter((item: any) => {
      if (item.slotName === 'enable') return false;
      if (item.slotName === 'createAt') return false;
      if (item.slotName === 'updateAt') return false;
      if (item.slotName === 'handler') return false;
      return true;
    });

    //公共删除
    const handleDeleteClick = (row: any) => {
      store.dispatch('system/deletePageDataAction', {
        pageName: props.contentTableConfig.pageName,
        id: row.id
      });
    };

    //公共新增
    const handleNewClick = () => {
      emit('newBtnClick');
    };

    //公共修改
    const handleEditClick = (_row: any) => {
      emit('editBtnClick', _row);
    };
    return {
      handleSelectChange,
      dataList,
      getPageData,
      dataCount,
      pageInfo,
      ortherPropSlots,
      isCreate,
      isUpdate,
      isDelete,
      handleDeleteClick,
      handleNewClick,
      handleEditClick
    };
  }
});
</script>

<style scoped lang="less">
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
