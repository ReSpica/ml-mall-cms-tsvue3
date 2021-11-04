<template>
  <div class="menu">
    <PageContent :contentTableConfig="contentTableConfig"> </PageContent>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { searchFormConfig } from './config/search.config';
import PageContent from '@/components/page-content';
import { contentTableConfig } from './config/content.config';
export default defineComponent({
  name: 'role',
  components: { PageContent },
  setup() {
    return { searchFormConfig, contentTableConfig };
  }
});
</script>

<style scoped lang="less">
.menu {
  height: 100%;
}
</style>
