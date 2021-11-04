import { Module } from 'vuex';
import { IAnalysisState } from './type';
import { IRootState } from '../type';
import { getCategoryGoodsCount, getCategoryGoodsSale, getCategoryGoodsFavor, getAddressGoodsSale } from '@/network/api/main/analysis/analysis';

const analysisModule: Module<IAnalysisState, IRootState> = {
  namespaced: true,
  state() {
    return {
      categoryGoodsCount: [],
      categoryGoodsSale: [],
      categoryGoodsFavor: [],
      addressGoodsSale: []
    };
  },
  mutations: {
    changeCategoryGoodsCount(state, list) {
      state.categoryGoodsCount = list;
    },
    changeGetCategoryGoodsSale(state, list) {
      state.categoryGoodsSale = list;
    },
    changeGetCategoryGoodsFavor(state, list) {
      state.categoryGoodsFavor = list;
    },
    changeGetAddressGoodsSale(state, list) {
      state.addressGoodsSale = list;
    }
  },
  actions: {
    async getDashboarddDataAction({ commit }) {
      const result = await getCategoryGoodsCount();
      commit('changeCategoryGoodsCount', result.data);
    },
    async getCategoryGoodsSaleAction({ commit }) {
      const result = await getCategoryGoodsSale();
      commit('changeGetCategoryGoodsSale', result.data);
    },
    async getCategoryGoodsFavorAction({ commit }) {
      const result = await getCategoryGoodsFavor();
      commit('changeGetCategoryGoodsFavor', result.data);
    },
    async getAddressGoodsSaleAction({ commit }) {
      const result = await getAddressGoodsSale();
      commit('changeGetAddressGoodsSale', result.data);
    }
  }
};

export default analysisModule;
