import type { AxiosRequestConfig, AxiosResponse } from 'axios';

interface ISpicaRequestInterceptors<T = AxiosResponse> {
  requestInterceptors?: (req: AxiosRequestConfig) => AxiosRequestConfig; //拦截请求成功是AxiosRequestConfig类型(this.instance.interceptors.request.use()点击use能看到返回值的类型)
  requestInterceptorsCatch?: (err: any) => any; //拦截请求失败是是any类型(this.instance.interceptors.request.use()点击use能看到返回值的类型)
  responentInterceptors?: (res: T) => T; //拦截响应成功是AxiosResponse类型(this.instance.interceptors.response.use()点击use能看到返回值的类型)
  responentInterceptorsCatch?: (err: any) => any; //拦截响应失败是是any类型(this.instance.interceptors.response.use()点击use能看到返回值的类型)
}

interface ISpicaRequest<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: ISpicaRequestInterceptors<T>; //ISpicaRequest继承默认的配置传参类型，再加一个interceptors类型
  showLoading?: boolean;
}

export { ISpicaRequestInterceptors, ISpicaRequest };
