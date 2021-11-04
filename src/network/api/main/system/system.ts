import { mlHttp } from '../../../index';
import { IresType } from './type';

export function getPageListData(url: string, queryInfo: any) {
  return mlHttp.post<IresType>({
    url: url,
    data: queryInfo
  });
}

export function deletePageData(url: string) {
  return mlHttp.delete<IresType>({
    url: url
  });
}

export function createPageData(url: string, newData: any) {
  return mlHttp.post<IresType>({
    url: url,
    data: newData
  });
}

export function editPageData(url: string, editData: any) {
  console.log('editData', editData);

  return mlHttp.patch<IresType>({
    url: url,
    data: editData
  });
}
