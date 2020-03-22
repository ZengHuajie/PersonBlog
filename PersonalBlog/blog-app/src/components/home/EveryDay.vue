<template>
  <article class="everyday-box">
    <div class="everyday">
      <span>{{title}}</span>
      <router-link tag="li" to="/everydayedit"><i class="el-icon-edit"></i></router-link>
      <div ref="content">{{content}}</div>
    </div>
  </article>
</template>

<script>
  export default {
    name: 'EveryDay',
    data() {
      return {
        title: '每日一句',
        content: '名人名言'
      }
    },
    // 创建好之后就用ajax请求后台数据给content赋值
    created: function () {
      this.$axios.post('/api/queryEveryday')
        .then((res) => {
          // 返回的内容具体在res.data.data[0].content里面
          this.$refs.content.innerHTML = res.data.data[0].content;
        }).catch((res) => {
        console.log('请求失败');
      })
    },
    // 挂载后就去赋值
    computed: {
      getContent: () => {
        return this.content;
      },
    },
  }
</script>

<style scoped lang="less" src="../../assets/css/home/everyday.less">

</style>
