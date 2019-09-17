<template>
    <div id="container">
      <Header />
      <div class="listWrapper" v-if="!showLoading">
        <!--    左边    -->
        <div class="leftWrapper">
          <ul class="wrapper">
            <li
                class="categoryItem "
                :class="{selected: currentIndex === index}"
                v-for="(item,index) in categoriesData"
                :key="item.id"
                @click="clickItem(index)"
                ref="menuList"
            >
              <span class="textWrapper">{{item.name}}</span>
            </li>
          </ul>
        </div>
        <!--    右边    -->
        <ContentView :detailData="categoriesDetailData"/>
      </div>
      <van-loading v-else type="spinner" size="24px" color="#75a342" class="loading-position">加载中...</van-loading>
    </div>
</template>

<script>
  // 引入category的数据处理模块
  // import {CategoryModel} from '../../service/category'
  import CategoryModel from '../../service/category'
  const categoryModel = new CategoryModel();

  import Header from "./components/Header";
  import ContentView from "./components/ContentView";

  // 引入better-scroll滚动插件
  import BScroll from 'better-scroll'

  // 引入通知组件
  import { Toast } from 'vant';
  // 引入发布者订阅插件
  import PubSub from 'pubsub-js'
  // 引入vuex
  import {mapMutations} from 'vuex'

  export default {
    name: "Category",
    components: {
      Header, ContentView
    },
    mounted() {
      // 订阅消息
      // PubSub.subscribe('categoryAddToCart',(msg,goods) => {
      //   if (msg === 'categoryAddToCart') {
      //     this.ADD_GOODS({
      //       goodsId: goods.id,
      //       goodsName: goods.name,
      //       smallImage: goods.small_image,
      //       goodsPrice: goods.price,
      //     })
      //   }
      //   Toast({
      //     message: '添加购物车成功',
      //     duration: 800
      //   });
      // })
    },
    // beforeDestroy() {
    //   // 清除发布的消息  不然会占用内存  且发布订阅者模式会有一个订阅栈
    //   // 不清除的话  每次订阅到就会从头开始执行之前所有发布过的消息
    //   PubSub.unsubscribe('categoryAddToCart');
    // },
    created (){
      this.getCategoryData();      // 获取category页面的全部数据
    },
    data (){
      return {
        showLoading: true,         // 是否显示在进入category页面时数据未加载成功时的加载动画
        categoriesData: [],        // 左边分类的的目录数据
        categoriesDetailData: [],  // 左边分类的的目录的详情数据
        currentIndex: 0            // 左边分类item是否选中
      }
    },
    methods: {
      ...mapMutations(['ADD_GOODS']),
      getCategoryData (){             // 获取category的全部数据
        const categoriesData = categoryModel.getCategoriesData();
        const categoriesDetailData = categoryModel.getCategoriesDetailData('/lk001');
        Promise.all([categoriesData, categoriesDetailData]).then(res => {
          if (res[0].success) {
            this.categoriesData = res[0].data.cate;
            // console.log(this.categoriesData);
          }
          if (res[1].success) {
            this.categoriesDetailData = res[1].data.cate;
          }
          // 当全部数据都加载下来之后就隐藏加载动画
          this.hiddenLoading();
          // 初始化滚动插件
          this.$nextTick(() => {
            this.leftScroll = new BScroll('.leftWrapper', {
              probeType: 3,
              click: true,
              scrollY: true,
              tap: true, // 该插件会阻止默认的点击事件 所以在这里开启
              onmousewheel: true // 手机端滚动(解决一开始加载不能滚动的问题)
            })
          })
        })
      },
      hiddenLoading (){                  // 隐藏数据加载动画
        this.showLoading = false;
      },
      async clickItem (index){
        this.currentIndex = index;

        // 拿到点击的具体元素
        let menuLists = this.$refs.menuList;
        let el = menuLists[index];
        // 滚动到该元素
        this.leftScroll.scrollToElement(el,200);
        // 获取该元素的详细数据
        const detailData = await categoryModel.getCategoriesDetailData(`/lk00${index+1}`);
        if (detailData.success) {
          this.categoriesDetailData = detailData.data.cate;
        }
      }
    }
  }
</script>

<style lang="less" scoped>
#container{
  width: 100%;
  height: 100%;
  /*background-color: #F5F5F5;*/
  overflow: hidden;
}
.listWrapper{
  display: flex;
  position: absolute;
  top: 2.8rem;
  bottom: 3rem;
  width: 100%;
  background-color: rebeccapurple;
  overflow: hidden;
  .leftWrapper {
    background-color: #F4F4F4;
    width: 5.3125rem;
    flex: 0 0 5.3125rem;
  }

  .categoryItem {
    padding: 0.75rem 0;
    border-bottom: solid 1px #E8E9E8;
    position: relative;
  }

  .categoryItem .textWrapper {
    line-height: 1.25rem;
    border-left: solid 0.1875rem transparent;
    padding: 0.3125rem 0.6875rem;
    font-size: 0.8125rem;
    color: #666666;
  }

  .categoryItem.selected {
    background: #FFF;
  }

  .categoryItem.selected .textWrapper {
    border-left-color: #3cb963;
    font-weight: bold;
    font-size: 0.875rem;
    color: #333333;
  }

  @media (min-width: 960px) {
    .wrapper {
      border-right: 1px solid #E8E9E8;
    }

    .wrapper .categoryItem {
      background: #fff;
    }
  }
}
</style>