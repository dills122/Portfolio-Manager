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
				this.GetTickerVals(val, "E67ZBHJYSU0K28PD");
			});
		},
		getLabels() {
			return new Promise((resolve, reject) => {
				return this.$db.find({id: firebase.auth().currentUser.uid}, 
				(err, docs) => {
					console.log(err);
					docs.forEach((element) => {
						resolve(element.WList);
					});
				});
			});
		},
		getLatestClose(sym, API_val) {
			return new Promise((resolve, reject) =>  {
//Cannot access GetAPIStr and the params it needs
return fetch(this.GetAPIStr(sym, API_val))
.then((resp) => resp.json())
.then(function(data) {
	var days = data["Time Series (Daily)"];
	var maxVal = 7;
	var lastSeven = [];
	for (var prop in days) {
		maxVal--;
		if(maxVal == 0) {
			break;
		}
		lastSeven.push(days[prop]["4. close"]);
		
	}
	resolve(lastSeven);
});
});
		},
		GetAPIStr(SYM, API_val) {
			var url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + SYM + "&apikey=" + API_val;
			return url;	
		},
		GetTickerVals(Symbols, API_val) {
			var yestrClose = [];
			for (var i = 0; i < Symbols.length; i++) {
				yestrClose.push(this.getLatestClose(Symbols[i],API_val));
			}
			return Promise.all(yestrClose).then((output) => {
				var Arry = [];

				for(var i = 0; i < output.length; i++) {
					var temp = output[i];
					temp.reverse();
					const data = {
						label: Symbols[i],
						data: temp
					}
					Arry.push(data);
				}

				this.datacollection = {
					labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
					datasets: Arry
				}

				Arry = null;
				console.log("Symbols",Symbols);
				console.log("Chart Data", this.chartData);
				//new Chartist.Line(this.$el, this.chartData, this.chartOptions);
			});
		},
		avgPrice(vals) {
			let sum = vals.reduce((previous, current) => current += previous);
			return sum / vals.length;
		},
	}
}
</script>