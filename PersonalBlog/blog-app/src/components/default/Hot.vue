<template>
  <div class="hot">
    <div class="hot-title">{{hotTitle}}</div>
    <ul>
      <li v-for="(item, index) in hotLink" :key="index">
        <router-link
          tag="a"
          :to="{name: 'detail', params: {detailId: item.link}}"
        >{{item.articleTitle}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "Hot",
    data() {
      return {
        hotTitle: '最近热门',
        hotLink: []
      }
    },
    created() {
      this.queryHoltBlog;
    },
    computed: {
      queryHoltBlog: function () {
        this.$axios.post('/api/queryHoltBlog')
          .then((res) => {
            let result = res.data.data;
            let list = [];
            for(let i = 0; i < result.length; i ++) {
              let temp = {};
              temp.id = result[i].id;
              temp.articleTitle = result[i].title;
              temp.articleContent = result[i].content;
              temp.articleDate = this.timeUtil.getDate(result[i].ctime);
              temp.articleBrowse = result[i].views;
              temp.articleTag = result[i].tags;
              // 配置静态路由
              temp.link = result[i].id;
              list.push(temp);
            }
            this.hotLink = list;
            
          }).catch((res) => {
            console.log('请求失败');
        })
      }
    }
  }
</script>

<style lang="less" src="../../assets/css/default/hot.less"></style>