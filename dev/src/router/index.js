import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import Index from '@/components/Index'

Vue.use(Router)
Vue.use(ElementUI)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path:'/home',
      name:"home",
      compent: Home
    },
    {
      path: '/register',
      name: 'register',
      component: register
    }
  ]
})
