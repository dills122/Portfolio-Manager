import Vue from 'vue'
import axios from 'axios'
import firebase from 'firebase'

import App from './App'
import router from './router'
import store from './store'


if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
	Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

var app;
var config = {
	apiKey: "AIzaSyC6RBr4Rnwi7DUscrpvrJ5ZGvNV50OEFLw",
	authDomain: "stock-app-fbc76.firebaseapp.com",
	databaseURL: "https://stock-app-fbc76.firebaseio.com",
	projectId: "stock-app-fbc76",
	storageBucket: "stock-app-fbc76.appspot.com",
	messagingSenderId: "227319171546"
};
firebase.initializeApp(config)
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



