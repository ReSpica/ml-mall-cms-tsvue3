import { createApp } from 'vue';
import rootApp from './App.vue';
import router from './router';
import store from './store';
// import { mlHttp, mlMock } from '@/network'; //导入封装好的请求
import { gobalRegister } from './gobal'; //把第三方的注册内容抽取到一个文件管理
import '@/assets/css/index.less'; //全局样式
import { setupStore } from '@/store';

console.log(process.env.VUE_APP_BASE_URL); //测试单独文件环境配置

const app = createApp(rootApp);
gobalRegister(app);
app.use(store);
setupStore(); //初始化vuex数据
app.use(router); //路由放最后，因为setupStore会改变路由地址,需要它改完才能去注册路由得到最新的路由映射表

app.mount('#app');

// interface dataType {
//   data: any;
//   returnCode: string;
//   success: string;
// }
// spicaHttp
//   .request<dataType>({
//     url: '/home/multidata',
//     method: 'GET',
//     interceptors: {
//       requestInterceptors: (req) => {
//         console.log(`接口拦截：${req.url}接口请求成功`);
//         return req;
//       },
//       responentInterceptors: (res) => {
//         console.log(`接口拦截：接口响应成功`, res);
//         return res;
//       }
//     },
//     showLoading: true
//   })
//   .then((res) => {
//     console.log(res);
//   });

//简单版get请求，没接口拦截，没固定格式
// spicaHttp
//   .get({
//     url: '/home/multidata',
//     showLoading: true
//   })
//   .then((res) => {
//     console.log(res);
//   });

//mock请求尝试
// spicaMock
//   .get({
//     url: '/parameter/query',
//     showLoading: true
//   })
//   .then((res) => {
//     console.log(res);
//   });

//mock请求尝试
// spicaMock
//   .delete({
//     url: '/parameter/query',
//     showLoading: true,
//     data: {
//       id: '1'
//     }
//   })
//   .then((res) => {
//     console.log(res);
//   });

// spicaMock
//   .get({
//     url: '/parameter/query',
//     showLoading: true
//   })
//   .then((res) => {
//     console.log(res);
//   });
