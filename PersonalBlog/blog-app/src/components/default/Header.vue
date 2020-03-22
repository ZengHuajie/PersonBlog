<template>
  <div class="header-container">
    <div class="title">
      <span
        v-for="item in '个人博客|技术博客'"
      >{{item}}
      </span>
    </div>
    <div class="menu">
      <ul>
        <router-link
          v-for="(item, index) in routerLink"
          :key="index"
          tag="li"
          :to="item.to"
          :class="{active: routeName === routerLink[index].to.split('/')[1]}"
        >{{item.text}}</router-link>
      </ul>
    </div>
    <div class="search-logo">
      <i class="el-icon-search" @click="ctrlSearch"></i>
    </div>
  </div>
</template>

<script>

export default {
  inject: ['reload'],
  name: 'Header',
  props: {
    show: Boolean
  },
  data () {
    return {
      // 菜单
      menu: ['首页', '站点地图', '关于', '留言'],
      routerLink: [
        {to: '/home', text: '首页'},
        {to: '/sitemap', text: '站点地图'},
        {to: '/about', text: '关于'},
        {to: '/message', text: '留言'}
      ],
      // 获取当前路由的名字, 通过路由名字来设置导航条的样式
      routeName: this.$route.name,
    }
  },
  methods: {
    // 搜索框
    ctrlSearch () {
      let flag = !this.show
      this.$emit('change', flag)
    },
  },
  mounted() {
    // 点击首页强制刷新页面
    let home = document.getElementsByTagName('li')[0];
    home.onclick = function () {
      window.location.reload();
    }
  }
}
</script>

<style lang="less">
  @import "../../assets/css/default/header.less";
</style>
