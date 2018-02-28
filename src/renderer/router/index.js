import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

import Dashboard from '@/components/back/Dashboard'
import Login from '@/components/front/Login'
import Forgot from '@/components/front/Forgot'
import NewUser from '@/components/front/NewUser'

Vue.use(Router)

var router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/forgot',
      name: 'forgot-pass',
      component: Forgot
    },
    {
      path: '/newuser',
      name: 'new-user',
      component: NewUser
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

// http://router.vuejs.org/en/advanced/meta.html
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!firebase.auth().currentUser) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath,
        },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});


export default router