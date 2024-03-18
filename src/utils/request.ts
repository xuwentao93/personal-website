import axios, { AxiosInstance } from 'axios';

const oldRequest = axios.create({
  timeout: 5000,
  // 这块不要用域名, 遇到了域名过期导致代码失效的问题.
  baseURL: 'https://1.12.37.251:8080',
  headers: {
    'Content-type': 'application/json',
    Authorization: localStorage.getItem('code')
  }
});

const request: AxiosInstance = axios.create({
  timeout: 5000,
  // 这块不要用域名, 遇到了域名过期导致代码失效的问题.
  baseURL: 'https://1.12.37.251:9090',
  headers: {
    'Content-type': 'application/json',
    Authorization: localStorage.getItem('code')
  }
});

function setRequest(request: AxiosInstance) {
  request.interceptors.request.use(config => {
    config.data = JSON.stringify(config.data);
    return config;
  },
  err => {
    console.log(err);
  });

  request.interceptors.response.use(config => config.data, err => console.error(err));
}

setRequest(request);
setRequest(oldRequest);

export { oldRequest, request };
