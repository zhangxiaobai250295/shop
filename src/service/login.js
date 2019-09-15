import {HTTP} from './api/http';
import {config} from "../../config";

class LoginModel extends HTTP{
  // 获取手机短信验证码 GET请求
  getPhoneCode(phone) {
    return this.ajax(config.BASE_URL + '/api/send_code', {phone})
  }
  // 手机验证码方式点击登陆的方法  post请求
  phoneCodeLogin(phone, code) {
    console.log(phone);
    console.log(code);
    return this.ajax(config.BASE_URL + '/api/login_code', {phone, code}, 'POST')
  }
}

export {LoginModel}