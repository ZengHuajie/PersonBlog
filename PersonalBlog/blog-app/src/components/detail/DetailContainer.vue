<template>
  <div class="detail-container">
    <!--          主区域文章部分-->
    <div class="blog-container">
      <div class="blog-position">
        <el-page-header title="返回首页" @back="goBack" content="文章正文"></el-page-header>
      </div>
<!--      标题-->
      <div class="blog-title">
        <h2>{{this.blog['title']}}</h2>
        <span class="tags">分类: {{this.blog['tags']}}</span>
      </div>
<!--      信息-->
      <p class="info">
        作者: 李慢慢
        发布于: <span class="time">{{this.blog['time']}}</span>
        浏览: <span class="views">{{this.blog['views']}}</span>
        评论: <span class="comment">{{this.blog['comment']}}</span>
      </p>
      <hr>
      <div class="blog-text" v-html="this.blog['text']"></div>
    </div>
<!--    选择博客文章-->
    <div class="select-blog">
      <el-button class="prev" :disabled="blog['id'] === firstBlogId" @click="handlePrev" type="success" round>上一篇</el-button>
      <el-button class="next" :disabled="blog['id'] === lastBlogId" @click="handleNext" type="success" round>下一篇</el-button>
    </div>
<!--    展示评论区域-->
    <div class="comment-show">
      <span class="blog-comment_msg">留言: 目前有 {{commentArr.length}} 条留言</span>
      <div class="blog-comment" v-for="item in commentArr">
        <span class="username-content">
          <i class="el-icon-user-solid"></i>
          <b class="username">{{item['username']}}</b>
          <b class="parentName" v-show="item['parentName']">回复@{{item.parentName}}</b>
          发表于 {{item['ctime']}}
          <a @click="handleReply(item['username'])">回复</a>
        </span>
          <div>{{item['content']}}</div>
      </div>
    </div>
<!--   评论区域 -->
    <div ref="commentContainer" class="comment-container">
      <el-tag type="info" color="#fff">发表评论</el-tag>
      <input class="nickname" v-model="nickname" placeholder="昵称">
      <input class="useremail" v-model="useremail" placeholder="邮箱">
      <el-input
        class="usertext"
        type="textarea"
        :rows="10"
        :parent="parent"
        placeholder="请输入内容"
        v-model="textarea">
      </el-input>
