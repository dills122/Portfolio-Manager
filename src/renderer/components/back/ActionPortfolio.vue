<template>
	<div class="pure-g action-area">
		<div class="pure-u-1 padding">

			<div class="pure-g">
				<div class="pure-u-1-2">
					<input type="text" name="" id="symbolAct" placeholder="SYM" v-model="symbol">
				</div>
				<div class="pure-u-1-2">
					<input type="text" name="" id="priceAct" placeholder="Price" v-model="price">
				</div>
			</div>
			<div class="pure-g">
				<div class="pure-u-1">
					<input type="text" name="" id="quantityAct" placeholder="Quantity" v-model="qty">
				</div>
			</div>
			<div class="pure-g top-pad">
				<div class="pure-u-1">
					<input type="radio" id="buyAct" value="Buy" v-model="picked">
					<label for="buyAct">Buy</label>
					<input type="radio" id="sellAct" value="Sell" v-model="picked">
					<label for="sellAct">Sell</label>
				</div>
			</div>
			<div class="pure-g top-pad">
				<div class="pure-u-1">
					<a class="pure-button pure-button-primary" v-on:click="actionEvnt">
						{{picked}}
					</a>
				</div>
			</div>	
		</div>
	</div>	
</template>
<style type="text/css" lang="scss">
.padding {
	padding: .25em;
	text-align: center;
}
.top-pad {
	padding-top: .5em;
}

[type="text"],
[type="email"],
[type="password"]{
	color: $font-color;
	padding: .25rem 0 0;
	font-size: 1.25rem;
	font-weight: 400;
	width: 100%;
	border: none;
	border-bottom: 1px solid;
	background: none;
	transition: color .3s ease;
	font-family: $font, sans-serif;

	&::-webkit-input-placeholder {
		color: $font-color;
	}
}
[type="text"]:focus,
[type="email"]:focus,
[type="password"]:focus{
	color: $font-color;
	outline: 0;

	&::-webkit-input-placeholder {
		color: $sec-font-color;
	}
}
.action-area {
	.pure-button {
		background-color: $main-accent-color;
		color: $font-color;
		font-family: 'Quicksand', sans-serif;

		&:hover {
			background-color: $minor-accent-color;
			color: $sec-font-color;
		}
	}
}
</style>

<script type="text/javascript">
import {getCloseVals} from '../retrieveStockInfo'
import {addTransaction,retrieveTransactions} from '../portfolioActions'
import firebase from 'firebase'

export default {
	data(){
		return {
			picked: null,
			symbol: null,
			qty: null,
			price: null
		}
	},
	created() {
		this.picked = "Buy";
	},
	methods: {
		actionEvnt() {
			addTransaction(this.createObj(), this.$pfdb).then((output) => {
				console.log("Transaction Added", output);
				this.symbol = null;
				this.qty = null;
				this.price = null;
			});
		},
		createObj() {
			const val = {
				'u-id': firebase.auth().currentUser.uid,
				'symbol': this.symbol,
				'qty': this.qty,
				'price': this.price,
				'date': this.constructDate(),
				'type': this.picked
			}
			return val;
		},
		constructDate() {
			var d = new Date();
			var month = parseInt(d.getMonth()) + 1;
			return month + '/' + d.getDay() + '/' + d.getFullYear();
		},
	}
}
</script>