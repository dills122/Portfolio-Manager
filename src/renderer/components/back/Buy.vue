<template>
<div class="pure-g">
	<div class="pure-u-1">
		
	</div>
</div>	
</template>


<script type="text/javascript">
import {getCloseVals} from '../retrieveStockInfo'
	export default {
		data(){
			return {

			}
		},
		created() {
			this.getStock();
		},
		methods: {
			getStock() {
				getCloseVals('MSFT',2, 1)
				.then((val) => {
					console.log(val);
				});
			}
		}
	}
</script>