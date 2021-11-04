import * as echarts from 'echarts';
import chinaMapData from '../map/china.json';

//一个函数接收参数，返回实例对象和实例绘制方法等
export default function (el: HTMLElement) {
  const echartInstance = echarts.init(el);

  const setOptions = (options: echarts.EChartsCoreOption) => {
    echartInstance.setOption(options);
  };
  //浏览器缩放事件，自动修改图的大小，达到响应式
  window.addEventListener('resize', () => {
    echartInstance.resize();
  });
  //当菜单隐藏时候也需要resize，所以也要弹出这个方法
  const setResize = () => {
    echartInstance.resize();
  };
  return {
    echartInstance, //实例
    setOptions, //绘制
    setResize //大小自适应
  };
}

//注册地图
echarts.registerMap('china', chinaMapData);
