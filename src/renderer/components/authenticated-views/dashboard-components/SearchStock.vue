<template>
	<div class="row">
		<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
			<div class="search-area">
				<n3-input v-model="searchStock" ref="input" show-clean placeholder="Symbol" width="99%" @keyup.native.enter="searchForStock"></n3-input>
			</div>
			<div v-if="keyStats !== null" class="search-content">
			<n3-card class="card-style" :hover="hover">
				<div class="row">
					<div class="col-md-6 col-lg-6 col-sm-6">
						<ul class="stats-info">
							<li>
								<span>Name: </span>
								<span>{{keyStats.name}}</span>
							</li>
							<li>
								<span>Symbol: </span>
								<span>{{keyStats.symbol}}</span>
							</li>
							<li>
								<span>Market Cap: </span>
								<span>{{keyStats.marketCap}}</span>
							</li>
							<li>
								<span>52 Week High: </span>
								<span>{{keyStats.yearHigh}}</span>
							</li>
							<li>
								<span>52 Week Low: </span>
								<span>{{keyStats.yearLow}}</span>
							</li>
							<li>
								<span>52 Week Change: </span>
								<span>{{keyStats.yearChange}}</span>
							</li>
						</ul>
					</div>
					<div class="col-md-6 col-lg-6 col-sm-6">
						<ul class="stats-info">
							<li>
								<span>Dividend Yield: </span>
								<span>{{keyStats.dividendYield}}</span>
							</li>
							<li>
								<span>Revenue: </span>
								<span>{{keyStats.revenue}}</span>
							</li>
							<li>
								<span>Debt: </span>
								<span>{{keyStats.debt}}</span>
							</li>
							<li>
								<span>Cash Holdings: </span>
								<span>{{keyStats.cash}}</span>
							</li>
							<li>
								<span>Gross Profits: </span>
								<span>{{keyStats.grossProfit}}</span>
							</li>
						</ul>
					</div>
				</div>
			</n3-card>
			</div>
			<div class="no-search" v-else>
				<h3>Search for a stock</h3>
			</div>
		</div>
	</div>
</template>
<style type="text/css" lang="scss">
	.search-area {
		width: 50%;
		margin: .5em 0;
	}
	.card-style {
		border-radius: .2em;
		background-color: $middle-color;
		color: $font-color;
		box-shadow: none;
	}
	.search-content {
		margin: .5em auto;


		.row {
			padding: .35em;
		}
	}
	.no-search {
		color: $font-color;
		text-align: center;
		height: 5em;
		vertical-algin: center;
	}
</style>

<script type="text/javascript">
import { getKeyStatsInfo } from '../../api-access/stock-access.js';
export default {
  data() {
    return {
      searchStock: null,
      keyStats: null,
      transitioning: null,
      hover: false,
    };
  },
  created() {

  },
  methods: {
    searchForStock() {
      getKeyStatsInfo(this.searchStock).then((value) => {
        if (value !== null) {
          this.keyStats = value;
        }
      });
    },
  },
};
</script>