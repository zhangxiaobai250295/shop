import {ADD_GOODS} from "./mutations-type";

const mutations = {
  [ADD_GOODS](state,{goodsId,goodsName,smallImage,goodsPrice}) {    // 网购物车里面添加一件商品
    // 商品数据只需传这些简单数据  这样就不会涉及深浅拷贝问题
    // 或者只需传一个id  然后在去请求服务器拿到数据
    let shopCartGoods = state.shopCartGoods;
    if (shopCartGoods[goodsId]) { // 判断商品是否已经存在
      shopCartGoods[goodsId]['num']++  // 存在则给该商品的数量加一
    } else {
      shopCartGoods[goodsId] = {
        'num': 1,
        'id': goodsId,
        'name': goodsName,
        'small_image': smallImage,
        'price': goodsPrice,
        'checked': true
      }
    }
    // 生成新的购物车数据
    state.shopCartGoods = {...shopCartGoods}
  }
};

export default mutations