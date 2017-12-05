import axios from 'axios';

// http request 拦截器
axios.interceptors.request.use((config) => {
  return config;
}, (err) => {
  return Promise.reject(err);
});
// http response 拦截器
axios.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response && error.response.status === 401) {
    console.log(401, '权限不足');
  } else {
    return Promise.resolve(error.response);
  }
});

export default axios;
