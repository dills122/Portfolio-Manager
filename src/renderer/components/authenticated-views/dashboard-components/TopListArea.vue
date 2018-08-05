<template>
	<div class="row">
		<div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
			<n3-card class="flex">
				<div class="flex">
				<div v-for="item in topGainers" class="gainers-content">
					<span>{{item.name}}</span>
					<span>{{item.symbol}}</span>
					<span>{{item.ytd}}</span>
				</div>
			</div>
			</n3-card>
		</div>
		<div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
			<n3-card>
				<div class="flex">
				<div v-for="item in topLosers" class="losers-content">
					<span>{{item.name}}</span>
					<span>{{item.symbol}}</span>
					<span>{{item.ytd}}</span>
				</div>
			</div>
			</n3-card>
		</div>
	</div>
</template>

<style type="text/css" lang="scss">
	.flex {
		display: flex;
		flex-direction: column;
	}
	.losers-content {
		font-size: .75em;
		flex: 1;
	}
	.gainers-content {
		font-size: .75em;
		flex: 1;
	}
</style>

<script type="text/javascript">
import { getListInfo } from '../../api-access/stock-access.js';
	export default {
		data() {
			return {
				topGainers: [],
				topLosers: [],
			};
		},
		created() {
			this.getTopGainers();
			this.getTopLosers().then((value) => {

			});
		},
		methods: {
			getTopGainers() {
				return new Promise((resolve, reject) => {
					getListInfo(31).then((value) => {
						if(value !== null) {
							this.topGainers = value;
							resolve(true);
						} else {
							reject();
						}
					});
				});
			},
			getTopLosers() {
				return new Promise((resolve, reject) => {
					getListInfo(32).then((value) => {
						if(value !== null) {
							this.topLosers = value;
							resolve(true);
						} else {
							reject();
						}
					});
				});
			},
		},
	};
</script>