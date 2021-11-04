import { mlHttp } from '../../index';
import type { IloginParams, IresType } from './type';

enum urls {
  loginUrl = '/login',
  userInfoUrl = '/users/', // 用法: /users/1
  userMenuUrl = '/role/' // 用法: role/1/menu
}

//获取用户token,id
export const loginApi = (data: IloginParams) => {
  return mlHttp.post<IresType>({ url: urls.loginUrl, showLoading: false, data: data });
};
//根据用户id获取用户数据
export const userInfoApi = (id: number) => {
  return mlHttp.get<IresType>({ url: urls.userInfoUrl + id, showLoading: false });
};
//根据用户id获取菜单
export const userMenusApi = (id: number) => {
  return mlHttp.get<IresType>({ url: urls.userMenuUrl + id + '/menu', showLoading: false });
};
