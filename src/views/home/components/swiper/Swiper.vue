<template>
  <div id="container">
    <swiper :options="swiperOption" ref="mySwiper" class="swiper">
      <!-- slides -->
      <swiper-slide v-for="(item,index) in swiperData" :key="item.cid">
        <img :src="item.icon_url" :alt="item.public_name">
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default {
    props: {
      swiperData: {
        type: Array,
        default: []
      }
    },
    name: "Swiper",
    components: {
      swiper,
      swiperSlide
    },
    computed: {
      swiper(){  // 拿到swiper轮播图对象
        return this.$refs.mySwiper.swiper
      }
    },
    mounted() {
      //this.swiper.slideTo(5,1000, false)
    },
    data() {
      return {
        swiperOption: {
          notNextTick: true,
          pagination: {   // 配置分页器(下面的几个圆点)
            el: '.swiper-pagination',
            clickable :true
            // bulletActiveClass: 'my-bullet-active',    // 定义pagination 分页器内当前活动块的指示小点的类名。
          },
          loop : true,
          autoplay: {       // 图片切换的间隔
            delay: 1000
          },
          speed: 600,      // 图片切换的速度
          // on: {
          //   slideChangeTransitionEnd: function(){  // 图片切换结束后的监听函数
          //     // alert(this.activeIndex);//切换结束时，告诉我现在是第几个slide
          //   },
          // }
        }
      }
    },
  }
</script>

<style lang="less" scoped>
.swiper{
  width: 100%;
  height: 14rem;
  img{
    height: 100%;
    width: 100%;
  }
}
.swiper /deep/ .swiper-pagination-bullet-active{
  background: #75a342 !important;
}
</style>