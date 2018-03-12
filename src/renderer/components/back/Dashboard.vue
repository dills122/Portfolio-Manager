<template>
	<div class="dashboard-container">
	<div class="pure-g">
		<div class="left-bar pure-u-1-5">
			<ticker></ticker>
			<profile-node></profile-node>
			<action-area></action-area>
		</div>
		<div class="main-content pure-u-3-5">
			<portfolio-overview></portfolio-overview>
		</div>
		<div class="right-bar pure-u-1-5">
			<watch-list></watch-list>
		</div>
	</div>
	<div class="footer pure-g"></div>
	</div>
</template>

<style type="text/css" lang="scss">
	.dashboard-container {
		width: 100%;
		height: auto;

		.left-bar {
			min-height: 100vh;
			background-color: $middle-color;
		}
		.main-content {
			min-height: 100vh;
			background-color: $back-color;
		}
		.right-bar {
			min-height: 100vh;
			background-color: $middle-color;
		}
	}
</style>

<script type="text/javascript">
	import Profile from './Profile-Node.vue'
	import Watch from './Watch-List.vue'
	import Overview from './Overview.vue'
	import Action from './ActionPortfolio.vue'
	import StockOverview from './StockOverview.vue'
	import Ticker from './Ticker.vue'
	import PortOverview from './Portfolio-Overview.vue'
  export default {
  	data() {
  		return {

  		}
  	},
  	
    components: {
      'profile-node': Profile,
      'watch-list': Watch,
      'overview': Overview,
      'action-area': Action,
      'stock': StockOverview,
      'ticker': Ticker,
      'portfolio-overview': PortOverview
    },
    methods: {
    	
    }   
 }   
</script>