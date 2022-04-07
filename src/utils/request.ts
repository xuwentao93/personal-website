import axios from 'axios';

const request = axios.create({
  timeout: 10000,
  // baseURL: 'http://www.xuwentao.com:3000',
  baseURL: 'http://1.12.37.251:8080',
  headers: {
    'Content-type': 'application/x-www-form-urlencoded'
  }
});

request.interceptors.request.use(config => {
  config.data = JSON.stringify(config.data);
  return config;
},
err => {
  console.log(err);
});

request.interceptors.response.use(config => config.data, err => console.error(err));

export default request;
