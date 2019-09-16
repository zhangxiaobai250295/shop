import {USER_INFO} from "./mutations-type";
import {getStore} from './../config/global'
import {LoginModel} from "../service/login";
const loginModel = new LoginModel();

const actions = {
  // 保存用户信息
  syncUserInfo({commit}, userInfo) {
    commit(USER_INFO, {userInfo})
  },
  // 2. 自动登录
  async reqUserInfo({commit}){
    // 2.1 从本地获取数据
    let userInfo = JSON.parse(getStore('userInfo'));
    if(userInfo){
      commit(USER_INFO, {userInfo});
    }else {
      // 2.2 从服务器端验证
      let result = await loginModel.getUserInfo();
      // console.log(result);
      if(200 === result.success_code){
        commit(USER_INFO, {userInfo: result.data});
      }
    }
  }
};

export default actions