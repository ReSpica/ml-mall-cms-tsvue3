<template>
  <div class="nav-user-info">
    <i class="el-icon-collection-tag"></i>
    <i class="el-icon-chat-dot-round"></i>
    <el-badge is-dot class="bell">
      <i class="el-icon-bell"></i>
    </el-badge>
    <el-dropdown>
      <span class="el-dropdown-link">
        <!-- <img src="~@/assets/img/tx.png" alt="tx" /> -->
        <el-avatar size="small" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" fit="fit"></el-avatar>
        <span>{{ name }}</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item icon="el-icon-school">系统管理</el-dropdown-item>
          <el-dropdown-item icon="el-icon-user">用户信息</el-dropdown-item>
          <el-dropdown-item icon="el-icon-edit">修改密码</el-dropdown-item>
          <el-dropdown-item icon="el-icon-circle-close" divided @click="handleExitClick"> 退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { newUseStore } from '@/store';
import localCache from '@/util/cache';
import { useRouter } from 'vue-router';
export default defineComponent({
  setup() {
    const store = newUseStore();
    const name = computed(() => store.state.login.userInfo.name);

    const router = useRouter();
    const handleExitClick = () => {
      localCache.delCache('token');
      router.push('/main');
    };
    return { name, handleExitClick };
  }
});
</script>

<style scoped lang="less">
.nav-user-info {
  height: 100%;
  display: flex;
  align-items: center;
  /deep/.el-dropdown {
    height: 100% !important;
  }
  .el-dropdown-link {
    display: flex;
    align-items: center;
    height: 100%;
  }
  .bell {
    line-height: 16px;
    margin: 0px 10px;
    cursor: pointer;
  }
  & > i {
    margin: 0px 10px;
    cursor: pointer;
  }
}
</style>
