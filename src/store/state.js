const state = {
  /*
     商品的数据结构 ,数组的话会有一些深拷贝浅拷贝的问题
     {
      'id': {
        'num': 1,
        'id': goodsId,
        'name': goodsName,
        'small_image': smallImage,
        'price': goodsPrice,
        'checked': true
      },
      'id': {}
     }
   */
  shopCartGoods: {},
  // 用户信息
  userInfo: {}
};


export default state