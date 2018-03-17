<template>
	<div id="ticker" class="ticker">
		<div id="inner-tick" v-bind:class="['animated',{ 'fadeOutDown' : isLeaving }, { 'fadeInDown' : isReturning }]">
			<div v-if="currObj">
				<div class="left">{{currObj.symbol}} </div>
				<div class="right">${{currObj.value}} </div>
			</div>
			<div v-else>
				<div>Ticker Loading</div>
			</div>
			<div class="clear"></div>	
		</div>
	</div>
</template>

<style type="text/css" lang="scss">
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
		line-height: 1.1em;
		width: 90%;
		margin: 0 auto;
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
			objArry: [],
			currObj: null,
			timer: null,
			isReturning: false,
			isLeaving: false,
			transTime: 1100
		}
	},
	created() {
		this.fetchData().then((data) => {
			if(!data) {
				this.currObj = this.objArry[0];
				this.initInterval(4000);
			}
		});
	},
	methods: {
		initInterval(time) {
			this.timer = setInterval(() => {
				this.isReturning =false;
			//begin Fade Out Transistion
			this.changeTicker();
			//console.log("Tick");
		}, time);
		},
		changeTicker() {
			this.isLeaving = true;
			setTimeout(() => {
		this.changeTxt();
			this.isLeaving = false;
			this.isReturning = true;
	}, this.transTime);
		},
		changeTxt() {

			var index = this.objArry.indexOf(this.currObj);
			if(index >= 0 && index < this.objArry.length - 1) {
				this.currObj = this.objArry[index+ 1];
			} else {
				this.currObj = this.objArry[0];
			}
		},
		fetchData() {
			return new Promise((resolve, reject)  => {
				this.$db.find({id: firebase.auth().currentUser.uid}, 
				(err, docs) => {
					//console.log(err);
					docs.forEach((element) => {
						this.GetTickerVals(element.WList);
					});
					resolve(err);
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
				this.objArry.push(data);
			}
		});
	},
	fixNums(num) {
		return Number(num).toFixed(2);
	},
	}
}
</script>