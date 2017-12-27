import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/Login'
import Register from '@/components/Register'
import Layout from '@/components/Personal/Layout'
import ShowPrivate from '@/components/Personal/ShowPrivate'
import ShowPublic from '@/components/Personal/ShowPublic'
import ShowPDF from '@/components/Personal/ShowPDF'
import AddPaper from '@/components/Personal/AddPaper'
import MyPaper1 from '@/components/Personal/MyPaper1'
import MyPaper2 from '@/components/Personal/MyPaper2'
import MyPaper3 from '@/components/Personal/MyPaper3'
import EditPaper from '@/components/Personal/EditPaper'

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
      path: '/layout',
      name: 'Layout',
      component: Layout,
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
        },
        {
          path: '/addpaper',
          name: 'AddPaper',
          component: AddPaper
        },
        {
          path:'/mypaper_init',
          name:'MyPaper1',
          component: MyPaper1
        },
        {
          path:'/mypaper_commit',
          name:'MyPaper2',
          component: MyPaper2
        },
        {
          path:'/mypaper_final',
          name:'MyPaper3',
          component: MyPaper3
        },
        {
          path:'/edit',
          name:'EditPaper',
          component: EditPaper
        }
      ]
    }
  ]
})
