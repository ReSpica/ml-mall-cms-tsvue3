//网络封装出口
import mLRequest from './request';
import {
  BASE_URL,
  TIME_OUT,
  SHOW_LOADING,
  requestInterceptors,
  requestInterceptorsCatch,
  responentInterceptors,
  responentInterceptorsCatch
} from './request/config';

const mlHttp = new mLRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  showLoading: SHOW_LOADING,
  interceptors: {
    requestInterceptors,
    requestInterceptorsCatch,
    responentInterceptors,
    responentInterceptorsCatch
  }
});

const mlMock = new mLRequest({
  timeout: TIME_OUT,
  showLoading: SHOW_LOADING
});

export { mlHttp, mlMock };
