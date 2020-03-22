<template>
  <el-container>
    <!--    头部-->
    <el-header>
      <Header :show="show_search_box" @change="handleChange" />
    </el-header>
    <!--    搜索区-->
    <el-main class="el-main-search" v-show="show_search_box">
      <Search :show="show_search_box" @change="handleChange" />
    </el-main>
    <!--    主区域-->
    <el-main class="el-main-container">
      <!--      文章-->
      <MainContainer />
      <!--      侧边栏-->
      <Aside />
    </el-main>
    <!--    页脚-->
    <el-footer>
      <Footer />
    </el-footer>
  </el-container>
</template>



<script>
  export default {
    name: 'Message'
  }
</script>

<script>
  import Header from '@/components/default/Header'
  import Search from '@/components/default/Search'
  import Footer from "../components/default/Footer";
  import MainContainer from "../components/message/MainContainer";
  import Aside from "../components/default/Aside";

  export default {
    name: 'Message',
    data() {
      return {
        show_search_box: false
      }
    },
    methods: {
      handleChange(flag) {
        this.show_search_box = flag
      }
    },
    components: {
      Header,
      Search,
      Footer,
      MainContainer,
      Aside
    },

  }
</script>
<style lang="less" src="../assets/css/home/home.less"></style>

