import axios, { AxiosInstance } from 'axios';

const request = axios.create({
  timeout: 5000,
  // 这块不要用域名, 遇到了域名过期导致代码失效的问题.
  baseURL: 'http://www.wentaowulue.com:8080',
  // baseURL: 'https://1.12.37.251:8080',
  headers: {
    'Content-type': 'application/json'
  }
});

function setRequest(request: AxiosInstance) {
  request.interceptors.request.use(config => {
    config.data = JSON.stringify(config.data);
    config.headers['Authorization'] = localStorage.getItem('code');
    return config;
  },
  err => {
    console.log(err);
  });

  request.interceptors.response.use(config => config.data, err => console.error(err));
}

// 遇到异步队列里面, 服务端渲染找不到 localStorage.
setTimeout(() => {
  setRequest(request);
}, 0);

export default request;
