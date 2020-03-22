import Vue from 'vue'
import Router from 'vue-router'
import Home from '../view/Home'
import SiteMap from '../view/SiteMap'
import About from '../view/About'
import Message from '../view/Message'
import BlogEdit from "../view/BlogEdit";
import EverydayEdit from "../view/EverydayEdit";
import Detail from "../view/Detail";
import Tags from "../view/Tags";

Vue.use(Router)

export default new Router({
  routes: [
    {
      // 下面的所有路径都匹配不到的时候, 才会进入*, 然后进入redirect
      path: '*',
      // to --> 当前路径的对象
      redirect (to) {
        if (to.path === '/') {
          // window.console.log(to)
          return '/home'
        } else {
          // 输入有误时
          return '/error'
        }
      }
    },
    {
      path: '/home/:pageNum?',
      name: 'home',
      component: Home
    },
    {
      path: '/sitemap',
      name: 'sitemap',
      component: SiteMap
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/message',
      name: 'message',
      component: Message
    },
    {
      path: '/blogedit',
      name: 'blogedit',
      component: BlogEdit
    },
    {
      path: '/everydayedit',
      name: 'everydayedit',
      component: EverydayEdit
    },
    {
      path: '/detail/:detailId',
      name: 'detail',
      component: Detail
    },
    {
      path: '/tags/:tag?/:pageNum?',
      name: 'tags',
      component: Tags
    }

  ],
  mode: 'hash'
})
