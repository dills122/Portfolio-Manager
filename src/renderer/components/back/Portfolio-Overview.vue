<template>
	<div class="p-overview">
		
	</div>
</template>

<style type="text/css" lang="scss">
	
</style>

<script type="text/javascript">
import {retrieveTransactions} from '../portfolioActions'
	export default {
		data() {
			return {

			}
		},
		created() {

		},
		methods: {
			getAllDocs() {
				retrieveTransactions().then((docs) => {
					docs.forEach((transaction) => {
						console.log("Price ", transaction.price);
					});
				});
			}
		}
	}
</script>