<!--      验证码-->
      <div class="verification">
        <input class="vtext" v-model="vtext" placeholder="验证码">
        <span class="vcode" v-html="vcode" @click="changeVcode()"></span>
        <span class="tips" v-show="flag">验证码输入错误</span>
      </div>
      <el-button class="commentbtn" type="warning" @click="handleComment(parentName)">发表</el-button>
      <el-button class="empty" type="danger" @click="empty">清空</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    // 注入更新依赖 this.reload() 直接使用刷新
    inject: ['reload'],
    name: 'MainContainer',
    data() {
      return {
        blog: {
          id: '',
          title: '',
          tags: '',
          time: '',
          views: '',
          comment: '0',
          text: ''
        },
        // 记录第一条和最后一条, 如果当前的博客等于这两个, 就禁止点击
        firstBlogId: '',
        lastBlogId: '',
        nickname: '',
        useremail: '',
        textarea: '',
        vtext: '',
        vcode: '',
        // 存放正确的验证码
        verification: '',
        flag: false,
        // -1表示没有父级, 则为评论, 否则为回复
        parent: '-1',
        parentName: '',
        commentArr: [],
      }
    },
    methods: {
      goBack() {
        this.$router.push('/home');
      },
      // 上一篇
      handlePrev() {
        let currentDetailId = this.blog['id'];
        this.$axios.post('/api/queryPrevBlogById', {
          detailId: currentDetailId
        }).then((res) => {
          let temp = {};
          let result = res.data.data[0]
          temp.id = result['id'];
          temp.title = result['title'];
          temp.tags = result['title'];
          temp.time = this.timeUtil.getDate(result['ctime']);
          temp.views = result['views'];
          temp.title = result['title'];
          temp.text = result['content'];
          this.blog = temp;
          // 页面刷新, 将数据保存到sessionStorage中
          this.saveTosessionStorage;
          // 每点一篇文章就要获取一下评论
          this.queryCommentByBlogId;
          console.log('当前路由id--->', this.blog['id']);
        }).catch((res) => {
          // 如果失败 在created里会根据存在本地的数据去渲染
          console.log('请求失败')
          // 查找第一条博客
          this.queryFirstBlog;
        })
      },
      // 下一篇
      handleNext() {
        let currentDetailId = this.blog['id'];
        this.$axios.post('/api/queryNextBlogById', {
          detailId: currentDetailId
        }).then((res) => {
          let temp = {};
          let result = res.data.data[0]
          temp.id = result['id'];
          temp.title = result['title'];
          temp.tags = result['title'];
          temp.time = this.timeUtil.getDate(result['ctime']);
          temp.views = result['views'];
          temp.title = result['title'];
          temp.text = result['content'];
          this.blog = temp;
          // 页面刷新, 将数据保存到sessionStorage中
         this.saveTosessionStorage;
          // 每点一篇文章就要获取一下评论
          this.queryCommentByBlogId;
          console.log('当前路由id--->', this.blog['id']);
        }).catch((res) => {
          // 如果失败 在created里会根据存在本地的数据去渲染
          console.log('请求失败')
          // 查找最后一条博客
          this.queryLastBlog;
        })
      },
      // 清空
      empty() {
        this.nickname = '';
        this.useremail = '';
        this.textarea = '';
        this.vtext = '';
      },
      // 发表评论
      handleComment(fatherName) {
        console.log('发表前的parentName-->', this.parentName);
        if (this.verification === this.vtext) {
          this.$axios.post('/api/insertComment', {
            blog_id: this.blog['id'],
            parent: this.parent,
            parentName: fatherName,
            nickname: this.nickname,
            content: this.textarea,
            email: this.useremail
          }).then((res) => {
            console.log('点击发表评论返回的信息:', res);
            this.reload();
          }).catch((res) => {
            console.log('请求失败');
          })
          this.flag = false;
          this.empty();
        } else {
          this.flag = true;
        }
      },
      // 点击回复 回复谁, 就把谁的username传过来
      handleReply(username) {
        // 点击回复按钮, 跳到评论框
        document.documentElement.scrollTop = this.$refs.commentContainer.offsetTop - 100;
        // 拿到用户名, 把当前的parentName改为上面拿到的username, 这时候提交的话, 提交的parentName就是username
        this.parentName = username || '';
      },
    },
    // 实例挂载好就去发送请求
    created: function () {
      console.log('进入created')
      // 根据id获取博客
      this.getBlogById;
      // 获取验证码
      this.changeVcode();
    },
    computed: {
      // 将当前博客信息保存到sessionStorage, 并把保存在里面的渲染出来
      saveTosessionStorage: function () {
        // 页面刷新, 将数据保存到sessionStorage中
        sessionStorage.setItem('blog', JSON.stringify(this.blog));
        // 点击上一篇, 文章刷新后, 路由的参数也要发生相应变化
        this.$router.push({name: 'detail', params: {detailId: this.blog['id']}})
        // console.log('报存在sessionStorage里的值--->',JSON.parse(sessionStorage.getItem('blog')));
      },
      // 根据id相应id的博客
      getBlogById: function () {
        
        this.$axios.post('/api/queryBlogById', {
          // 先看路由是否存在, 再看是否手动改变了路由, 最后才去看session里保存的值
          detailId: this.$route.path.slice(12) || window.location.href.slice(32) || this.blog['id'] || JSON.parse(sessionStorage.getItem('siteBlogId')) || JSON.parse(sessionStorage.getItem('blog'))['id']
        }).then((res) => {
          // sessionStorage.setItem('siteBlogId', JSON.stringify(''));
          // console.log('getBlogById里的then里--->', JSON.parse(sessionStorage.getItem('siteBlogId')))
          let temp = {};
          let result = res.data.data[0]
          temp.id = result['id'];
          temp.title = result['title'];
          temp.tags = result['title'];
          temp.time = this.timeUtil.getDate(result['ctime']);
          temp.views = result['views'];
          temp.title = result['title'];
          temp.text = result['content'];
          this.blog = temp;
          // 第一次进入页面的博客信息保存到sessionStorage
          this.saveTosessionStorage;
          // 获取完博客, 获取相应的评论
          this.queryCommentByBlogId;
          console.log(this.$route.path.slice(12))
          // console.log('当前博客信息--->',this.blog);
        }).catch((res) => {
          console.log('请求失败');
        })
      },
      // 查找第一条博客
      queryFirstBlog: function () {
        this.$axios.post('/api/queryFirstBlog')
          .then((res) => {
            let result = res.data.data[0]
            this.firstBlogId = result['id'];
          }).catch((res) => {
          console.log('请求失败')
        })
      },
      // 查找最后一条博客
      queryLastBlog: function () {
        this.$axios.post('/api/queryLastBlog')
          .then((res) => {
            let result = res.data.data[0]
            this.lastBlogId = result['id'];
          }).catch((res) => {
          console.log('请求失败')
        })
      },
      // 获取验证码
      changeVcode: function () {
        return function () {
          this.flag = false;
          this.vtext = '';
          this.$axios.post('/api/queryRandomCode')
            .then((res) => {
              let result = res.data.data;
              this.vcode = result['data'];
              this.verification = result['text'];
              console.log('当前验证码--->', this.verification);
            }).catch((res) => {
            console.log('请求失败');
          })
        }
      },
      // 根据博客id查找相应的评论
      queryCommentByBlogId: function () {
        // 防止刷新后获取不到当前博客的id, 去sessionStorage里取一下
        this.blog = JSON.parse(sessionStorage.getItem('blog'));
        console.log('进入获取评论得到的当前博客的id--->', this.blog['id']);
        this.$axios.post('/api/queryCommentByBlogId', {
          blog_id: this.blog['id']
        })
          .then((res) => {
            // 每次要把上一次的置空
            this.commentArr = [];
            let result = res.data.data
            for(let i = 0; i < result.length; i ++) {
              let temp = {};
              temp['id'] = result[i]['id'];
              temp['blog_id'] = result[i]['blog_id'];
              temp['parent'] = result[i]['parent'];
              temp['parentName'] = result[i]['parentName'];
              temp['content'] = result[i]['content'];
              temp['ctime'] = this.timeUtil.getDate(result[i]['ctime']);
              temp['atime'] = result[i]['atime'];
              temp['email'] = result[i]['email'];
              temp['username'] = result[i]['username'];
              this.commentArr.push(temp);
            }
          }).catch((res) => {
          console.log('根据博客id查找相应的评论失败');
        })
      },
    },
    watch: {
      // 监听路由, 如果手动改变了路由的话, 改变id
      $route(to,from){
        console.log('从哪里来-->', from.path);
        this.blog['id'] = to.path.slice(8);
        this.getBlogById;
      }
    },
  }
</script>

<style lang="less">
  @import "../../assets/css/detail/detailcontainer";
</style>