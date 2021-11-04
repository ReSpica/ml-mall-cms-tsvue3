//axios的默认配置
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
//获取token
import localCache from '@/util/cache';

//请求地址 ： process.env.NODE_ENV = devlopment | production | test   (开发/生产/测试)
let BASE_URL = '';
switch (process.env.NODE_ENV) {
  case 'development':
    BASE_URL = '/api';
    break;
  case 'production':
    BASE_URL = 'http://152.136.185.210:5000';
    break;
  case 'test':
    BASE_URL = 'http://152.136.185.210:5000';
    break;
}

//过期时间
const TIME_OUT = 10000;

//是否存在全局loading
const SHOW_LOADING = true;

//请求成功拦截
function requestInterceptors(req: AxiosRequestConfig): AxiosRequestConfig {
  console.log(`实例拦截：${req.url}接口请求成功`);
  //设置token
  const token = localCache.getCache('token');
  req.headers.Authorization = token ? `Bearer ${token}` : '';
  return req;
}
//请求失败拦截
function requestInterceptorsCatch(err: any): any {
  console.log(`实例拦截：接口请求失败`);
  return err;
}
//响应成功拦截
function responentInterceptors(res: AxiosResponse): AxiosResponse {
  console.log(`实例拦截：${res.request.responseURL}接口响应成功`);
  return res;
}
//响应失败拦截
function responentInterceptorsCatch(err: any): any {
  console.log(`实例拦截：接口响应失败`);
  return err;
}

export { BASE_URL, TIME_OUT, SHOW_LOADING, requestInterceptors, requestInterceptorsCatch, responentInterceptors, responentInterceptorsCatch };
