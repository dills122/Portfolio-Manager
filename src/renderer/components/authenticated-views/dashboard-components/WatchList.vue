<template>
  <vue-scrollbar class="w-container" ref="Scrollbar">
    <div class="w-section">
      <div class="addition-area">
        <n3-input v-model="newStock" ref="input" show-clean placeholder="Symbol" width="97%" @keyup.native.enter="addSymbol(newStock, true)"></n3-input>
      </div>
      <div class="watch-list-area">
        <ul>
          <li v-for="sym in Symbols">
            <div v-if="Symbols" class="row">
              <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                {{sym.symbol}}
              </div>
              <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 change-area" >
                <div>{{sym['recent-close']}}</div>
                <div>
                  <span v-if="sym.change.indexOf('(') === -1" class="plus">
                    {{sym.change}} &nbsp;
<!--                     <i class="icon ion-arrow-up-b up"></i> -->
                  </span>
                  <span class="minus" v-else>
                    {{sym.change}} &nbsp;
<!--                     <i class="icon ion-arrow-down-b down"></i> -->
                  </span>
                </div>
              </div>
            </div>
            <div v-else></div>
          </li>
        </ul>
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
</vue-scrollbar>
</template>
<style type="text/css" lang="scss">
  .w-container {
    width: 100%;
    margin: 0 auto;
    max-height: 100vh;
    min-width: 50px;
    background-color: $middle-color;
  }
  .addition-area {
    margin-right: .25em;
  }
  .w-section {
    min-width: 75px;
  }
  .watch-list-area {
    margin-top: .5em;
    color: $font-color;

  }
  .change-area {

    > div:nth-child(1) {
      font-size: .9em;
    }

    > div:nth-child(2) {
      font-size: .75em;
      text-align: right;
      margin-right: 1em;
    }
  }
  .plus {
    color: #000;
    font-weight: 700;
  }
  .minus {
    color: #AAAAAA;
    font-weight: 700;
  }
    .watch-list-area::-webkit-scrollbar {
    width: .15em;
  }
 
  .watch-list-area::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  }
   
  .watch-list-area::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    outline: 1px solid slategrey;
  }
</style>
<script type="text/javascript">
import { getStockInfo } from '../../api-access/stock-access.js';
import { retrieveWatchlist, addWatchlistItem } from '../../data-access/watchlist-access.js';
import VueScrollbar from 'vue2-scrollbar';
export default {
  data() {
    return {
      newStock: null,
      Symbols: [],
      showSnackbar: false,
      uid: 100,
    };
  },components: { VueScrollbar },
  created() {
  	this.fillWatchlist();
  },
  methods: {
  	addSymbol(stock, type) {
  		getStockInfo(stock, 'watchlist').then((value) => {
  			if (this.Symbols.find(stock => stock.symbol === value.symbol) === undefined) {
  				this.Symbols.push(value);
  				if (type) {
  					this.addItemToWatchlist(value.symbol);
  				}
  				this.newStock = '';
  				console.log(this.Symbols);
  			} else {
  				// this.$refs.wAlert.open();
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
  			symbol,
  			'u-id': this.uid,
  		};
  		addWatchlistItem(obj).then((value) => {
  			if (value !== null) {
  				console.log(`${symbol} Successfully added`);
  			}
  		});
  	},
  },
};
</script>