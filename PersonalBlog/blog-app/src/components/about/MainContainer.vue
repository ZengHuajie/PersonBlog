<template>
  <div class="about-main">

<!--      自我简介-->
    <Article />
<!--      展示评论区域-->
    <ShowMessage ref="showMessage" />
<!--    评论区域-->
    <WriteComment @QueryShowMessage="childFnQueryShowMessage" />
  </div>
  
</template>

<script>
  import Vue from 'vue';
  import Article from "./Article";
  import ShowMessage from "../default/ShowMessage";
  import WriteComment from "../default/WriteComment";

  export default {
    name: 'MainContainer',
    data() {
      return {
        Hub: new Vue({})
      }
    },
    components: {
      Article,
      ShowMessage,
      WriteComment,
    },
    methods: {
      childFnQueryShowMessage() {
        this.$refs.showMessage.queryShowMessage();
      }
    }

  }
</script>

<style scoped lang="less" src="../../assets/css/about/maincontainer.less">

</style>
