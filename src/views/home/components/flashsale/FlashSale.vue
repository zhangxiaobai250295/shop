<template>
  <div id="" class="container">
    <div class="titleWrapper">
      <div class="title">限时抢购</div>
      <span class="actionStateText">07:00场</span>
      <div class="actionStateTextEnd">已结束</div>
      <span class="more">更多</span>
    </div>
    <div class="itemsWrapper">
      <FlashSaleItem v-for="(item, index) in flashSaleData" :key="item.id" :flashSaleList="item"/>
    </div>
  </div>
</template>

<script>
  import FlashSaleItem from "./FlashSaleItem";
  export default {
    name: "FlashSale",
    props: {
      flashSaleData: {
        type: Array,
        default: []
      }
    },
    components: {
      FlashSaleItem
    }
  }
</script>

<style lang="less" scoped>
  .container {
    position: relative;
    margin-top: 0.625rem;
    padding: 1.25rem 0 0.9375rem 0;
    background: white;
  }

  .titleWrapper {
    position: relative;
    margin: 0 0.625rem 0.625rem 0.625rem;
    height: 1.5625rem;
  }

  .title {
    display: inline-block;
    border-left: 4px #3cb963 solid;
    padding-left: 0.3125rem;
    height: 1.3125rem;
    line-height: 1.3125rem;
    vertical-align: middle;
    font-size: 1.1875rem; }

  .actionStateText {
    display: inline-block;
    vertical-align: middle;
    line-height: 0.875rem;
    font-size: 0.875rem;
    /*border-radius: 3px;*/
    padding: 0.15625rem;
    /*border: 1px solid #FE3824;*/
    color: #FE3824;
    margin-left: 0.3125rem; }

  .actionStateTextEnd {
    display: inline-block;
    vertical-align: middle;
    line-height: 0.875rem;
    font-size: 0.875rem;
    border-radius: 3px;
    padding: 0.15625rem;
    border: 1px solid #999;
    color: #666;
    margin-left: 0.3125rem;
  }

  .more {
    position: absolute;
    top: 0;
    right: 0;
    height: 1.5625rem;
    line-height: 1.5625rem;
    font-size: 0.875rem;
    color: #2EB257;
  }

  .itemsWrapper {
    white-space: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    overflow-scrolling: touch; // 属性控制元素在移动设备上是否使用滚动回弹效果.
    // auto: 使用普通滚动, 当手指从触摸屏上移开，滚动会立即停止。
    // touch: 使用具有回弹效果的滚动, 当手指从触摸屏上移开，内容会继续保持一段时间的滚动效果。继续滚动的速度和持续的时间和滚动手势的强烈程度成正比。同时也会创建一个新的堆栈上下文。
  }

  .itemsWrapper::-webkit-scrollbar{
    display: none  // 隐藏滚动条
    // ::-webkit-scrollbar — 整个滚动条.
    // ::-webkit-scrollbar-button — 滚动条上的按钮 (上下箭头).
    // ::-webkit-scrollbar-thumb — 滚动条上的滚动滑块.
    // ::-webkit-scrollbar-track — 滚动条轨道.
    // ::-webkit-scrollbar-track-piece — 滚动条没有滑块的轨道部分.
    // ::-webkit-scrollbar-corner — 当同时有垂直滚动条和水平滚动条时交汇的部分.
    // ::-webkit-resizer — 某些元素的corner部分的部分样式(例:textarea的可拖动按钮).
  }
</style>