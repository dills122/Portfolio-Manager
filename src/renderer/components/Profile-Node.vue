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
		width: 85%;
		height: auto;
		margin: .5em auto;

		.header-area {
			font-size: 1em;
			font-family: 'Lato', sans-serif;
			color: $font-color;
			text-align:center;
		}

		.info-area {

		}

		.exit-area {
			margin: .5em auto;
			text-align:center;

			button {
				background-color: $main-accent-color;
				color: $font-color;
				border: none;
				padding: .15em .2em;
				width: 65%;
				margin: 0 auto;
				font-family: 'Quicksand', sans-serif;
				font-size: .9em;

				&:hover {
					background-color: $minor-accent-color;
					color: $sec-font-color;
				}
			}
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
