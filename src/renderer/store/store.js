import Vue from 'vue';
import Vuex from 'vuex';
import {retrieveWatchlist} from '../components/data-access/watchlist-access';

Vue.use(Vuex);

export const store = new Vuex.Store({
	state: {
		watchlist: retrieveWatchlist(100),
	},
	getters: {

	},
	mutations: {
		updateWatchlist: (state, payload) => {
			state.watchlist = payload;
		}
	},
	actions: {

	}
});