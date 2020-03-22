<template>
  <div id="app">
    <router-view v-if="isRouterAlive"/>
  </div>
</template>

<!--解决不刷新页面的方式更新页面数据-->

<script>
export default {
  name: 'App',
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isRouterAlive: true,
    }
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      })
    }
  },
}
</script>

<style>

</style>
