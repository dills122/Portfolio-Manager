<template>
	<div>
		<div>Portfolio Overview</div>
		<div class="p-overview">
			<div class="stock-scroller">
				<ul>
					<li v-for="sym in stocks" v-on:click="getStockStats(sym.symbol)">
						<div>{{sym.symbol}}</div>
						<div class="center">{{sym.qty}}</div>
						<div> ${{sym.close}}</div>
					</li>
				</ul>
			</div>
			<div class="stock-info">
				<div v-if="stockStats">
					<div class="center">{{stockStats.companyName}}</div>
					<div class="stats-area">
						<div>
							<div>Market Cap: {{Number(stockStats.marketcap).toLocaleString()}}</div>
						</div>
						<div>
							
						</div>
					</div>
				</div>
				<div v-else>
					<p><n3-loading size="lg"></n3-loading></p>
				</div>
			</div>
		</div>
	</div>
</template>

<style type="text/css" lang="scss">
	.p-overview {
		color: $font-color;
		font-family: $font;
		display: flex;
		overflow: hidden;
		justify-content: space-around;


	}
	.stock-scroller {
		overflow-y:auto;
		width: 34%;
		padding: .35em;
		display: inline-block;
		height: auto;
		
	

		ul {
			color: $font-color;
			font-family: $font;

			> li {
				display: flex;
				justify-content: space-between;
				cursor: pointer;

				div {
					flex: 1;
				}
			}
		}
	}
	.stock-info {
		display: inline-block;
		width: 62%;
		height: auto;
		min-height: 5.5em;
	}
	.stats-area {
		display: flex;
		justify-content: space-between;

		> div {
			flex: 1;
		}
	}
	.center {
		text-align: center;
	}
</style>

<script type="text/javascript">
import {retrieveTransactions} from '../portfolioActions'
import {getCloseVals,getStockStats} from '../retrieveStockInfo'
import {getRandomColor} from '../global'

	export default {
		data() {
			return {
				transLst: [],
				data: null,
				value: null,
				stocks: [],
				stockStats: null
			}
		},
		created() {
			this.buildData();
			this.getStockStats("F");
		},
		methods: {
			buildData() {
				this.getAllDocs().then(() => {	
					//this.fillStockValues(this.mergeTransactions());
					this.mergeTransactions();
				});
			},
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
			getStockStats(sym) {
				getStockStats(sym).then((data) => {
					this.stockStats = data;
				});
			},
			// fillStockValues(compiledStocks) {
			// 	var prmsLst = [];
			// 	compiledStocks.forEach((element) => {
			// 		prmsLst.push(getCloseVals(element.symbol, 1));
			// 	});

			// 	return Promise.all(prmsLst).then((val) => {
			// 		//this.constructData(this.constructTotEquity(val, compiledStocks), this.extractSymbols(compiledStocks));
						
			// 	});
			// },
			mergeTransactions() {
				var compiledStocks = [];
				this.transLst.forEach((element) => {
					var index = compiledStocks.findIndex(stk => stk.symbol === element.symbol);

					if(index >= 0) {
						compiledStocks[index].qty += element.qty;
					} else {
						getCloseVals(element.symbol,1).then((stock) => {
							var val = {
								'symbol': element.symbol,
								'qty': element.qty,
								'close': Number(stock[0].close).toFixed(2)
							}
							compiledStocks.push(val);
						});
					}
				});	
				this.stocks = compiledStocks;
			},
			// constructData(dataVal, syms) {
			// 	this.data = {
			// 		'labels': syms,
			// 		'datasets': [{
			// 			'label': "Portfolio Overview",
			// 			'backgroundColor': getRandomColor(syms.length),
			// 			'data': dataVal
			// 		}]
			// 	}
			// },
			// buildStockList(closeVal,syms) {
			// 	for (var i = 0; i < syms.length; i++) {
			// 		syms[i].close = vals[i][0].close;
			// 	}
			// },
			// extractSymbols(objArry) {
			// 	var returnArry = [];
			// 	objArry.forEach((element) => {
			// 		returnArry.push(element.symbol);
			// 	});
			// 	return returnArry;
			// },
			// constructTotEquity(vals, compiledStocks) {
			// 	var arry = [];
			// 	for(var i = 0; i < compiledStocks.length; i++) {
			// 		var computedVal = compiledStocks[i].qty * vals[i][0].close;
			// 		arry.push(computedVal);
			// 	}
			// 	return arry;
			// }
		}
	}
</script>