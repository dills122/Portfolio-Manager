<template>
	<div>
	<div class="container">
		<div style="background-color:#FFF;">
			<Overview :chart-data="datacollection"></Overview>
		</div>
	</div>
	<div>
		<select>
			<option v-for="symbol in symbols">{{ symbol}}</option>
		</select>
	</div>
</div>
</template>

<style type="text/css" lang="scss">

</style>

<script type="text/javascript">
import Overview from './OverviewLine.js'
import {getCloseVals} from '../retrieveStockInfo'
import {getRandomColor} from '../global'

export default {
	data() {
		return {
			datacollection: null,
			chartOptions: {
				responsive: true
			},
			symbols: null
		}
	},
	components: {
		Overview
	},
	created() {
		this.fetchWatchList();
	},
	methods: {
		fetchWatchList() {
			this.$db.find({id: firebase.auth().currentUser.uid}, 
				(err, docs) => {
	//console.log(err);

	docs.forEach((element) => {
		this.symbols = element.WList;
	});
});	
		}
	}
}
</script>