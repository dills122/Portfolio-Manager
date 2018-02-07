<template>
	<div class="profile-node">
		<div class="header-area">{{ name }}</div>
		<div class="info-area"></div>
		<div class="exit-area">
			<button v-on:click="signOut">Sign Out</button>
		</div>
	</div>
</template>

<style type="text/css" lang="scss">
	.profile-node {
		width: 92%;
		height: auto;
		margin: .5em auto;
		background-color: #FFF;

		.header-info {

		}

		.info-area {

		}

		.exit-area {

		}
	}
</style>

<script type="text/javascript">
import firebase from 'firebase'
import Router from '../router'

export default {
	data() {
		return {
			name: 'Test Name',
			user: null
		}
	},
	created() {
		this.fetchData();
	},
	methods: {
		//Gets the data from the authed user and add to node
		fetchData() {
			var authUsr = firebase.auth().currentUser;
			if(authUsr) {
				this.user = authUsr;
				console.log(authUsr);
				this.name = authUsr.email;
			}
		},
		signOut() {
			firebase.auth().signOut().then(function() {
				//User Signs out successfully
				console.log("Signed Out");
				Router.push('/login')
			}).catch(function(error) {
				console.log(error);
			});
		}
	}
}
</script>
