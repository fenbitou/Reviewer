import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/Login'
import Register from '@/components/Register'
import Layout from '@/components/Personal/Layout'
import ShowPrivate from '@/components/Personal/ShowPrivate'
import ShowPublic from '@/components/Personal/ShowPublic'
import ShowPDF from '@/components/Personal/ShowPDF'
import AddPaper from '@/components/Personal/AddPaper'

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
      path: '/public',
      component: Layout,
      children: [{
        path: '/',
        component: ShowPublic
      }]
    },
    {
      path: '/private',
      component: Layout,
      children: [{
        path: '/',
        component: ShowPrivate
      }]
    },
    {
      path: '/addpaper',
      component: Layout,
      children: [{
        path: '/',
        component: AddPaper
      }]
    }
  ]
})
