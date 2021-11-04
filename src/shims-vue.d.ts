/* eslint-disable */
//允许加载.vue后缀的文件
declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

// declare let $store: any;
declare module '*.json'; //导入json报错问题
