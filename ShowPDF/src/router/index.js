import Vue from 'vue'
import Router from 'vue-router'
import Showpdf from '@/components/ShowPDF'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'showpdf',
      component: Showpdf
    }
  ]
})
