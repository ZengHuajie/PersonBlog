<template>
  <div class="tag">
    <div class="tag-title">{{tagtitle}}</div>
    <router-link class="tag-link"
      v-for="(item, index) in tagLink" :key="index"
      :style="{color: randomColor(), fontSize: randomSize()}"
      @click="getTag(item)"
      tag="a"
      :to="{name: 'tags', params: {tag: item.split(',')[0], pageNum: 1}}"
    >{{item.split(',')[0]}}
    </router-link>
  </div>
</template>

<script>
  export default {
    name: "RandomTag",
    
    data() {
      return {
        tagtitle: '随机标签云',
        tagLink: []
      }
    },
    created() {
      this.queryAllTags;
    },
    methods: {
      getTag(tag) {
        // 传递给兄弟组件
        let isTag = tag.split(',')[0];
        sessionStorage.setItem('isTag', JSON.stringify(isTag));
        this.$root.$emit('tags', isTag);
        this.$router.push({name: 'home', params: {tag: isTag}});
      }
    },
    computed: {
      // 随机颜色
      randomColor() {
        return () => {
          let red = Math.random() * 255 + 30;
          let green = Math.random() * 255 + 30;
          let blue = Math.random() * 255 + 30;
          return `rgb(${red},${green},${blue})`;
        }
      },
      // 随机文字大小
      randomSize() {
        return () => {
          let size = Math.random() * 20 + 10 + 'px';
          return size;
        }
      },
      queryAllTags: function() {
        this.$axios.post('/api/queryAllTags')
          .then((res) => {
            let result = res.data.data
            let arr = [];
            for(let i = 0; i < result.length; i ++) {
              arr.push(result[i]['tags']);
            }
            // 乱序
            arr.sort(() => {
              return Math.random() - 0.5;
            })
            this.tagLink = arr;
          }).catch((res) => {
            console.log('请求失败');
        })
      }
    },
  }
</script>

<style lang="less" src="../../assets/css/default/randomtag.less"></style>