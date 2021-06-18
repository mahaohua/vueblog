import axios from 'axios'
import Element from 'element-ui'
import router from './router'
import store from './store'

axios.defaults.baseURL = "http://localhost:8080";

// 前置拦截
axios.interceptors.request.use(config => {
  // 可以统一设置请求头
  return config;
})

axios.interceptors.response.use(response => { // 定义全局axios拦截器
    let res = response.data;

    console.log("=============");
    console.log(res);
    console.log("=============");

    if (res.code === 200) {
      return response;
    } else {
      // 弹窗异常信息
      if(response.data.msg !== null)
        Element.Message.error(response.data.msg, {duration: 3 * 1000});
      // 直接拒绝往下面返回结果信息
      return Promise.reject(response.data.msg);
    }
  },
  error => {
    console.log(error);
    if(error.response.data){
      error.message = error.response.data.msg
    }

    // 根据请求状态进行操作
    if (error.response.status === 401) {
      store.commit("REMOVE_INFO");
      router.push("/login");
      error.message = '请重新登录';
    }
    if (error.response.status == 403) {
      error.message = '权限不足，无法访问';
    }

    Element.Message.error(error.message, {duration: 3 * 1000});
    return Promise.reject(error);
  }
)
