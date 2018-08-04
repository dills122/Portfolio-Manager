<template>
	<div class="row dashboard-container">
		<div class="col-xs-12 col-sm-3 col-md-3 col-lg-2 left-bar">
			<stock-ticker></stock-ticker>
		</div>
		<div class="col-xs-12 col-sm-6 col-md-6 col-lg-8 center-content"></div>
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
	}
	.right-bar {
		background-color: $middle-color;
		min-height: 100vh;
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
	  },
	};
</script>