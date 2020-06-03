
import {message} from "antd";
import axios from "axios"
// axios 设置基本路径  

let token = "";
const baseURL = "http://localhost:3000";   // 开发地址  dev
// const baseURL = "http://39.97.210.66:3000";   // 生产地址  prod 

axios.defaults.baseURL = baseURL;
axios.defaults.headers.common['token'] = token;  // 设置请求头里面的 token 
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'; // 设置POST提交数据的文档类型编码

var hide = null;

function showLoading(){
    message.destroy();
    hide =  message.loading('加载中...',1);
}

function success(msg){
    message.destroy();
    message.success(msg,1);
}

function fail(msg){
    message.destroy();
    message.error(msg);
}

// Interceptors 拦截器 
// Add a request interceptor (添加请求的拦截器 发送之前要做业务逻辑)
axios.interceptors.request.use(function (config) {
    // Do something before request is sent(请求发送之前)
    token = sessionStorage.token || token;
    config.headers.token = token;   // 客户端发送 token  到服务器  绑定到 req.headers
    console.log(config)

    showLoading();
    return config;
  }, function (error) {
    // Do something with request error(请求发送失败)
    fail("请求失败")
    return Promise.reject(error);
});
// Add a response interceptor (添加响应的拦截器 服务器响应数据到客户端之前)
axios.interceptors.response.use(function (response) {
    // Do something with response data(响应成功业务逻辑)
    console.log(response.data)
    setTimeout(()=>{
        // 没有type  直接就是 success 
        if(response.data.type===1){  // 1 表示 成功  0 表示失败  
            success(response.data.msg||'请求数据成功');
        }else{
            if(response.data.type===0){
                fail(response.data.msg||'请求数据失败');
            }else{
                success(response.data.msg||'请求数据成功');
            }
        }

        if(response.data.code=="3000"){
            
        }
        
    },1000);

    return response;
  }, function (error) {
    fail("响应失败")
    // Do something with response error (响应失败的业务逻辑)
    return Promise.reject(error);
});




export {axios,baseURL}