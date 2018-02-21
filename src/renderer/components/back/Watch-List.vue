<template>
	<div class="watch-list-node">
		<div>
			<input type="text" name="" placeholder="SYM" v-model="aStock">
			<div v-on:click="AddWatchList" class="add-btn">
				<i class="icon ion-plus-round"></i>
			</div>
		</div>
		<div class="watch-list-area">
			<ul>
				<li v-for="sym in Symbls">
					{{sym.symbol}}&nbsp;&nbsp;{{sym.value}}
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
	font-size: 1.5em;
}
[type="text"]{
	color: $font-color;
	padding: .25rem 0 0;
	font-size: 1.25rem;
	font-weight: 400;
	width: 85%;
	margin: 0 auto;
	border: none;
	border-bottom: 1px solid;
	background: none;
	transition: color .3s ease;
	font-family: $font, sans-serif;

	&::-webkit-input-placeholder {
		color: $font-color;
	}
}
[type="text"]:focus {
	color: $font-color;
	outline: 0;

	&::-webkit-input-placeholder {
		color: $sec-font-color;
	}
}
</style>

<script type="text/javascript">
import db from '../firestoreInit'
import firebase from 'firebase'
export default {
	data() {
		return {
			Symbls: [],
			aStock: null, 
			API_val : "E67ZBHJYSU0K28PD"
		}
	},
	created() {
		this.fetchData();

	},
	methods: {
		AddWatchList() {
			var updatedArray = this.Symbls;
		//Gets the newest value entered
		this.getLatestClose(this.aStock, this.API_val)
		.then((val) => {
			const data = {
				'symbol': this.aStock,
				'value': val
			}
			updatedArray.push(data);
		});
		this.$db.update({id: firebase.auth().currentUser.uid}, {$set : {WList : this.ExtractSymbols(updatedArray)} }, {},
			(err, numReplaced) => {
				this.Symbls = updatedArray;
				this.Symbls.sort();
			});
		this.aStock = "";
	},
	fetchData() {
		this.$db.find({id: firebase.auth().currentUser.uid}, 
			function(err, docs) {
				console.log(err);
			//this.GetTickerVals(doc.data().WList,this.API_val);
		});	
	},
	getLatestClose(sym, API_val) {
		return new Promise((resolve, reject) =>  {
		//Cannot access GetAPIStr and the params it needs
		return fetch(this.GetAPIStr(sym, API_val))
		.then((resp) => resp.json())
		.then(function(data) {
			var days = data["Time Series (Daily)"];
			for (var prop in days) {
				resolve(days[prop]["4. close"]);
				break;
			}
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
			for(var i = 0; i < output.length; i++) {
				const data = {
					'symbol': Symbols[i],
					'value': output[i]
				}
				this.Symbls.push(data);
			}
		});
	},
	ExtractSymbols(objArry) {
		var returnArry = [];
		objArry.forEach((element) => {
			console.log(element.symbol);
			returnArry.push(element.symbol);
		});
		return returnArry;
	},
}
}
</script>