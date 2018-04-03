<template>
	<div class="p-overview">
		<div>Portfolio Overview</div>
		<div class="stock-scroller">
			<ul>
				<li v-for="sym in stocks">
					<span>{{sym.symbol}}</span>
					<span>{{sym.qty}}</span>
					<span> ${{sym.close}}</span>
				</li>
			</ul>
		</div>
		<div class="stock-info">
			
		</div>
	</div>
</template>

<style type="text/css" lang="scss">
	.p-overview {
		color: $font-color;
		font-family: $font;
	}
	.stock-scroller {
		position: relative;
		overflow-y:auto;
		width: 40%;
		height: auto;
		min-height: 5.5em;

		ul {
			color: $font-color;
			font-family: $font;
		}
	}
</style>

<script type="text/javascript">
import {retrieveTransactions} from '../portfolioActions'
import {getCloseVals} from '../retrieveStockInfo'
import {getRandomColor} from '../global'

	export default {
		data() {
			return {
				transLst: [],
				data: null,
				value: null,
				stocks: []
			}
		},
		created() {
			this.buildData();
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
								'close': stock[0].close
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