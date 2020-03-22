<template>
  <div class="home-main">
    <!--          主区域文章部分-->
    <div class="article-list">
      <div class="article" v-for="(item, index) in articleList" :key=index>
        <div>
<!--          利用动态路由的方式实现文章页面的伪静态-->
          <router-link
            class="article-title"
            tag="li"
            :to="{name: 'detail', params: {detailId: item.link}}"
          >{{item.articleTitle}}</router-link>
<!--          <a class="article-title" :href=item.link>{{item.articleTitle}}</a>-->
        </div>
<!--      后台返回数据库的数据带有html标签, 所以用v-html的方式写入  -->
        <div class="article-content"><div v-html="item.articleContent"></div></div>
        <div class="article-footer">发布于{{item.articleDate}} | 浏览({{item.articleBrowse}}) | Tags：{{item.articleTag}}
        </div>
      </div>
      <!--    分页-->
      <div class="turn-page">
        <ul>
          <li
            ref="pageNum"
            v-for="(item, index) in pageNumList"
            :key="index"
            :class="{now_page: (item.text == page)}"
            @click="jumpTo(item.toPage, item.text)"
          >{{item.text}}</li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'MainContainer',
    data() {
      return {
        // 当前页码
        page: 1,
        text: '',
        // 一页显示多少个
        pageSize: 7,
        // 总页数
        count: '',
        pageNumList: [],
        // 文章部分
        articleList: [],
        isTag: '',
      }
    },
    // 实例挂载好就去发送请求
    created: function() {
      console.log('进入created')
      this.isTag = this.$route.params['tag'];
      this.page = this.$route.params['pageNum'];
      this.queryBlogCountByTags(this.isTag);
      // 刷新之后保留当前页码
      console.log(`当前页码${this.page}`);
    },
    computed: {
      // 点击跳转到相应的页码
      jumpTo: function() {
        return function (page, text) {
          if(text == '<<') {
            this.$router.push({name: 'tags', params:{tag: this.isTag, pageNum: 1}});
          } else if(text == '>>') {
            this.$router.push({name: 'tags', params:{tag: this.isTag, pageNum: Math.ceil(this.count / this.pageSize)}});
          } else {
            this.$router.push({name: 'tags', params:{tag: this.isTag, pageNum: text}});
          }
          sessionStorage.setItem('page', JSON.stringify(page));
          this.page = this.$route.params.pageNum;
          this.queryBlogByTags(this.isTag, page, this.pageSize);
          console.log(`当前页码${this.page}, `)
        }
      },
      // 生成分页
      pageTool: function () {
        // 因为后边函数会修改page, 所以初始化分页工具的时候, page从1开始
        console.log('pageTool里面的count--->', this.count);
        let nowPage = this.page;
        let pageSize = this.pageSize;
        let totalCount = this.count;
        // 用来存放分页插件里的各个部件
        let result = [];
        // 首页 text: 显示的文本 toPage: 它的功能是到达哪一页
        result.push({text: '<<', toPage: 1});
        // 如果当前页码大于2
        if(nowPage > 2) {
          result.push({text: nowPage - 2, toPage: nowPage - 2});
        }
        // 如果当前页码大于1,
        if(nowPage > 1) {
          result.push({text: nowPage - 1, toPage: nowPage - 1});
        }
        // 中间的页数, 点到哪里跳到哪里
        result.push({text: nowPage, toPage: nowPage});
        // 判断是否是最后一页: 当前页码+1 是否小于等于 总页数
        if(nowPage + 1 <= (totalCount + pageSize - 1) / pageSize) {
          result.push({text: nowPage + 1, toPage: nowPage + 1});
        }
        if(nowPage + 2 <= (totalCount + pageSize - 1) / pageSize) {
          result.push({text: nowPage + 2, toPage: nowPage + 2});
        }
        // 尾页按钮
        result.push({text: '>>', toPage: parseInt((totalCount + pageSize - 1) / pageSize)});
        this.pageNumList = result;
        // return result;
      },

      // 根据标签查找博客数量
      queryBlogCountByTags: function () {
        return function (tag) {
          this.$axios.post('/api/queryBlogCountByTags', {
            tag: tag
          })
            .then((res) => {
              this.count = res.data.data[0].count;
              // 刚获取到总数, 立马获取博客
              this.queryBlogByTags(this.isTag, this.page, this.pageSize);
            }).catch((res) => {
            console.log(res);
          })
        }
        
      },
      //根据标签获取博客(页数)
      queryBlogByTags: function() {
        return function (tags, page, pageSize) {
          this.$axios.post('/api/queryBlogByTags', {
            // 数据库查数, 偏移量是从0开始的
            tag: tags,
            page: page - 1,
            pageSize: pageSize
          }).then((res) => {
            let articleArr = res.data.data;
            let list = [];
            for(let i = 0; i < articleArr.length; i ++) {
              let temp = {};
              temp.id = articleArr[i].id;
              temp.articleTitle = articleArr[i].title;
              temp.articleContent = articleArr[i].content;
              temp.articleDate = this.timeUtil.getDate(articleArr[i].ctime);
              temp.articleBrowse = articleArr[i].views;
              temp.articleTag = articleArr[i].tags;
              // 配置静态路由
              temp.link = articleArr[i].id;
              list.push(temp);
            }
            this.articleList = list;
            this.page = page;
          }).catch((res) => {
            console.log(res);
          })
          // 获取到博客的时候, 立马生成分页
          this.pageTool;
        }
      },
    },
    mounted() {
      console.log('this.pageNumList--->', this.pageNumList);
    },
    watch:{
      $route(to,from){
        console.log('路由发生改变');
        console.log('跳转到标签--->', to.path.split('/')[2])
        this.page = this.$route.params['pageNum'];
        this.isTag = to.path.split('/')[2];
        this.queryBlogCountByTags(this.isTag);
      }
    },
  }
</script>

<style lang="less">
  @import "../../assets/css/home/maincontainer.less";
</style>