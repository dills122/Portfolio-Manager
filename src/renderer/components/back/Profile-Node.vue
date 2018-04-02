<template>
	<div class="profile-node pure-g">
		<div class="pure-u-1">
		<div class="header-area">{{ name }}</div>
		<div class="info-area"></div>
		<div class="exit-area">
			<n3-button type="primary" @click.native="signOut">Sign Out</n3-button>
		</div>
		
	</div>
	</div>
</template>

<style type="text/css" lang="scss">
	.profile-node {
		
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

			.pure-button {
				background-color: $main-accent-color;
				color: $font-color;
				font-family: 'Quicksand', sans-serif;

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
import Router from '../../router'

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
