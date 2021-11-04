<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <MlCard title="分类商品数量(饼图)">
          <PreEchart :pieData="categoryGoodsCount" />
        </MlCard>
      </el-col>
      <el-col :span="10">
        <MlCard title="不同城市商品销量">
          <MapEcharts :mapData="addressGoodsSale" />
        </MlCard>
      </el-col>
      <el-col :span="7">
        <MlCard title="分类商品数量(玫瑰图)">
          <RoseEchart :roseData="categoryGoodsCount" />
        </MlCard>
      </el-col>
    </el-row>
    <el-row :gutter="10" style="margin-top: 10px">
      <el-col :span="12">
        <MlCard title="分类商品的销量">
          <LineEcharts :lineData="categoryGoodsSale" />
        </MlCard>
      </el-col>
      <el-col :span="12">
        <MlCard title="分类商品的收藏">
          <BarEcharts :barData="categoryGoodsFavor" />
        </MlCard>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { newUseStore } from '@/store';
import MlCard from '@/base-ui/card';
import { PreEchart, RoseEchart, LineEcharts, BarEcharts, MapEcharts } from '@/components/page-echarts';
export default defineComponent({
  components: { MlCard, PreEchart, RoseEchart, LineEcharts, BarEcharts, MapEcharts },
  setup() {
    const store = newUseStore();
    store.dispatch('analysis/getDashboarddDataAction');
    store.dispatch('analysis/getCategoryGoodsSaleAction');
    store.dispatch('analysis/getCategoryGoodsFavorAction');
    store.dispatch('analysis/getAddressGoodsSaleAction');
    //商品数量
    const categoryGoodsCount = computed(() => {
      return store.state.analysis.categoryGoodsCount.map((item: any) => {
        return { name: item.name, value: item.goodsCount };
      });
    });
    //商品销量
    const categoryGoodsSale = computed(() => {
      let xData: any = [];
      let yData: any = [];
      store.state.analysis.categoryGoodsSale.forEach((item: any) => {
        xData.push(item.name);
        yData.push(item.goodsCount);
      });
      return { xData, yData };
    });
    //商品收藏
    const categoryGoodsFavor = computed(() => {
      let xData: any = [];
      let yData: any = [];
      store.state.analysis.categoryGoodsFavor.forEach((item: any) => {
        xData.push(item.name);
        yData.push(item.goodsFavor);
      });
      return { xData, yData };
    });
    //城市商品销量
    const addressGoodsSale = computed(() => {
      return store.state.analysis.addressGoodsSale.map((item: any) => {
        return { name: item.address, value: item.count };
      });
    });
    return { categoryGoodsCount, categoryGoodsSale, categoryGoodsFavor, addressGoodsSale };
  }
});
</script>

<style scoped></style>
