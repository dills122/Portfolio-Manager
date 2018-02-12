<template>
	<div class="watch-list-node">
		<div>
			<input type="text" name="" placeholder="SYM">
			<div v-on:click="AddWatchList" class="add-btn">
				<i class="icon ion-plus-round"></i>
			</div>
		</div>
		<div class="watch-list-area">
			
		</div>
	</div>
</template>

<style type="text/css" lang="scss">
	.watch-list-node {
		width: 95%;
		margin: .25em auto;
		min-height: 100vh;

	}

	.add-btn {
		display: inline-block;
		background-color: #FFF;
		padding: .15em;
		border-radius: .1em;
	}
</style>

<script type="text/javascript">
	import db from './firestoreInit'
	export default {
		data() {
			return {
				Symbls: []
			}
		},
		created() {
			this.fetchData();
		},
		methods: {
			AddWatchList() {
				// firestore.collection('WatchList')get().then((querySnapshot) => {
					
				// })
			},
			fetchData() {
			db.collection("Test").doc("SF").get().then(function(doc) {
				if(doc.exists) {
					console.log("Worked", doc.data());
				} else {
					console.log("Fuck it failed");
				}
			}).catch(function(error) {
				console.log(error);
			});
			}
		}
	}
</script>