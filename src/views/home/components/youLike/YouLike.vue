<template>
  <div id="" class="container">
    <div class="titleWrapper">
      <div class="middleLine"></div>
      <div class="title">猜你喜欢</div>
    </div>
    <div class="contentWrapper">
      <YouLikeItem v-for="(item,index) in youLikeData" :key="item.id" :youLikeItemData="item"/>
    </div>
  </div>
</template>

<script>
  import YouLikeItem from "./YouLikeItem";
  export default {
    name: "YouLike",
    props: {
      youLikeData: {
        type: Array,
        default: []
      }
    },
    components: {
      YouLikeItem
    }
  }
</script>

<style lang="less" scoped>
  .container {
    margin-top: 0.625rem;
  }

  .titleWrapper {
    position: relative;
    padding: 0 0.625rem;
    height: 2.1875rem;
    text-align: center; }

  .middleLine {
    padding-top: 1.09375rem;
    border-bottom: solid 1px #D8D8D8;
  }

  .title {
    position: relative;
    display: inline-block;
    top: -1.09375rem;
    padding: 0 1.25rem;
    line-height: 2.1875rem;
    font-size: 1rem;
    background: #F5F5F5;
  }
  .contentWrapper{
    margin-bottom: 3.5rem;
  }
</style>