import { mlHttp } from '../../../index';
import { IresType } from './type';

enum urls {
  categoryGoodsCount = '/goods/category/count',
  categoryGoodsSale = '/goods/category/sale',
  categoryGoodsFavor = '/goods/category/favor',
  addressGoodsSale = '/goods/address/sale'
}
export function getCategoryGoodsCount() {
  return mlHttp.get<IresType>({
    url: urls.categoryGoodsCount
  });
}
export function getCategoryGoodsSale() {
  return mlHttp.get<IresType>({
    url: urls.categoryGoodsSale
  });
}
export function getCategoryGoodsFavor() {
  return mlHttp.get<IresType>({
    url: urls.categoryGoodsFavor
  });
}
export function getAddressGoodsSale() {
  return mlHttp.get<IresType>({
    url: urls.addressGoodsSale
  });
}
