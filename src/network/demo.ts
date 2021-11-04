console.log('....');
import axios from 'axios';

// axios.get('http://123.207.32.32:8000/home/multidata').then((res) => {
//   console.log('get', res.data);
// });

//axios的配置选项
axios.defaults.baseURL = 'http://httpbin.org';
axios.defaults.timeout = 10000;
axios.defaults.headers = { header: 'respica-token' };

axios.interceptors.request.use(
  (req) => {
    console.log('请求拦截');
    return req;
  },
  (err) => {
    console.log(err);
  }
);

axios.interceptors.response.use(
  (res) => {
    console.log('响应拦截');
    return res;
  },
  (err) => {
    console.log(err);
  }
);

axios
  .get('/get', {
    params: {
      name: 'respica',
      age: 23
    },
    timeout: 10000,
    headers: { header: 'respica-token2' }
  })
  .then((res) => {
    console.log('get', res);
  });

axios
  .post('/post', {
    data: {
      name: 'respica',
      age: 23
    }
  })
  .then((res) => {
    console.log('post', res);
  });

axios.all([axios.get('/get', { params: { name: 'respica', age: 23 } }), axios.post('/post', { data: { name: 'respica', age: 23 } })]).then((res) => {
  console.log(res);
});
