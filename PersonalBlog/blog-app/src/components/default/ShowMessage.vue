<template>
  <div class="comment-show">
    <span class="blog-comment_msg">留言: 目前有 {{commentArr.length}} 条留言</span>
    <div class="blog-comment" v-for="(item, index) in commentArr">
        <span class="username-content">
          <i class="el-icon-user-solid"></i>
          <b ref="parentName" class="username">{{item['username']}}</b>
          <b class="parentName" v-show="item['parentName']">回复@{{item.parentName}}</b>
          发表于 {{item['ctime']}}
          <a @click="handleReply(index)">回复</a>
        </span>
      <div>{{item['content']}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ShowMessage",
    data() {
      return {
        commentArr: [],
        top: '',
        mark: ''
      }
    },
    created: function() {
      this.queryShowMessage();
      this.$root.$on('getTop', top => {
        this.top = top;
      })
      
    },
    methods: {
      // 点击回复 回复谁, 就把谁的username传过来
      handleReply(i) {
        // 点击回复按钮, 跳到评论框
        document.documentElement.scrollTop = this.top - 100;
        // 拿到用户名, 把当前的parentName改为上面拿到的username, 这时候提交的话, 提交的parentName就是username
        // this.parentName = username || '';
        this.$root.$emit('getParentName', this.$refs.parentName[i].innerText);
        console.log('传过去的parentName', this.$refs.parentName[i].innerText);
        
      },
    },
    computed: {
      queryShowMessage: function () {
        // 判断是关于还是留言页面
        this.mark = this.$route.name == 'about' ? -1 : 1;
        return function () {
          this.$axios.post('/api/queryShowMessage', {
            mark: this.mark
          })
            .then((res) => {
              this.commentArr = [];
              let result = res.data.data;
              for (let i = 0; i < result.length; i++) {
                let temp = {};
                temp['id'] = result[i]['id'];
                temp['mark'] = result[i]['mark'];
                temp['username'] = result[i]['username'];
                temp['content'] = result[i]['content'];
                temp['ctime'] = result[i]['ctime'];
                temp['atime'] = result[i]['atime'];
                temp['email'] = result[i]['email'];
                temp['parentName'] = result[i]['parentName'];
                this.commentArr.push(temp);
              }
            }).catch((res) => {
            console.log('请求失败');
          })
        }
      },
    },
    updated() {
    
    }
  }
</script>

<style lang="less">
  @import "../../assets/css/default/showmessage";
</style>