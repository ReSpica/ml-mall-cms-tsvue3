<template>
  <el-container>
    <el-aside :width="isFold ? '60px' : '210px'">
      <NavMenu :collapse="isFold" />
    </el-aside>
    <el-container>
      <el-header>
        <NavHeader @flodChange="flodChange" />
      </el-header>
      <el-main>
        <div class="page-info">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import NavMenu from '@/components/nav-menu';
import NavHeader from '@/components/nav-header';
export default defineComponent({
  components: {
    NavMenu,
    NavHeader
  },
  setup() {
    const isFold = ref(false);
    const flodChange = (e: boolean) => {
      isFold.value = e;
    };
    return { flodChange, isFold };
  }
});
</script>

<style scoped lang="less">
.el-header {
  background-color: #e9eef3;
  color: var(--el-text-color-primary);
  line-height: 48px;
  height: 48px;
}

.el-aside {
  background-color: #011423;
  color: var(--el-text-color-primary);
  height: 100vh;
}

.el-main {
  background-color: #f5f5f5;
  color: var(--el-text-color-primary);
  height: calc(100vh - 48px);
  .page-info {
    background: #fff;
  }
}
</style>
