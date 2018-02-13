<template>
	<div class="watch-list-node">
		<div>
			<input type="text" name="" placeholder="SYM" v-model="aStock">
			<div v-on:click="AddWatchList" class="add-btn">
				<i class="icon ion-plus-round"></i>
			</div>
		</div>
		<div class="watch-list-area">
			<ul>
				<li v-for="sym in Symbls">
					{{sym}}
				</li>
			</ul>

		</div>
	</div>
</template>

<style type="text/css" lang="scss">
.watch-list-node {
	width: 95%;
	margin: .25em auto;
	height: auto;
	color: $font-color;
}

.add-btn {
	display: inline-block;
	background-color: $main-accent-color;
	color: $font-color;
	padding: .15em;
	border-radius: .1em;

	&:hover {
		background-color: $minor-accent-color;
		color: #sec-font-color;
	}
}
ul {
	list-style-type: none;
}
</style>

<script type="text/javascript">
import db from './firestoreInit'
import firebase from 'firebase'
export default {
	data() {
		return {
			Symbls: null,
			aStock: null
		}
	},
	created() {
		this.fetchData();

	},
	methods: {
		AddWatchList() {
			var updatedArray = this.Symbls;
			updatedArray.push(this.aStock);

			db.collection("WatchList")
			.doc(firebase.auth().currentUser.uid)
			.set({WList: updatedArray}).then((result) => {
				this.Symbls = updatedArray;
				this.Symbls.sort();
			});
		},
		fetchData() {
		//Gets Users Watch List
		db.collection("WatchList").doc(firebase.auth().currentUser.uid)
		.get().then((doc) => {
			console.log("Doc ", doc.data().WList)
			this.Symbls = doc.data().WList;
			this.Symbls.sort();
		});
	},
}
}
</script>