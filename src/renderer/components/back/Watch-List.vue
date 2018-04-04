<template>
	<div class="watch-list-node">
		<div>
			<n3-input v-model="aStock" ref="input" show-clean placeholder="SYM" width="99%" @keyup.native.enter="AddWatchList"></n3-input>
		</div>
		<div class="watch-list-area">
			<ul>
				<li v-for="sym in Symbls">
					<div v-if="Symbls" class="w-list-area">
						<div class="w-sym">{{sym.symbol}}</div>
						<div class="w-val">
							<div>${{sym.value}}</div>
							<div class="under-area">
								<span v-if="sym.change > 0">
									{{sym.change}} &nbsp;
									<i class="icon ion-arrow-up-b up"></i>
								</span>
								<span v-else>
									{{sym.change}} &nbsp;
	  								<i class="icon ion-arrow-down-b down"></i>
								</span>
							</div>
						</div>
					</div>
					<div v-else>
						
					</div>
					<div class="clear"></div>
				</li>
			</ul>
		</div>
	</div>
</template>

<style type="text/css" lang="scss">
.watch-list-node {
	width: 95%;
	margin: .25em auto;
	height: auto;
	color: $font-color;
	font-family: $font, sans-serif;
}

.under-area {
	font-size: .65em;
}
.up {
	color: #27ae60;
	font-size: 1.5em;
}
.down {
	color: #c0392b;
	font-size: 1.25em;
}

.add-btn {
	display: inline-block;
	width:9.375%;
	border-radius:50%;
	text-align:center;
	font-size: 1em;
	padding:2.344% 1.172%;
	line-height:0;
	position:relative;
	background: $back-color;
	color: $font-color;

	&:hover {
		background-color: $minor-accent-color;
		color: $sec-font-color;
	}
}
ul {
	list-style-type: none;
	padding: 2.5%;
	font-size: 1.05em;
}

.w-list-area {
	display: flex;
	justify-content: space-between;

	> div {
		flex: 1;
	}

	.w-val {
		text-align: right;
	}
}
</style>

<script type="text/javascript">
import db from '../firestoreInit'
import firebase from 'firebase'
import {getCloseVals,getRecentChange} from '../retrieveStockInfo'

export default {
	data() {
		return {
			Symbls: [],
			aStock: null
		}
	},
	created() {
		this.fetchData();
	},
	methods: {
	AddWatchList() {
		var updatedArray = this.Symbls;
			//Gets the newest value entered
		getCloseVals(this.aStock, 1)
		.then((val) => {
			console.log(val);
			const data = {
				'symbol': this.aStock,
				'value': val[0].close
			}
			updatedArray.push(data);
			this.aStock = "";
			this.insertVal(updatedArray);
		});
	},
	insertVal(updatedArray) {
		this.$db.update({id: firebase.auth().currentUser.uid}, 
			{$set : {WList : this.ExtractSymbols(updatedArray)} }, {},
			(err, numReplaced) => {
			this.Symbls = updatedArray;
		});
	},
	fetchData() {
		this.$db.find({id: firebase.auth().currentUser.uid}, 
		(err, docs) => {
		//console.log(err);
			docs.forEach((element) => {
				this.GetTickerVals(element.WList);
			});
		});	
	},
	GetTickerVals(Symbols) {
		var yestrClose = [];
		for (var i = 0; i < Symbols.length; i++) {
			yestrClose.push(getCloseVals(Symbols[i], 1));
		}
		return Promise.all(yestrClose).then((output) => {
			for(var i = 0; i < output.length; i++) {
					//console.log(temp);
				const data = {
					'symbol': Symbols[i],
					'value': this.fixNums(output[i][0].close),
					'change':this.fixNums(output[i][0].changePercent)
				}
				this.Symbls.push(data);
			}		
		});
	},
	fixNums(num) {
		return Number(num).toFixed(2);
	},
	ExtractSymbols(objArry) {
		var returnArry = [];
		objArry.forEach((element) => {
			returnArry.push(element.symbol);
		});
		return returnArry;
	},
}
}
</script>