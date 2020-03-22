<template>
<!-- 评论区 -->
  <div ref="commentContainer" class="comment-container">
    <el-tag type="info" color="#fff">发表评论</el-tag>
    <input class="nickname" v-model="nickname" placeholder="昵称">
    <input class="useremail" v-model="useremail" placeholder="邮箱">
    <el-input
      class="usertext"
      type="textarea"
      :rows="10"
      placeholder="请输入内容"
      v-model="textarea">
    </el-input>
<!--          验证码-->
    <div class="verification">
      <input class="vtext" v-model="vtext" placeholder="验证码">
      <span class="vcode" v-html="vcode" @click="changeVcode()"></span>
      <span class="tips" v-show="flag">验证码输入错误</span>
    </div>
    <el-button class="commentbtn" type="warning" @click="handleComment(parentName)">发表</el-button>
    <el-button class="empty" type="danger" @click="empty">清空</el-button>
  </div>
</template>

<script>
  export default {
    name: "WriteComment",
    data() {
      return {
        nickname: '',
        useremail: '',
        textarea: '',
        parentName: '',
        vtext: '',
        vcode: '',
        // 存放正确的验证码
        verification: '',
        flag: false,
        commentContainerTop: ''
      }
    },
    methods: {
      // 发表评论
      handleComment() {
        console.log('进入发表评论的parentName--->', this.parentName);
        if(this.vtext == this.verification) {
          this.$axios.post('/api/insertShowMessage', {
            // 判断是关于页面的插入还是留言页面的插入
            mark: this.$route.name == 'about' ? -1 : 1,
            username: this.nickname,
            content: this.textarea,
            email: this.useremail,
            parentName: this.parentName
          }).then((res) => {
            console.log(res);
            this.$emit('QueryShowMessage');
            // 每次发表完评论, 都要重置一下parentName, 不然都是获取到上一次的parentName
            this.parentName = '';
            // 发表成功重新获取验证码
            this.changeVcode();
          }).catch((res) => {
            console.log('请求失败');
          })
          this.flag = false;
          this.empty();
        } else {
          this.flag = true;
        }
      
      },
      // 清空
      empty() {
        this.nickname = '';
        this.useremail = '';
        this.textarea = '';
        this.vtext = '';
      }
    },
    created() {
      // 获取兄弟组件穿过来的parentName
      this.$root.$on('getParentName', parentName => {
        this.parentName = parentName;
        console.log('h获取过来的parentName', this.parentName)
      })
      // 获取验证码
      this.changeVcode();
    },
    mounted() {
    
    },
    computed: {
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
    },
    updated: function () {
      // 每次在组件渲染完成后, 把当前评论框的高度传给兄弟组件
      this.commentContainerTop = this.$refs.commentContainer.offsetTop;
      this.$root.$emit('getTop', this.commentContainerTop);
      console.log('updated里评论高度--->', this.$refs.commentContainer.offsetTop)
    }
  }
</script>

<style lang="less">
  @import "../../assets/css/default/writecomment";
</style>