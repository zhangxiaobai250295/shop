<template>
  <div id="" class="orderDetail">
    <!--  导航条  -->
    <van-nav-bar
        title="商品清单"
        left-arrow
        @click-left="$router.back()"
        :fixed = true
    >
    </van-nav-bar>
    <!--内容-->
    <van-cell-group style="margin-top: 3rem">
      <van-cell title="商品" :value="`共${checkedShopCount}件`"></van-cell>
      <van-card
          v-for="(goods, index) in checkedShopCart"
          :key="goods.id"
          :num="goods.num"
          :price="goods.price"
          :title="goods.name"
          :thumb="goods.small_image"
      >
      </van-card>
    </van-cell-group>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: "OrderDetail",
    computed:{
      ...mapState(['shopCartGoods']),
      // 1. 获取选中的商品
      checkedShopCart(){
        let shopCartGoods = [];
        Object.values(this.shopCartGoods).forEach((goods, index)=>{
          if(goods.checked){
            shopCartGoods.push(goods);
          }
        });
        return shopCartGoods;
      },
      // 2. 选中商品的总件数
      checkedShopCount(){
        return this.checkedShopCart.length;
      }
    },
    methods: {

    }
  }
</script>

<style lang="less" scoped>
  .orderDetail{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 200;
    background-color: #f5f5f5;
  }
</style>