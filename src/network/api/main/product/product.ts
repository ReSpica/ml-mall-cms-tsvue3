import { mlHttp } from '../../../index';
import { IresType } from './type';

export function getPageListData(url: string, queryInfo: any) {
  return mlHttp.post<IresType>({
    url: url,
    data: queryInfo
  });
}
