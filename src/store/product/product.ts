import { Module } from 'vuex';
import { IRootState } from '@/store/type';
import { IProductState } from './type';
import { getPageListData } from '@/network/api/main/system/system';

const systemModule: Module<IProductState, IRootState> = {
  namespaced: true,
  state() {
    return {
      goodsList: [],
      goodsCount: 0
    };
  },
  mutations: {
    changeGoodsList(state, data: any[]) {
      state.goodsList = data;
    },
    changeGoodsCount(state, data: number) {
      state.goodsCount = data;
    }
  },
  getters: {
    //gette通过传值来确定返回的内容
    getPageListData(state) {
      return (pageName: string) => {
        switch (pageName) {
          case 'good':
            return state.goodsList;
        }
      };
    },
    getPageListCount(state) {
      return (pageName: string) => {
        switch (pageName) {
          case 'good':
            return state.goodsCount;
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
        case 'good':
          pageUrl = 'goods/list';
          break;
      }
      //开始请求数据，把数据放到vuex里面
      const data = await getPageListData(pageUrl, payload.queryInfo);
      const { list, totalCount } = data.data;
      switch (pageName) {
        case 'good':
          commit('changeGoodsList', list);
          commit(`changeGoodsCount`, totalCount);
          break;
      }
    }
  }
};

export default systemModule;
