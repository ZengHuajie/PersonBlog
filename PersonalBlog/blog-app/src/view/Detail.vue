<!-- 首页 -->
<template>
  <el-container>
    <!--    头部-->
    <el-header>
      <Header :show="show_search_box" @change="handleChange"/>
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
  import Header from '@/components/default/Header'
  import Search from '@/components/default/Search'
  import EveryDay from '../components/home/EveryDay'
  import Footer from '../components/default/Footer'
  import MainContainer from '../components/detail/DetailContainer'
  import Aside from '../components/default/Aside'
  export default {
    name: 'Detail',
    data () {
      return {
        show_search_box: false
      }
    },
    methods: {
      handleChange (flag) {
        this.show_search_box = flag
      }
    },
    components: {
      Header,
      Search,
      EveryDay,
      Footer,
      MainContainer,
      Aside
    },
    beforeRouteLeave(to, from, next) {
      window.document.body.style.backgroundColor = '';
      next();
    }
  }
</script>

<style lang="less">
  @import "../assets/css/detail/detail";
</style>