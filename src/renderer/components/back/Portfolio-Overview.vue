<template>
	<div class="p-overview">
		<Overview :chart-data="data"></Overview>
	</div>
</template>

<style type="text/css" lang="scss">
	
</style>

<script type="text/javascript">
import {retrieveTransactions} from '../portfolioActions'
import {getCloseVals} from '../retrieveStockInfo'
import {getRandomColor} from '../global'
import Overview from './OverviewPie.js'

	export default {
		data() {
			return {
				transLst: [],
				data: null,
			}
		},
		components: {
			Overview
		},
		created() {
			this.buildData();
		},
		methods: {
			getAllDocs() {
				return new Promise((resolve, reject) => {
					retrieveTransactions(this.$pfdb, 'Buy').then((docs) => {
						docs.forEach((transaction) => {
							this.transLst.push(transaction);
						});
						resolve("Complete");
					});
				});
			},
			buildData() {
				this.getAllDocs().then(() => {	
					this.fillStockValues(this.mergeTransactions());
				});
			},
			fillStockValues(compiledStocks) {
				var prmsLst = [];
				compiledStocks.forEach((element) => {
					prmsLst.push(getCloseVals(element.symbol, 1));
				});

				return Promise.all(prmsLst).then((val) => {
					this.constructData(this.constructTotEquity(val, compiledStocks), this.extractSymbols(compiledStocks));	
				});
			},
			mergeTransactions() {
				var compiledStocks = [];
				this.transLst.forEach((element) => {
					var index = compiledStocks.findIndex(stk => stk.symbol === element.symbol);

					if(index >= 0) {
						compiledStocks[index].qty += element.qty;
					} else {
						var val = {
							'symbol': element.symbol,
							'qty': element.qty
						}
						compiledStocks.push(val);
					}
				});
				return compiledStocks;
			},
			constructData(dataVal, syms) {
				this.data = {
					'labels': syms,
					'datasets': [{
						'label': "Portfolio Overview",
						'backgroundColor': getRandomColor(syms.length),
						'data': dataVal
					}]
				}
			},
			extractSymbols(objArry) {
				var returnArry = [];
				objArry.forEach((element) => {
					returnArry.push(element.symbol);
				});
				return returnArry;
			},
			constructTotEquity(vals, compiledStocks) {
				var arry = [];
				for(var i = 0; i < compiledStocks.length; i++) {
					var computedVal = compiledStocks[i].qty * vals[i][0].close;
					arry.push(computedVal);
				}
				return arry;
			}
		}
	}
</script>