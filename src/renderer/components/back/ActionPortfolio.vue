<template>
	<div class="row action-area">
		<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 padding">
			<div class="row">
				<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
					<n3-input v-model="symbol" ref="input" show-clean placeholder="SYM" width="99%" ></n3-input>
				</div>
			</div>
			<div class="row">
				<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
					<n3-input v-model="price" ref="input" show-clean placeholder="Price" width="99%" ></n3-input>
				</div>
			</div>
			<div class="row">
				<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
					<n3-input v-model="qty" ref="input" show-clean placeholder="Quantity" width="99%" ></n3-input>
				</div>
			</div>
			<div class="row">
				<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
					<n3-radio-group v-model="picked" type="primary">
  						<n3-radio-btn label="Buy">Buy</n3-radio-btn>
  						<n3-radio-btn label="Sell">Sell</n3-radio-btn>
					</n3-radio-group>
				</div>
			</div>
			<div class="row">
				<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
					<n3-button type="primary" @click.native="actionEvnt">{{picked}}</n3-button>
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

	.row {
		width: 90%;
		margin: .35em auto;
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