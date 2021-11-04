<template>
  <div class="nav-header">
    <i class="el-icon-s-fold" @click="menuShow"></i>
    <div class="content">
      <MlBreadCrumb :breadcrumbs="breadcrumbs" />
      <NavUserInfo />
    </div>
  </div>
</template>

<script lang="ts">
import NavUserInfo from './nav-user-info.vue';
import MlBreadCrumb from '@/base-ui/breadcrumb';
import { defineComponent, ref, computed } from 'vue';
import { pathMapBreadcrumbs } from '@/util/map-menus';
import { newUseStore } from '@/store';
import { useRoute } from 'vue-router';
export default defineComponent({
  emit: ['flodChange'],
  components: {
    NavUserInfo,
    MlBreadCrumb
  },
  setup(props, { emit }) {
    const isFold = ref(false);
    const menuShow = () => {
      isFold.value = !isFold.value;
      emit('flodChange', isFold.value);
    };
    //面包屑的数据
    const store = newUseStore();
    const route = useRoute();

    const breadcrumbs = computed(() => {
      //通过计算属性包裹，currentPath发生变化就会触发最新变化
      const userMenus = store.state.login.userMenus;
      const currentPath = route.path;
      return pathMapBreadcrumbs(userMenus, currentPath);
    });

    return { menuShow, breadcrumbs };
  }
});
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  align-items: center;
  height: 100%;
  i {
    font-size: 22px;
    cursor: pointer;
    &:hover {
      color: rgba(0, 0, 0, 0.466);
    }
  }
  .content {
    flex: 1;
    display: flex;
    justify-content: space-between;
    height: 100%;
  }
}
</style>
