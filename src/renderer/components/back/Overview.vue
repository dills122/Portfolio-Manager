<template>
	<div class="container">
<div style="background-color:#FFF;">
	<Overview :chart-data="datacollection"></Overview>
</div>
</div>
</template>

<style type="text/css" lang="scss">
	.container {
		width: 80%;
		margin: 0 auto;
	}
</style>

<script type="text/javascript">
import firebase from 'firebase'
import Overview from './OverviewLine.js'
import {getCloseVals} from '../retrieveStockInfo'
import {getRandomColor} from '../global'

export default {
	data() {
		return {
			datacollection: null,
			chartOptions: {
				responsive: true
			}
		}
	},
	components: {
		Overview
	},
	mounted() {
		this.fetchData();
	},
	methods: {
		fetchData() {
			this.getLabels().then((val) => {
				//val == Watch List Symbols
				this.GetTickerVals(val, 7);
			});
		},
		getLabels() {
			return new Promise((resolve, reject) => {
				return this.$db.find({id: firebase.auth().currentUser.uid}, 
				(err, docs) => {
					
					docs.forEach((element) => {
						resolve(element.WList);
					});
				});
			});
		},
		GetTickerVals(Symbols, days) {
			var yestrClose = [];
			for (var i = 0; i < Symbols.length; i++) {
				yestrClose.push(getCloseVals(Symbols[i], days));
			}
			return Promise.all(yestrClose).then((output) => {
				var Arry = [];
				var labels = [];
				for(var i = 0; i < output.length; i++) {
					
					const data = {
						label: Symbols[i],
						data: this.getCloseValues(output[i]),
						borderColor: getRandomColor(),
						fill: false
					}
					Arry.push(data);
				}

				this.datacollection = {
					labels: this.getDates(output[0]),
					datasets: Arry
				}
				Arry = null;

			});
		},
		getCloseValues(objs) {
			var closeArry = [];
			objs.forEach(function(element) {
				closeArry.push(element.close);
			});
			return closeArry;
		},
		getDates(objs) {
			var arry = [];
			objs.forEach(function(element) {
				arry.push(element.date);
			});
			return arry;
		},
		avgPrice(vals) {
			let sum = vals.reduce((previous, current) => current += previous);
			return sum / vals.length;
		},
	}
}
</script>