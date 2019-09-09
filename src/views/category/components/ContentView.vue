<template>
  <div id="" class="container emptyWrapper">
    <div v-for="(info, list) in detailData" :key="info.id">
      <div class="categoryTitle">{{info.name}}</div>
      <GoodsItem :goodsData="info.products"/>
    </div>
  </div>
</template>

<script>
  import GoodsItem from "./GoodsItem";
  export default {
    name: "ContentView",
    props: {
      detailData: {
        type: Array,
        default: []
      }
    },
    components: {
      GoodsItem
    }
  }
</script>

<style lang="less" scoped>
  /*.container {*/
  /*  !*-webkit-overflow-scrolling 属性控制元素在移动设备上是否使用滚动回弹效果.*!*/
  /*  !*auto: 使用普通滚动, 当手指从触摸屏上移开，滚动会立即停止。*!*/
  /*  !*touch: 使用具有回弹效果的滚动, 当手指从触摸屏上移开，内容会继续保持一段时间的滚动效果。继续滚动的速度和持续的时间和滚动手势的强烈程度成正比。同时也会创建一个新的堆栈上下文。*!*/
  /*  !*在移动端上，在你用overflow-y:scorll属性的时候，你会发现滚动的效果很木，很慢，这时候可以使用-webkit-overflow-scrolling:touch这个属性，让滚动条产生滚动回弹的效果，就像ios原生的滚动条一样流畅。*!*/
  /*  overflow-y: auto;*/
  /*  -webkit-overflow-scrolling: touch;*/
  /*  overflow-scrolling: touch;*/
  /*  position: absolute;*/
  /*  left: 5.3125rem;*/
  /*  right: 0;*/
  /*  bottom: 0;*/
  /*  top: 0;*/
  /*  background: #FFF;*/
  /*}*/

  .container {
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    overflow-scrolling: touch;
  }

  .container {
    position: absolute;
    left: 5.3125rem;
    right: 0;
    bottom: 0;
    top: 0;
    background: #FFF;
  }

  .categoryTitle {
    padding: 0 0.3125rem;
    height: 1.25rem;
    line-height: 1.25rem;
    font-size: 0.75rem;
    background: #F8F8F8;
    color: #666666;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>