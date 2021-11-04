import { createStore, Store, useStore } from 'vuex';
import type { IRootState, IStoreType } from './type';
import login from './login/login';
import system from './system/system';
import product from './product/product';
import analysis from './analysis/analysis';
import { getPageListData } from '@/network/api/main/system/system';
const store = createStore<IRootState>({
  state: () => {
    return {
      name: 'respica',
      entireDepartment: [],
      entireRole: [],
      entireMenu: []
    };
  },
  mutations: {
    changeEntiireDepartment(state, list) {
      state.entireDepartment = list;
    },
    changeEntireRole(state, list) {
      state.entireRole = list;
    },
    changeEntireMenu(state, list) {
      state.entireMenu = list;
    }
  },
  getters: {},
  actions: {
    async getIntitalDataAction({ commit }) {
      //1.请求部门/角色/菜单下拉框数据
      const departmentResult = await getPageListData('/department/list', { offset: 0, size: 999 });
      const roleListResult = await getPageListData('/role/list', { offset: 0, size: 999 });
      const menuResult = await getPageListData('/menu/list', {});

      const { list: department } = departmentResult.data;
      const { list: roleList } = roleListResult.data;
      const { list: menuList } = menuResult.data;

      //2.保存
      commit('changeEntiireDepartment', department);
      commit('changeEntireRole', roleList);
      commit('changeEntireMenu', menuList);
    }
  },
  modules: {
    login,
    system,
    product,
    analysis
  }
});

//初始化用的，放置刷新网页后我的vuex没东西了
export function setupStore() {
  store.dispatch('login/loadLocalLogin');
}

//平常的useStore是没有类型的，需要另外放个类型再返回出去，给页面使用
export function newUseStore(): Store<IStoreType> {
  return useStore();
}
export default store;
