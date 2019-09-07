<template>
  <div id="container" class="container">
    <div class="itemWrapper" v-for="(item, index) in navData" :key="item.cid">
      <div class="imageWrapper">
        <img class="image" :src="item.icon_url" :alt="item.name">
      </div>
      <div class="titleWrapper">
        <span class="title">{{item.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Nav",
    props: {
      navData: {
        type: Array,
        default: []
      }
    }
  }
</script>

<style lang="less" scoped>
.container{
  padding-top: 0.9375rem;
  background: #FFF;
  padding-bottom: 0.9375rem;
  .itemWrapper {
    display: inline-block;
    padding-top: 0.3125rem;
    width: 20%;
    .imageWrapper {
      padding-bottom: 58.823%;
      height: 0;
      overflow: hidden;
      text-align: center;
    }
    .image {
      width: 58.823%;
      height: auto;
      display: inline-block;
    }
    .titleWrapper {
      padding: 0.4375rem 0.3125rem 0.375rem 0.3125rem; }
    .title {
      font-size: 0.70rem;
      color: #555555;
      text-align: center;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
</style>