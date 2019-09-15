<template>
  <div id="" class="addAddress">
    <!--  导航条  -->
    <van-nav-bar
        title="添加地址"
        left-arrow
        @click-left="onClickLeft"
        :fixed = true
    >
    </van-nav-bar>
    <!--  内容  -->
    <van-address-edit
        :area-list="areaList"
        show-postal
        show-set-default
        show-search-result
        :search-result="searchResult"
        @save="onSave"
        @change-detail="onChangeDetail"
        style="margin-top: 3rem"
    >
    </van-address-edit>
  </div>
</template>

<script>
  import {Toast} from 'vant'
  export default {
    name: "AddAddress",
    data() {
      return {
        areaList: {},
        searchResult: []
      }
    },
    methods: {
      onClickLeft() {
        this.$router.back()
      },
      onSave() {
        Toast('save');
      },
      onChangeDetail(val) {
        if (val) {
          this.searchResult = [{
            name: '黄龙万科中心',
            address: '杭州市西湖区'
          }];
        } else {
          this.searchResult = [];
        }
      }
    }
  }
</script>

<style lang="less" scoped>
.addAddress{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f5f5f5;
  z-index: 9999;
}
</style>