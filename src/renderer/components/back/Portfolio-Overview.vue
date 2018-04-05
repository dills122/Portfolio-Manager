<template>
	<div>
		<div class="header">Portfolio Overview</div>
		<div class="p-overview">
			<div class="stock-scroller">
				<ul>
					<li v-for="sym in stocks" v-on:click="getStockStats(sym.symbol)">
						<div class="table">
							<div class="col">{{sym.symbol}}</div>
							<div class="col-half">{{sym.qty}}</div>
							<div class="col">${{sym.close}}</div>
						</div>
					</li>
				</ul>
			</div>
			<div class="stock-info">
				<div v-if="stockStats">
					<div class="center comp-header">{{stockStats.companyName}}</div>
					<div class="stats-area">
						<div class="table">
							<div class="col">
								<div class="table">
									<div class="col">
										<div>52 Wk High</div>
										<div>52 Wk Low</div>
										<div>Dividend Rate</div>
										<div>Dividend Yield</div>
									</div>
									<div class="col">
										<div>{{stockStats.week52high}}</div>
										<div>{{stockStats.week52low}}</div>
										<div>{{stockStats.dividendRate}}</div>
										<div>{{stockStats.dividendYield}}</div>
									</div>
								</div>
							</div>
							<div class="col">
								<div class="table">
									<div class="col">
										<div>200 Day Moving Avg.</div>
										<div>50 Day Moving Avg.</div>
										<div>P/E High</div>
										<div>P/E Low</div>
									</div>
									<div class="col">
										<div>{{stockStats.day200MovingAvg}}</div>
										<div>{{stockStats.day50MovingAvg}}</div>
										<div>{{stockStats.peRatioHigh}}</div>
										<div>{{stockStats.peRatioLow}}</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div v-else>
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

			&:hover {
				background-color: $secondary-color;
			}

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

	font-size: .75em;

	> div {
		flex: 1;
	}
}
.center {
	text-align: center;
}

.table {
	display:flex;

	> .col {
		flex: 1;
	}
	> .col-half {
		flex: .5;
	}
}
.comp-header {
	white-space: nowrap;
  	overflow: hidden;
  	text-overflow: ellipsis;
}
.header {
	color: $font-color;
	font-size: 1.4em;
	margin-left: .5em;
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
		this.buildData().then((val) => {
			//this.getStockStats(val);
		});
	},
	methods: {
		buildData() {
			return new Promise((resolve,reject)=> {
				this.getAllDocs().then(() => {	
					this.mergeTransactions();
					
					resolve(this.stocks);
				});
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
	}
}
</script>