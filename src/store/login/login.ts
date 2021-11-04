import { Module } from 'vuex';
import type { ILoginState } from './type';
import type { IRootState } from '../type';
import { loginApi, userInfoApi, userMenusApi } from '@/network/api/login/login';
import { IloginParams } from '@/network/api/login/type';
import localCache from '@/util/cache';
import router from '@/router';
import { mapMenusToRouter, mapMenusToPermissions } from '@/util/map-menus';

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permissions: []
    };
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token;
    },
    changeUserInfo(state, obj: any) {
      state.userInfo = obj;
    },
    changeUserMenu(state, userMenus: any) {
      //把菜单记录到vuex上
      state.userMenus = userMenus;
      //传入菜单获取跟菜单对应的routers
      const routers = mapMenusToRouter(userMenus);
      //把routers插进去router.main.children上
      routers.forEach((item) => {
        router.addRoute('main', item);
      });
      //获取权限数组
      const permissions = mapMenusToPermissions(userMenus);
      state.permissions = permissions;

      //解决了刷新变成404的问题
      // const nowRouter = window.location.hash.split('/').pop();
      // if (nowRouter && nowRouter !== 'login') {
      //   router.push({ name: nowRouter });
      // }
    }
  },
  actions: {
    async accountLoginAction({ commit, dispatch }, payload: IloginParams) {
      console.log('accountLoginAction', payload);
      //获取token
      const user = await loginApi(payload);
      commit('changeToken', user.data.token);
      localCache.setCache('token', user.data.token);
      //获取用户信息
      const userInfo = await userInfoApi(user.data.id);
      commit('changeUserInfo', userInfo.data);
      localCache.setCache('userInfo', userInfo.data);
      //获取用户菜单
      const userMenus = await userMenusApi(user.data.id);
      commit('changeUserMenu', userMenus.data);
      localCache.setCache('userMenus', userMenus.data);
      //请求部门/角色全局下拉框信息,主要写法，这是找它爸的方法
      dispatch('getIntitalDataAction', null, { root: true });

      //跳转到首页
      router.push('main'); //跳转
    },

    loadLocalLogin({ commit, dispatch }) {
      console.log('初始化vuex，login模块数据完成');
      const token = localCache.getCache('token');
      const userInfo = localCache.getCache('userInfo');
      const userMenus = localCache.getCache('userMenus');
      if (token) {
        commit('changeToken', token);
        //请求部门/角色全局下拉框信息,主要写法，这是找它爸的方法
        dispatch('getIntitalDataAction', null, { root: true });
      }
      if (userInfo) {
        commit('changeUserInfo', userInfo);
      }
      if (userMenus) {
        commit('changeUserMenu', userMenus);
      }
    }
  }
};

export default loginModule;
