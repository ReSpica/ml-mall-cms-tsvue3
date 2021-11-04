<template>
  <div class="table">
    <div class="table-header">
      <slot name="tableHeader">
        <div class="header-left">{{ title }}</div>
        <div class="header-right">
          <slot name="headerRight"></slot>
        </div>
      </slot>
    </div>

    <el-table :data="dataList" border style="width: 100%" @selection-change="handleSelectChange" v-bind="childrenProps">
      <el-table-column type="selection" width="55" align="center" v-if="showSelectColum" />
      <el-table-column type="index" width="80" align="center" label="序号" v-if="showIndexColumn" show-overflow-tooltip />
      <template v-for="propItem in propsList" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center">
          <template #default="scope">
            <!-- 自定义里面放具名插槽 -->
            <slot :name="propItem.slotName" :row="scope.row">
              <!-- 插槽默认是prop字段 -->
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="table-footer" v-if="showFooter">
      <slot name="tableFooter">
        <el-pagination
          :currentPage="page.currentPage"
          :page-sizes="[5, 10, 20]"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="dataCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  props: {
    propsList: {
      type: Array,
      required: true
    },
    dataList: {
      type: Array,
      required: true
    },
    showIndexColumn: {
      type: Boolean,
      default: true
    },
    showSelectColum: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ''
    },
    dataCount: {
      type: Number,
      default: 0
    },
    page: {
      type: Object,
      default: () => ({ currentPage: 0, pageSize: 10 })
    },
    childrenProps: {
      type: Object,
      default: () => ({})
    },
    showFooter: {
      type: Boolean,
      defalut: true
    }
  },
  emits: ['handleSelectChange', 'selectChange', 'update:page'],
  setup(props, { emit }) {
    const currentPage = ref(4);
    const handleSelectChange = (val: any) => {
      emit('handleSelectChange', val);
    };

    const handleCurrentChange = (currentPage: number) => {
      emit('update:page', { ...props.page, currentPage });
    };
    const handleSizeChange = (pageSize: any) => {
      emit('update:page', { ...props.page, pageSize });
    };
    return { handleSelectChange, currentPage, handleSizeChange, handleCurrentChange };
  }
});
</script>

<style scoped lang="less">
.table {
  .table-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    .header-left {
      font-size: 18px;
      font-weight: 700;
    }
    .header-right {
    }
  }
  .table-footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 10px;
  }
}
</style>
