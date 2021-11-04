<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="~@/assets/img/logo.svg" alt="log" />
      <span class="title" v-if="!collapse">Vue3+Ts</span>
    </div>
    <el-menu
      :default-active="defaultVal"
      class="el-menu-vertical"
      background-color="#0c2135"
      :collapse="collapse"
      text-color="#b7bdc3"
      :unique-opened="true"
      active-text-color="#fff"
    >
      <template v-for="item in userMenus" :key="item.id">
        <!-- 二级菜单情况 -->
        <template v-if="item.type === 1">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <i :class="item.icon ?? 'el-icon-setting'"></i>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item :index="subitem.id + ''" @click="handleMenuItem(subitem)">
                <i :class="subitem.icon" v-if="subitem.icon"></i>
                <span>{{ subitem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <!-- 一级菜单情况 -->
        <template v-if="item.type === 2">
          <el-menu-item :index="item.id + ''" @click="handleMenuItem(item)">
            <i :class="item.icon ?? 'el-icon-setting'"></i>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts" scoped>
import { defineComponent } from 'vue';
import { newUseStore } from '@/store';
import { useRouter, useRoute } from 'vue-router';
import { pathMapToMenu } from '@/util/map-menus';
export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    //获取菜单来循环
    const store = newUseStore();
    const userMenus = store.state.login.userMenus;
    //点击跳转
    const router = useRouter();
    const handleMenuItem = (menu: any) => {
      router.push({
        path: menu.url ?? '/not-found'
      });
    };
    //默认选择菜单
    const route = useRoute();
    const menu = pathMapToMenu(userMenus, route.path);
    const defaultVal = menu ? menu.id + '' : '1';

    return { userMenus, handleMenuItem, defaultVal };
  }
});
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #011423;
  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    align-items: center;
    line-height: 28px;
  }
  .img {
    height: 100%;
    width: auto;
    margin: 0px 10px;
  }
  .title {
    font-size: 16px;
    font-weight: 700;
    color: #fff;
    line-height: 28px;
  }

  .el-menu {
    border-right: none;
  }

  //目录
  .el-sub-menu {
    background-color: #001529 !important;
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
    .is-active {
      background-color: #043368e5 !important;
    }
  }
}
</style>
