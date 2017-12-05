import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/Login'
import Register from '@/components/Register'
import Dashboard from '@/components/Personal/Dashboard'
import ShowPrivate from '@/components/Personal/ShowPrivate'
import ShowPublic from '@/components/Personal/ShowPublic'
import ShowPDF from '@/components/Personal/ShowPDF'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path:'/register',
      name:'Register',
      component: Register
    },
    {
      path:'/showpdf',
      name:'ShowPDF',
      component: ShowPDF
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      children: [
        {
          path: '/public',
          name: 'PublicPDF',
          component: ShowPublic
        },
        {
          path: '/private',
          name: 'PrivatePDF',
          component: ShowPrivate
        }
      ]
    }
  ]
})
