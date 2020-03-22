<template>
  <div class="aside">
    <!--          卡片-->
    <Card />
    <!--          随机标签-->
    <RandomTag />
    <!--          最近热门-->
    <Hot />
    <!--          最新评论-->
    <Comment />
    <!--          友情链接-->
    <FriendLink />
  </div>
</template>

<script>
import Card from './Card'
import RandomTag from "./RandomTag"
import Hot from "./Hot"
import Comment from "./Comment"
import FriendLink from "./FriendLink";
export default {
  name: 'Aside',
  components: {
    FriendLink,
    Comment,
    Hot,
    RandomTag,
    Card
  }
}
</script>

<style scoped lang="less">
  // 侧边栏
  .aside {
    flex: 1;
    min-width: 200px;
    
  }
</style>
