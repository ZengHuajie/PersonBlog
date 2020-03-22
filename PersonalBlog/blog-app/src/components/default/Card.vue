<template>
  <div class="card-box">
    <h2>{{card['title']}}</h2>
    <p
      v-for="item in card['info']"
      :key="item.value"
    >{{item.text}}</p>
    <ul>
      <li v-for="item in card['icon']">
        <a :href="item.href" :title="item.title"></a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Card',
  data () {
    return {
      card: {
        title: '刘阿大的名片',
        info: [
          {value: 'job', text: '职业: web前端工程师'},
          {value: 'address', text: '现居: 广东省-深圳市'},
          {value: 'phone', text: '电话: xxxxxxxxx'},
          {value: 'email', text: 'Email: aaaaaaaaa'}
        ],
        // 名片图标
        icon: [
          {href: '#', title: '李慢慢'},
          {href: '#', title: '我的邮箱'},
          {href: '#', title: 'QQ联系我'},
          {href: '#', title: '关注我的微信'}
        ]
      }
    }
  }
}
</script>

<style lang="less">
  @import "../../assets/css/default/card.less";
</style>