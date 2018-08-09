import 'flexboxgrid/css/flexboxgrid.min.css';
import 'N3-components/dist/index.min.css';
import Vue from 'vue';
import axios from 'axios';
import watchlistDb from './datastore/watchlist';
import portfolioDb from './datastore/portfolio';
import N3Components from 'N3-components';
import 'N3-components/dist/index.min.css';
import numerial from 'numeral';
import ScrollBar from 'vue2-scrollbar';
import firebase from 'firebase';
import config from './firebaseConfig';
import 'vue2-scrollbar/dist/style/vue2-scrollbar.css';

import App from './App';
import router from './router';

// install N3
Vue.use(N3Components);
Vue.use(ScrollBar);

// for English  (default chinese)
// version 2.2.0 or later
Vue.use(N3Components, 'en');


if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

firebase.initializeApp(config);

Vue.prototype.$watchList = watchlistDb;
Vue.prototype.$portfolio = portfolioDb;

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  template: '<App/>',
}).$mount('#app');
