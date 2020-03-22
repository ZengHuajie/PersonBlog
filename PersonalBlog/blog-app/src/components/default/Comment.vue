<template>
  <div class="comment">
    <div class="comment-title">最新评论</div>
    <ul v-for="(item, index) in comment" :key="index">
      <li>
        <div class="comment-top">
          <span class="commenter">{{item['username']}}</span>
          <span class="commentTime">[{{item['ctime']}}]</span>
        </div>
        <div class="comment-bottom">
          <a href="/">{{item['content']}}</a>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "Comment",
    data() {
      return {
        comment: []
      }
    },
    created() {
      this.queryNewComment;
    },
    computed: {
      queryNewComment: function () {
        this.$axios.post('/api/queryNewComment')
          .then((res) => {
            let result = res.data.data;
            for(let i = 0; i < result.length; i ++) {
              let temp = {};
              temp['id'] = result[i]['id'];
              temp['blog_id'] = result[i]['blog_id'];
              temp['parentName'] = result[i]['parentName'];
              temp['username'] = result[i]['username'];
              temp['content'] = result[i]['content'];
              temp['email'] = result[i]['email'];
              temp['ctime'] = this.timeUtil.getTimeStamp(result[i]['ctime']);
              temp['atime'] = result[i]['atime'];
              this.comment.push(temp);
            }
            // console.log(result);
          }).catch((res) => {
            console.log('请求失败');
        })
      }
    }
  }
</script>

<style lang="less" src="../../assets/css/default/comment.less"></style>