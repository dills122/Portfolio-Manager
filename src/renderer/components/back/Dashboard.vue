<template>
	<div class="dashboard-container">
		<n3-container fluid>
			<n3-row>
				<n3-column :col="2" class="left-bar">
					<ticker></ticker>
					<profile-node></profile-node>
					<action-area></action-area>
				</n3-column>
				<n3-column :col="8" class="main-content">
					<portfolio-overview></portfolio-overview>
				</n3-column>
				<n3-column :col="2" class="right-bar">
					<watch-list></watch-list>
				</n3-column>
			</n3-row>
		</n3-container>
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