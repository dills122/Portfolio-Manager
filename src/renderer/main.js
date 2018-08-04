import 'propellerkit-custom-scrollbar/css/pmd-scrollbar.css';
import 'flexboxgrid/css/flexboxgrid.min.css';
import 'N3-components/dist/index.min.css';
import Vue from 'vue';
import axios from 'axios';
import watchlistDb from './datastore/watchlist';
import portfolioDb from './datastore/portfolio';
import N3Components from 'N3-components';
import 'N3-components/dist/index.min.css';

import App from './App';
import router from './router';

// install N3
Vue.use(N3Components);

// for English  (default chinese)
// version 2.2.0 or later
Vue.use(N3Components, 'en');


if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;


Vue.prototype.$watchList = watchlistDb;
Vue.prototype.$portfolio = portfolioDb;

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  template: '<App/>',
}).$mount('#app');
