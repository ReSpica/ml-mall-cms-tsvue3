import type { ILoginState } from './login/type';
import type { ISystemState } from './system/type';
import type { IAnalysisState } from './analysis/type';
export interface IRootState {
  name: string;
  entireDepartment: any;
  entireRole: any;
  entireMenu: any;
}

export interface IRootWithModule {
  login: ILoginState;
  system: ISystemState;
  analysis: IAnalysisState;
}

//交叉类型给页面用的类型
// {
//   name:xxx,
//   login:xxx
// }
export type IStoreType = IRootWithModule & IRootState;
