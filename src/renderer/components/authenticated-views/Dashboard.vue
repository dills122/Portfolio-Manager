<template>
	<div class="row dashboard-container">
		<div class="col-xs-12 col-sm-3 col-md-3 col-lg-2 left-bar">
			<stock-ticker></stock-ticker>
			<div>
				<router-link v-bind:to="{ name: 'login' }">Login Test</router-link>
			</div>
		</div>
		<div class="col-xs-12 col-sm-6 col-md-6 col-lg-8 center-content">
			<vue-scrollbar class="center-container" ref="Scrollbar">
				<div>
					<stock-details></stock-details>
					<search-stock></search-stock>
					<top-lists></top-lists>
				</div>
			</vue-scrollbar>
		</div>
		<div class="col-xs-12 col-sm-3 col-md-3 col-lg-2 right-bar">
			<watch-list></watch-list>
		</div>
	</div>
</template>

<style type="text/css" lang="scss">
	.left-bar {
		background-color: $middle-color;
		min-height: 100vh;
	}
	.center-content {
		background-color: $back-color;
		min-height: 100vh;
		padding: 0 .15em;
	}
	.center-container {
		width: 100%;
    	margin: 0 auto;
    	max-height: 100vh;
    	min-width: 50px;
    	background-color: $back-color;
    	padding: .25em .85em;
	}
	.right-bar {
		background-color: $middle-color;
		// min-height: 100vh;
		position: relative;
	}
	.dashboard-container {
		width: 100%;
		height: auto;
		min-height: 100vh;
		flex-wrap:nowrap;
	}
</style>

<script type="text/javascript">
	import Watchlist from './dashboard-components/WatchList';
	import Ticker from './dashboard-components/Ticker';
	import WatchlistInfo from './dashboard-components/WatchListDetails';
	import SearchStock from './dashboard-components/SearchStock';
	import TopLists from './dashboard-components/TopListArea';
	import VueScrollbar from 'vue2-scrollbar';

	export default {
	  data() {
	    return {
	
	    };
	  },
	  created() {
	  },
	  components: {
	    'watch-list': Watchlist,
	    'stock-ticker': Ticker,
	    'stock-details': WatchlistInfo,
	    'search-stock': SearchStock,
	    'top-lists': TopLists,
	    VueScrollbar,
	  },
	};
</script>