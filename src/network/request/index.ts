import axios from 'axios';

import type { AxiosInstance } from 'axios';
import type { ISpicaRequestInterceptors, ISpicaRequest } from './spicaType';
import { ElLoading, ILoadingInstance } from 'element-plus'; //全局拦截器上放接口请求加载效果
let SHOW_LOADING_Default = false;

class mLRequest {
  instance: AxiosInstance; //放create的axios对象，它的类型点击axios.create(config)能看到
  interceptors?: ISpicaRequestInterceptors; //拦截器
  loading?: ILoadingInstance; //记录加载框
  showLoading: boolean; //判断是否需要使用加载器

  constructor(config: ISpicaRequest) {
    //config接收的各种配置参数，它的类型点击axios.create(config)能看到
    this.instance = axios.create(config);
    SHOW_LOADING_Default = config.showLoading ?? false;
    this.showLoading = config.showLoading ?? false; //显示加载框默认传true
    this.interceptors = config?.interceptors;
    this.instance.interceptors.request.use(this.interceptors?.requestInterceptors, this.interceptors?.requestInterceptorsCatch);
    this.instance.interceptors.response.use(this.interceptors?.responentInterceptors, this.interceptors?.responentInterceptorsCatch);
    this.instance.interceptors.request.use(
      (req) => {
        console.log(`全局拦截：${req.url}接口请求成功`);
        //判断是否需要显示加载框
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '请求数据中...',
            background: 'rgba(0,0,0,0.5)'
          });
        }

        return req;
      },
      (err) => {
        console.log(`全局拦截：接口请求失败`);
        this.loading?.close();
        return err;
      }
    );
    this.instance.interceptors.response.use(
      (res) => {
        if (res.status === 200) {
          console.log(`全局拦截：${res.request.responseURL}接口响应成功，分离data...`);
          setTimeout(() => {
            this.loading?.close();
          }, 1000);
          const { data } = res;
          return data;
        } else {
          console.log('全局拦截：请求失败');
          this.loading?.close();
        }
      },
      (err) => {
        console.log(err);

        switch (err.response.status) {
          case 404:
            console.log(err, '全局拦截：接口响应失败，响应404');
            break;
          case 500:
            console.log(err, '全局拦截：接口响应失败，响应500');
            break;
        }
        this.loading?.close();
        return err;
      }
    );
  }

  //封装request
  request<T = any>(config: ISpicaRequest<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      //1.判断当前请求是否需要使用自己的请求拦截
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config);
      }

      //2.判断请求是否需要改变默认的加载框方案
      if (config.showLoading !== undefined) {
        this.showLoading = config.showLoading;
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          //3.判断请求是否需要使用自己的响应拦截
          if (config.interceptors?.responentInterceptors && res) {
            res = config.interceptors.responentInterceptors(res);
          }
          //4.请求完后初始化this.showLoading
          this.showLoading = SHOW_LOADING_Default;
          //5.最后返回res
          resolve(res);
        })
        .catch((err) => {
          //4.请求失败后初始化this.showLoading
          this.showLoading = SHOW_LOADING_Default;
          //5.最后返回res
          reject(err);
        });
    });
  }

  //基于封装的request，封装get
  get<T = any>(config: ISpicaRequest<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' });
  }
  //基于封装的request，封装post
  post<T = any>(config: ISpicaRequest<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' });
  }
  //基于封装的request，封装delete
  delete<T = any>(config: ISpicaRequest<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' });
  }
  //基于封装的request，封装patch
  patch<T = any>(config: ISpicaRequest<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' });
  }
}

export default mLRequest;
