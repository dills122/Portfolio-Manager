<template>
	<div>
		<n3-card class="inner-padding list-card" :hover="hover">
			<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
				<div class="row">
					<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
						<h4>Top Gainers</h4>
						<div v-for="item in topGainers" class="gainers-content">
							<div class="row">
								<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
									{{item.symbol}}
								</div>
								<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
									{{item.ytd}}
								</div>
							</div>
						</div>
					</div>
					<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
						<h4>Top Losers</h4>
						<div v-for="item in topLosers" class="losers-content">
							<div class="row">
								<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
									{{item.symbol}}
								</div>
								<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
									{{item.ytd}}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</n3-card>	
	</div>
</template>

<style type="text/css" lang="scss">
.inner-padding {
	padding: .25em;
}

.list-card {
	border-radius: .25em;
	background-color: $middle-color;
	color: $font-color;
	box-shadow: none;
}
.small-gutters {
	padding: .2em;
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
				hover: false,
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