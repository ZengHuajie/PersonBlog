<template>
  <div class="home-main">
    <!--          主区域头部-->
    <div class="main-header">
      <!--            轮播图-->
      <div class="header-left">
        <el-carousel indicator-position="outside" height="332px">
          <el-carousel-item class="banner" v-for="item in carousel_url" :key="item">
            <img :src="item" />
          </el-carousel-item>
        </el-carousel>
      </div>
      <!--            右侧图片-->
      <div class="header-right">
        <ul>
          <li
            v-for="item in img_url" :key="item.url"
          >
            <img :src="item.url" :alt="item.text" :title="item.text">
            <p>{{item.text}}</p>
          </li>
        </ul>
      </div>
    </div>
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
        // 轮播图
        carousel_url: ['https://www.yangqq.com/d/file/p/2019-03-04/296f82e95dd5026b6cdfacd197ae5062.png', 'https://www.yangqq.com/d/file/p/2018-11-25/255e1af5900282a8b6d75dd6d49835f7.jpg'],
        // 右侧图片
        img_url: [
          {
            url: 'https://www.yangqq.com/d/file/news/life/2018-11-11/706322d7b93c7a5fbb8ec43001aa32d7.jpg',
            text: '个人博客, 属于我的小世界!'
          },
          {
            url: 'https://www.yangqq.com/d/file/jstt/bj/2018-06-29/3f0b6da48a6fd4e626a021ff7bd0d74f.jpg',
            text: '【匆匆那些年】总结个人博客经历的这四年…'
          }
        ],
        // 文章部分
        articleList: [],
      }
    },
    // 实例挂载好就去发送请求
    created: function() {
      this.watchRouter;
      this.getBlogCount;
    },
    computed: {
      // 点击跳转到相应的页码
      jumpTo: function() {
        return function (page, text) {
          if(text == '<<') {
            this.$router.push({name: 'home', params:{pageNum: 1}});
          } else if(text == '>>') {
            this.$router.push({name: 'home', params:{pageNum: Math.ceil(this.count / this.pageSize)}});
          } else {
            this.$router.push({name: 'home', params:{pageNum: text}});
          }
          sessionStorage.setItem('page', JSON.stringify(page));
          this.page = this.$route.params.pageNum;
          this.getPage(page, this.pageSize);
          console.log(`当前页码${this.page}, `)
        }
      },
      // 获取博客总数
      getBlogCount: function () {
        this.$axios.post('/api/queryBlogCount')
          .then((res) => {
            this.count = res.data.data[0].count;
            // 第一次获取到总数的时候保存起来
            sessionStorage.setItem('count', JSON.stringify(this.count));
            // 刚获取到总数, 立马获取博客
            this.getPage(this.page, this.pageSize);
          }).catch((res) => {
          console.log(res);
        })
      },
      // 发送请求, 请求博客(根据页数)
      getPage: function()   {
        return function (page, pageSize) {
          this.$axios.post('/api/queryBlogByPage', {
            // 数据库查数, 偏移量是从0开始的
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
      // 生成分页
      pageTool: function () {
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
        return result;
      },
      
      watchRouter() {
        // 进入页面, 页码重置为1
        if(!this.$route.params.pageNum) {
          sessionStorage.setItem('page', JSON.stringify(1));
          this.page = 1;
          // this.pageTool;
        } else {
          // 否则, 该是哪个就设置为哪个
          sessionStorage.setItem('page', JSON.stringify(this.$route.params.pageNum));
          this.page = this.$route.params.pageNum;
          this.pageTool;
        }
      },
    },
  }
</script>

<style lang="less">
  @import "../../assets/css/home/maincontainer.less";
</style>