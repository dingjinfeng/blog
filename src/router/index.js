import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/essay/EssayList')
  },
  {
    path: '/essay',
    component: () => import('@/views/essay/EssayIndex'),
    children: [
      {
        path: 'detail',
        component: () => import('@/views/essay/EssayDetail')
      }
    ]
  },
  {
    path: '/logincenter',
    component: () => import('@/views/loginCenter/LoginServe'),
    children: [
      {
        path: 'register',
        component: () => import('@/views/loginCenter/Register')
      },
      {
        path: 'login',
        component: () => import('@/views/loginCenter/Login')
      }
    ]
  },
  {
    path: '/user',
    component: () => import('@/views/user/UserServe'),
    children: [
      {
        path: 'userinfo',
        component: () => import('@/views/user/UserInfo')
      },
      {
        path: 'addessay',
        component: () => import('@/views/user/AddEssay')
      },
      {
        path: 'blogmanagement',
        component: () => import('@/views/essay/EssayList')
      },
      {
        path: 'catemanagement',
        component: () => import('@/views/user/CateManagement')
      },
      {
        path: 'editessay',
        component: () => import('@/views/user/AddEssay')
      }
    ]
  },
  {
    path: '/otheruser',
    component: () => import('@/views/other/OtherServe'),
    children: [
      {
        path: 'essaylist',
        component: () => import('@/views/essay/EssayList')
      },
      {
        path: 'essaydetail',
        component: () => import('@/views/essay/EssayDetail')
      }
    ]
  },
  {
    path: '/social',
    component: () => import('@/views/social/SocialServe'),
    children: [
      {
        path: 'comment',
        component: () => import('@/views/social/Comment')
      },
      {
        path: 'reply',
        component: () => import('@/views/social/Reply')
      },
      {
        path: 'attention',
        component: () => import('@/views/social/Attention')
      },
      {
        path: 'fan',
        component: () => import('@/views/social/Fan')
      },
      {
        path: 'letter',
        component: () => import('@/views/social/Letter')
      }
    ]
  },
  {
    path: '/*',
    component: () => import('@/views/error/404')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
