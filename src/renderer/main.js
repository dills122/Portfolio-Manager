import Vue from 'vue'
import axios from 'axios'
import firebase from 'firebase'
import db from './datastore'
import portfolio from './portfolioDb'

import App from './App'
import router from './router'
import store from './store'
import config from './components/firebaseConfig'
import N3Components from 'N3-components'
import 'N3-components/dist/index.min.css'

// install N3
Vue.use(N3Components)

// for English  (default chinese)
// version 2.2.0 or later
Vue.use(N3Components, 'en')


if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
	Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false


var app;

firebase.initializeApp(config);

Vue.prototype.$db = db;
Vue.prototype.$pfdb = portfolio;

firebase.auth().onAuthStateChanged(function(user) {
	if (!app) {
		/* eslint-disable no-new */
		new Vue({
			components: { App },
			router,
			store,
			template: '<App/>'
		}).$mount('#app')
	}
})



