<template>
	<div class="watch-list-node">
		<div class="">
			<div>
				<h4>Watch List</h4>
			</div>
			<div class="add-watchlist-area">
				<n3-input v-model="newStock" ref="input" show-clean placeholder="Symbol" width="99%" @keyup.native.enter="addSymbol(newStock, true)"></n3-input>
			</div>
			<div class="watch-list-area">
				<ul>
					<li v-for="sym in Symbols">
						<div v-if="Symbols" class="row">
							<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
								{{sym.symbol}}
							</div>
							<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
								<div>{{sym['recent-close']}}</div>
								<div>
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
						<div v-else></div>
					</li>
				</ul>
			</div>
		</div>
		<n3-alert
    ref="wAlert"
    :duration="3000"
    type="danger"
    placement="top"
    message="Warning"
    description
    dismissable>
    <strong>Heads up!</strong>
    <p>This stock is already on your watchlist.</p>
  </n3-alert>
	</div>
</template>
<style type="text/css" lang="scss">
	.add-watchlist-area {
		margin: .5em auto;
	}
	.watch-list-area {
		margin-top: 1.5em;
	}
</style>
<script type="text/javascript">
import { getStockInfo } from '../../api-access/stock-access.js';
import {retrieveWatchlist, addWatchlistItem} from '../../data-access/watchlist-access.js';
export default {
  data() {
    return {
      newStock: null,
      Symbols: [],
      showSnackbar: false,
      uid: 100,
    };
  },
  created() {
  	this.fillWatchlist();
  },
  methods: {
  	addSymbol(stock,type) {
  		getStockInfo(stock, 'watchlist').then((value) => {
  			if (this.Symbols.find(stock => stock.symbol === value.symbol) === undefined) {
  				this.Symbols.push(value);
  				if(type) {
  					this.addItemToWatchlist(value.symbol);
  				}
  				this.newStock = '';
  				console.log(this.Symbols);
  			} else {
  				this.$refs.wAlert.open();
    			this.newStock = '';
    		}
    	});
  	},
  	fillWatchlist() {
  		retrieveWatchlist(this.uid).then((value) => {
  			console.log(value);
  			value.forEach((element) => {
  				this.addSymbol(element.symbol, false);
  			});
  		});
  	},
  	addItemToWatchlist(symbol) {
  		const obj = {
  			'symbol': symbol,
  			'u-id': this.uid,
  		};
  		addWatchlistItem(obj).then((value) => {
  			if(value !== null) {
  				console.log(symbol + " Successfully added");
  			}
  		});
  	}
  },
};
</script>