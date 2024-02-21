import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import router from '@/router/index.js'
import axios from 'axios'
import store from './store/cart.js'

const app = createApp(App);
// 401응답의 경우 inteceptor를 통해 공통적으로 토큰 제거 후 로그아웃처리
axios.interceptors.response.use(response => response, error =>{
  if(error.response && error.response.status === 401 || error.response.status === 403){
    localStorage.clear();
    window.location.href = "/login";
  }
  return Promise.reject(error);
})
app.use(router);
app.use(store);
app.mount('#app');
