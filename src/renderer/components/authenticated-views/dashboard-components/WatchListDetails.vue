<template>
	<div class="row">
		<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 tab-container">
			<n3-tabs>
				<n3-tab v-for="item in stocks" :header="item.symbol" :pill="true">
					<div class="row tab-content">
						<div class="col-md-6 col-lg-6 col-sm-6">
							<ul class="stats-info">
								<li>
									<span>Name: </span>
									<span>{{item.name}}</span>
								</li>
								<li>
									<span>Symbol: </span>
									<span>{{item.symbol}}</span>
								</li>
								<li>
									<span>Market Cap: </span>
									<span>{{item.marketCap}}</span>
								</li>
								<li>
									<span>52 Week High: </span>
									<span>{{item.yearHigh}}</span>
								</li>
								<li>
									<span>52 Week Low: </span>
									<span>{{item.yearLow}}</span>
								</li>
								<li>
									<span>52 Week Change: </span>
									<span>{{item.yearChange}}</span>
								</li>
							</ul>
						</div>
						<div class="col-md-6 col-lg-6 col-sm-6">
							<ul class="stats-info">
								<li>
									<span>Dividend Yield: </span>
									<span>{{item.dividendYield}}</span>
								</li>
								<li>
									<span>Revenue: </span>
									<span>{{item.revenue}}</span>
								</li>
								<li>
									<span>Debt: </span>
									<span>{{item.debt}}</span>
								</li>
								<li>
									<span>Cash Holdings: </span>
									<span>{{item.cash}}</span>
								</li>
								<li>
									<span>Gross Profits: </span>
									<span>{{item.grossProfit}}</span>
								</li>
							</ul>
						</div>
					</div>
				</n3-tab>
			</n3-tabs>
		</div>
	</div>
</template>
<style type="text/css" lang="scss">
	.tab-container {
		color: $font-color;
	}
	.tab-content {
		background-color: $middle-color;
		border-radius: .25em;
		margin: 0 .25em;
	}
	.stats-info {
		font-size: .85em;

		> li {
			margin: .15em 0;
			padding: 0 .15em;
		}

		> li:hover {
			background-color: #FFF;
			color: #000;
			border-radius: .15em;
		}

		> li > span:nth-child(1) {
			font-weight: 700;
		}

	}
</style>
<script type="text/javascript">
import { retrieveWatchlist, addWatchlistItem } from '../../data-access/watchlist-access.js';
import { getStockInfo, getKeyStatsInfo } from '../../api-access/stock-access.js';
export default {
  data() {
    return {
      change: null,
      stocks: [],
      success: null,
    };
  },
  created() {
    this.getWatchList().then((value) => {
      if (value) {
        this.success = true;
      } else {
        this.success = false;
      }
    });
  },
  methods: {
    getWatchList() {
      return new Promise((resolve, reject) => {
        retrieveWatchlist(100).then((value) => {
          if (value !== null) {
            value.forEach((element) => {
              getKeyStatsInfo(element.symbol).then((stats) => {
                this.stocks.push(stats);
              });
            });
            resolve(true);
          } else { reject(false); }
        });
      });
    },
    getKeyStatsInfo(symbol) {

    },
  },
};
</script>