<template>
  <!--        搜索框-->
  <div class="search-box">
    <div class="search-bar">
      <div class="search-container">
        <el-input class="search-input" v-model="search_input" placeholder="请输入内容"></el-input>
        <el-button class="search-btn" type="primary" icon="el-icon-search">搜索</el-button>
      </div>
    </div>
    <!--          关闭按钮-->
    <div class="search-close">
      <i class="el-icon-close" @click="handleClose"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Search',
  props: {
    show: Boolean
  },
  data () {
    return {
      search_input: ''
    }
  },
  methods: {
    handleClose () {
      let flag = !this.show
      this.$emit('change', flag)
    }
  }

}
</script>

<style lang="less">
  @import "../../assets/css/default/search.less";
</style>
