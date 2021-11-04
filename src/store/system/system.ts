import { Module } from 'vuex';
import { IRootState } from '@/store/type';
import { ISystemState } from './type';
import { getPageListData, deletePageData, createPageData, editPageData } from '@/network/api/main/system/system';

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      rolesList: [],
      rolesCount: 0,
      menusList: [],
      menusCount: 0
    };
  },
  mutations: {
    changeUsersList(state, data: any[]) {
      state.usersList = data;
    },
    changeUsersCount(state, data: number) {
      state.usersCount = data;
    },
    changeRolesList(state, data: any[]) {
      state.rolesList = data;
    },
    changeRolesCount(state, data: number) {
      state.rolesCount = data;
    },
    changeMenusList(state, data: any[]) {
      state.menusList = data;
    },
    changeMenusCount(state, data: number) {
      state.menusCount = data;
    }
  },
  getters: {
    //getter通过传值来确定返回的内容
    getPageListData(state) {
      return (pageName: string) => {
        switch (pageName) {
          case 'user':
            return state.usersList;
          case 'role':
            return state.rolesList;
          case 'menu':
            return state.menusList;
        }
      };
    },
    getPageListCount(state) {
      return (pageName: string) => {
        switch (pageName) {
          case 'user':
            return state.usersCount;
          case 'role':
            return state.rolesCount;
          case 'menu':
            return state.menusCount;
        }
        // return (state as any)[`${pageName}List`]
      };
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      //找到传来名称，通过pageUrlMap对应好请求地址
      const pageName: string = payload.pageName;
      let pageUrl = '';
      switch (pageName) {
        case 'user':
          pageUrl = 'users/list';
          break;
        case 'role':
          pageUrl = 'role/list';
          break;
        case 'menu':
          pageUrl = 'menu/list';
          break;
      }
      //开始请求数据，把数据放到vuex里面
      const data = await getPageListData(pageUrl, payload.queryInfo);
      const { list, totalCount } = data.data;
      switch (pageName) {
        case 'user':
          commit('changeUsersList', list);
          commit(`changeUsersCount`, totalCount);
          break;
        case 'role':
          commit('changeRolesList', list);
          commit(`changeRolesCount`, totalCount);
          break;
        case 'menu':
          commit('changeMenusList', list);
          commit(`changeMenusCount`, totalCount);
          break;
      }
    },
    //table公共删除方法
    async deletePageDataAction(store, payload: any) {
      //获取pageName和id
      let { pageName } = payload;
      const { id } = payload;
      switch (pageName) {
        case 'user':
          pageName = 'users';
          break;
      }
      const pageUrl = `/${pageName}/${id}`;
      //删除网络请求
      const { code } = await deletePageData(pageUrl);
      if (code === 0) {
        //删除成功刷新表格信息
        store.dispatch('getPageListAction', {
          pageName: payload.pageName,
          queryInfo: {
            offset: 0,
            size: 10
          }
        });
      }
    },
    //table公共新增方法
    async createPageDataAction({ dispatch }, payload: any) {
      let { pageName } = payload;
      const { newData } = payload;
      switch (pageName) {
        case 'user':
          pageName = 'users';
          break;
      }
      const pageUrl = `/${pageName}`;
      await createPageData(pageUrl, newData);
      dispatch('getPageListAction', {
        pageName: payload.pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      });
    },
    //table公共修改方法
    async editPageDataAction({ dispatch }, payload: any) {
      let { pageName } = payload;
      const { editData, id } = payload;
      switch (pageName) {
        case 'user':
          pageName = 'users';
          break;
      }
      const pageUrl = `/${pageName}/${id}`;
      await editPageData(pageUrl, editData);
      dispatch('getPageListAction', {
        pageName: payload.pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      });
    }
  }
};

export default systemModule;
