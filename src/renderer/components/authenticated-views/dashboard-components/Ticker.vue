<template>
	<div id="ticker" class="ticker">
		<div id="inner-tick" v-bind:class="['animated',{ 'fadeOutDown' : isLeaving }, { 'fadeInDown' : isReturning }]">
			<div v-if="currObj" class="split-container">
				<div class="left">{{currObj.symbol}} </div>
				<div class="right">${{currObj['recent-close']}} </div>
			</div>
			<div v-else>
				<div>Ticker Loading</div>
			</div>
			<div class="clear"></div>	
		</div>
	</div>
</template>

<style type="text/css" lang="scss">

.split-container {
	display: flex;
	width: 100%;
	
	.left {
		flex: 1;
	}
	.right {
		flex: 1;
	}
}

.animated {
	-webkit-animation-duration: 1.1s;
	animation-duration: 1.1s;
	-webkit-animation-fill-mode: both;
	animation-fill-mode: both;
}

@-webkit-keyframes fadeOutDown {
	from {
		opacity: 1;
	}

	to {
		opacity: 0;
		-webkit-transform: translate3d(0, 100%, 0);
		transform: translate3d(0, 100%, 0);
	}
}

@keyframes fadeOutDown {
	from {
		opacity: 1;
	}

	to {
		opacity: 0;
		-webkit-transform: translate3d(0, 100%, 0);
		transform: translate3d(0, 100%, 0);
	}
}

.fadeOutDown {
	-webkit-animation-name: fadeOutDown;
	animation-name: fadeOutDown;
}
@-webkit-keyframes fadeInDown {
	from {
		opacity: 0;
		-webkit-transform: translate3d(0, -100%, 0);
		transform: translate3d(0, -100%, 0);
	}

	to {
		opacity: 1;
		-webkit-transform: translate3d(0, 0, 0);
		transform: translate3d(0, 0, 0);
	}
}

@keyframes fadeInDown {
	from {
		opacity: 0;
		-webkit-transform: translate3d(0, -100%, 0);
		transform: translate3d(0, -100%, 0);
	}

	to {
		opacity: 1;
		-webkit-transform: translate3d(0, 0, 0);
		transform: translate3d(0, 0, 0);
	}
}

.fadeInDown {
	-webkit-animation-name: fadeInDown;
	animation-name: fadeInDown;
}

.ticker {
	text-align: center;
	margin: .6em auto;
	#inner-tick {
		font-size: 1.1em;
		color: $font-color;
		line-height: 1.1em;
		width: 95%;
		margin: 0 auto;
	}
}
</style>

<script type="text/javascript">
import { getStockInfo } from '../../api-access/stock-access.js';
import {retrieveWatchlist, addWatchlistItem} from '../../data-access/watchlist-access.js';
	export default {
		data() {
			return {
				objArry: [],
				currObj: null,
				timer: null,
				isReturning: false,
				isLeaving: false,
				transTime: 1100,
			};
		},
		created() {
			this.gatherWatchList().then((value) => {
				if(value !== null) {
					this.initializeTicker(4000);
				}
			});
		},
		methods: {
			initializeTicker(time) {
				this.timer = setInterval(() => {
					this.isReturning = false;
					this.switchTicker();
				}, time);
			},
			switchTicker() {
				this.isLeaving = true;
				setTimeout(() => {
					this.changeTickerValues();
					this.isLeaving=false;
					this.isReturning = true;
				});
			},
			changeTickerValues() {
				var index = this.objArry.indexOf(this.currObj);

				if(index >= 0 && index < this.objArry.length - 1) {
					this.currObj = this.objArry[index+ 1];
				} else {
					this.currObj = this.objArry[0];
				}
			},
			gatherWatchList() {
				return new Promise((resolve, reject) => {
					retrieveWatchlist(100).then((value) => {
						if(value !== null) {
							value.forEach((value, index) => {
								if(index === 0) {
									this.gatherStockInfo(value.symbol, true);
								} else {
									this.gatherStockInfo(value.symbol,false);
								}
							});
							resolve(this.objArry);
						}
					});
				});				
			},
			gatherStockInfo(symbol, setInitial) {
				getStockInfo(symbol, 'watchlist').then((value) => {
					if(setInitial) {
						this.currObj = value;
					}
					this.objArry.push(value);
				});
			},
		},
	};
</script>