<template>
  <div class="logi-panel">
    <h1>LOGIN</h1>
    <ul>
      <li>
        <i class="fas fa-user"></i>
        <el-input v-model="data.user" placeholder="账号" @focus="userFocus = true" @blur="userFocus = false" :class="{ 'active-input': userFocus }"></el-input>
      </li>
      <li>
        <i class="fas fa-lock"></i>
        <el-input
          v-model="data.pwd"
          type="password"
          placeholder="密码"
          @focus="pwdFocus = true"
          @blur="pwdFocus = false"
          show-password
          :class="{ 'active-input': pwdFocus }"
        ></el-input>
      </li>
    </ul>
    <span @click="login">Go!</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import cache from '@/util/cache';
import { useStore } from 'vuex';
export default defineComponent({
  setup() {
    const store = useStore();
    const data = reactive({
      user: 'coderwhy',
      pwd: '123456'
    });
    const userFocus = ref(false);
    const pwdFocus = ref(false);
    const login = () => {
      cache.setCache('user', 'coderwhy'); //记录名字
      store.dispatch('login/accountLoginAction', { name: data.user, password: data.pwd }); //vuex去方法请求接口
    };
    return {
      data,
      userFocus,
      pwdFocus,
      login
    };
  }
});
</script>
<style lang="less" scoped>
.logi-panel {
  text-align: center;
  & > h1 {
    color: #fff;
  }
  & > ul {
    li {
      display: flex;
      margin: 10px 0px;
      i {
        color: #fff;
        line-height: 34px;
        margin-right: 4px;
        vertical-align: top;
        font-size: 16px;
      }
      /deep/.el-input {
        height: 30px;
        line-height: 30px;
      }
      /deep/.el-input__inner {
        background-color: transparent;
        border-color: transparent;
        border-bottom-color: #fff;
        color: #ffff;
        line-height: 30px;
        height: 30px;
      }
      /deep/.active-input {
        .el-input__inner {
          border-color: #fff;
        }
      }
      /deep/.el-input__icon {
        line-height: 30px;
      }
    }
  }
  & > span {
    display: inline-block;
    line-height: 28px;
    padding: 0px 60px;
    border-radius: 6px;
    cursor: pointer;
    background-color: #8ec5fc;
    background-image: linear-gradient(62deg, #8ec5fc 0%, #e0c3fc 100%);
    color: #fff;
    font-weight: 700;
    font-size: 16px;
    &:hover {
      font-size: 18px;
    }
  }
}
</style>
