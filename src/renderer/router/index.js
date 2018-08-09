import Vue from 'vue';
import Router from 'vue-router';
import firebase from 'firebase';

import Dashboard from '@/components/authenticated-views/Dashboard';
import Login from '@/components/unauthenticated-views/Login';
import NewUser from '@/components/unauthenticated-views/NewUser';
import ForgetPass from '@/components/unauthenticated-views/ForgetPassword';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/login',
    },
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/dash',
      name: 'dash',
      component: Dashboard,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/new',
      name: 'new',
      component: NewUser,
    },
    {
      path: '/forget',
      name: 'forget',
      component: ForgetPass,
    },
  ],
});

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


export default router;
