<template>
  <PageContent :contentTableConfig="contentTableConfig">
    <template #imgUrl="scope">
      <el-image style="width: 100px; height: 100px" :src="scope.row.imgUrl" :preview-src-list="[scope.row.imgUrl]"> </el-image>
    </template>
    <template #oldPrice="scope">
      <span>${{ scope.row.oldPrice }} </span>
    </template>
    <template #newPrice="scope">
      <span>${{ scope.row.newPrice }} </span>
    </template>
    <template #status="scope">
      <el-button :type="scope.row.status ? 'success' : 'danger'" size="mini">{{ scope.row.status ? '上架中' : '下架' }}</el-button>
    </template>
  </PageContent>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PageContent from '@/components/page-content';
import { contentTableConfig } from './config/content.config';
export default defineComponent({
  components: {
    PageContent
  },
  setup() {
    return { contentTableConfig };
  }
});
</script>

<style scoped></style>
