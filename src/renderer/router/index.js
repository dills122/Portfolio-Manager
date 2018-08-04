import Vue from 'vue';
import Router from 'vue-router';
// import firebase from 'firebase'

import Dashboard from '@/components/authenticated-views/Dashboard';
import Login from '@/components/unauthenticated-views/Login';
import NewUser from '@/components/unauthenticated-views/NewUser';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/dash',
    },
    {
      path: '/',
      redirect: '/dash',
    },
    {
      path: '/dash',
      name: 'dash',
      component: Dashboard,
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
  ],
});

// // http://router.vuejs.org/en/advanced/meta.html
// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (!firebase.auth().currentUser) {
//       next({
//         path: '/login',
//         query: {
//           redirect: to.fullPath,
//         },
//       });
//     } else {
//       next();
//     }
//   } else {
//     next();
//   }
// });


export default router;
