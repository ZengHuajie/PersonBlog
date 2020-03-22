<template>
  <div class="footer-container">
    <ul>
      <li v-for="(item, index) in listArr" :key="index">
        <a :href=item.link>{{item.title}}</a>
      </li>
    </ul>
    <p class="copyright">Copyright © 2020 李慢慢个人博客 </p>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      listArr: [
        {title: 'c', link: '/'},
        {title: 'c++', link: '/'},
        {title: 'python', link: '/'},
        {title: 'java', link: '/'},
        {title: 'mysql', link: '/'},
        {title: 'html', link: '/'},
        {title: 'javascript', link: '/'},
        {title: 'ios', link: '/'},
        {title: 'php', link: '/'},
        {title: 'sqlserver', link: '/'},
        {title: 'c#', link: '/'},
        {title: 'nodejs', link: '/'}
      ]
    }
  }
}
</script>

<style lang="less">
  @import "../../assets/css/default/footer.less";
</style>