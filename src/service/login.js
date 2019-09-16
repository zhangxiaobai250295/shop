import {HTTP} from './api/http';
import {config} from "../../config";

class LoginModel extends HTTP{
  // 获取手机短信验证码 GET请求
  getPhoneCode(phone) {
    return this.ajax(config.BASE_URL + '/api/send_code', {phone})
  }
  // 手机验证码方式点击登陆的方法  post请求
  phoneCodeLogin(phone, code) {
    return this.ajax(config.BASE_URL + '/api/login_code', {phone, code}, 'POST')
  }
  // 2.3 用户名和密码登录(POST)
  pwdLogin(user_name, user_pwd, captcha) {
    return this.ajax(config.BASE_URL + '/api/login_pwd', {user_name, user_pwd, captcha}, 'POST');
  }
  // 2.4 自动登录
  getUserInfo() {
    return this.ajax(config.BASE_URL + '/api/userinfo');
  }
  // 2.5 退出登录
  getLogOut() {
    return this.ajax(config.BASE_URL + '/api/logout');
  }
}

export {LoginModel}