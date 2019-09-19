//  购物车接口
import {HTTP} from './api/http'
import {config} from "../../config";

class OrderModel extends HTTP{
  // 4. 地址接口
  // 4.1 获取当前用户的地址
  getUserAddress(user_id) {
    return this.ajax(config.BASE_URL+ '/api/address/search/'+ user_id);
  }
  // 4.2 添加新的地址
  addUserAddress(user_id, address_name, address_phone, address_area, address_area_detail, address_post_code, address_tag, province, city, county, areaCode) {
    return this.ajax(config.BASE_URL+ '/api/address/add', {user_id, address_name, address_phone, address_area, address_area_detail, address_post_code, address_tag, province, city, county, areaCode}, 'POST');
  }
  // 4.3 编辑用户的地址
  changeUserAddress(address_id, user_id, address_name, address_phone, address_area, address_area_detail, address_post_code, address_tag, province, city, county, areaCode) {
    return this.ajax(config.BASE_URL+ '/api/address/edit', {address_id, user_id, address_name, address_phone, address_area, address_area_detail, address_post_code, address_tag, province, city, county, areaCode}, 'POST');
  }
  // 4.4 删除用户的地址
  delUserAddress(address_id) {
    return this.ajax(config.BASE_URL + '/api/address/del/'+ address_id)
  }
  // 4.5 获取单条地址
  getCurrentUserAddress( user_id, address_id) {
    return this.ajax(config.BASE_URL + '/api/address/one', {user_id, address_id}, 'POST');
  }
  // 5. 订单接口
  // 5.1 提交订单
  postOrder( user_id, address_id, arrive_time, cart_shop, notice, shop_price, dis_price) {
    return this.ajax(config.BASE_URL + '/api/order/post', {user_id, address_id, arrive_time, cart_shop, notice, shop_price, dis_price}, 'POST');
  }
  // 5.2 订单支付成功
  orderPaySuccess(user_id, order_id) {
    return this.ajax(config.BASE_URL + '/api/order/change_status', {user_id, order_id}, 'POST');
  }
  // 5.3 查询订单  status:pay 已支付 will 未支付  只传一个id值过去，查找所有订单
  getOrder(user_id, status) {
    return this.ajax(config.BASE_URL + '/api/order/get', {user_id, status}, 'POST');
  }
  // 6. 微信支付接口部署
  // 6.1 获取支付的URL
  getWXCode(outTradeNo, totalFee) {
    return this.ajax(config.PAY_URL+ '/createNative.do', {outTradeNo, totalFee});
  }
  // 6.2 查询是否支付成功
  queryPayStatus(out_trade_no){
    return this.ajax(config.PAY_URL+ '/queryPayStatus.do', {out_trade_no});
  }
}

export {OrderModel}