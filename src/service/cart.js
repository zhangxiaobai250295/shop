//  购物车接口
import {HTTP} from './api/http'
import {config} from "../../config";

class CartModel extends HTTP{
  /*
3.1 添加商品
请求方式：POST
参数：{goods_id: String, goods_name: String, goods_price: Number, small_image: String}
*/
  addGoodsToCar(user_id, goods_id, goods_name, goods_price, small_image){
    return this.ajax(config.BASE_URL + '/api/cart/add', {user_id, goods_id, goods_name, goods_price, small_image}, 'POST');
  }
  // 3.2 获取当前用户购物车中的商品
  getGoodsCart(user_id) {
    return this.ajax(config.BASE_URL + '/api/cart/search/'+ user_id);
  }
  // 3.3 修改购物车商品数量  type 加或者减
  changeCartNum(user_id, goods_id, type) {
    return this.ajax(config.BASE_URL + '/api/cart/num', {user_id, goods_id, type}, 'POST');
  }
  // 3.4 删除当前用户购物车中所有的商品
  clearAllCart(user_id) {
    return this.ajax(config.BASE_URL+ '/api/cart/clear/'+ user_id);
  }
}

export {CartModel}