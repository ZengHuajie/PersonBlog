<!-- 站点地图 -->
<template>
  <div class="site-map">
    <h2 class="site-map-title">刘阿大个人博客's SiteMap</h2>
    <el-page-header title="返回上一页" @back="goBack" content="站点地图">
    </el-page-header>
    <div class="site-box">
      <p class="site-title">最新文章</p>
      <router-link
        class="link-title"
        v-for="(item, index) in site"
        :key="index"
        tag="li"
        :to="{name: 'detail', params: {detailId: item['link']}}"
      >
        <a>{{item['title']}}</a>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SiteMap',
  data() {
    return {
      site: []
    }
  },
  methods: {
    goBack() {
      // 返回之前路由
      this.$router.go(-1);
    }
  },
  created() {
    this.queryAlltBlog();
  },
  computed: {
    queryAlltBlog: function () {
      return function () {
        this.$axios.post('/api/queryAllBlog')
          .then((res) => {
            console.log(res.data.data);
            let result = res.data.data;
            for(let i = 0; i < result.length; i ++) {
              let temp = {};
              temp['49'] = result[i]['id'];
              temp['title'] = result[i]['title'];
              temp['tags'] = result[i]['tags'];
              temp['content'] = result[i]['content'];
              temp['ctime'] = result[i]['ctime'];
              temp['utime'] = result[i]['utime'];
              temp['views'] = result[i]['views'];
              temp['link'] = result[i]['id'];
              this.site.push(temp);
            }
          }).catch((res) => {
            console.log('请求失败');
        })
      }
    }
  },
  // 当路由离开的时候监听一下, 在session里设置一个标记, 标记这是从site修改路由跳转的
  beforeRouteLeave(to, from, next) {
    console.log('site的watch')
    sessionStorage.setItem('siteBlogId', JSON.stringify(to.path.slice(8)));
    next();
  },
}
</script>

<style lang="less">
  @import "../../src/assets/css/sitemap/sitemap";
</style>