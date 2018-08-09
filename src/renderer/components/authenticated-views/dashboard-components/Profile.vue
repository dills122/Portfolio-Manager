<template>
	<div class="profile-area">
		<div class="row">
			<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
				<p>
					{{ name }}
				</p>
			</div>
		</div>
		<div class="row">
			<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
				<p>
					{{ email}}
				</p>
			</div>
		</div>
		<div class="row">
			<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
				<n3-button type="primary" @click.native="signOut">Sign Out</n3-button>
			</div>
		</div>
	</div>
</template>

<style type="text/css" lang="scss">
	.profile-area {
		color: $font-color;
		text-align: center;
	}

</style>

<script type="text/javascript">
	import firebase from 'firebase';
	import Router from '../../../router';
	export default {
		data() {
			return {
				user: null,
				name: null,
				email: null,
			}
		},
		created() {
			this.fetchData();
		},
		methods: {
			fetchData() {
				var authUsr = firebase.auth().currentUser;
				if(authUsr) {
					this.user = authUsr;
					this.email = authUsr.email;
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
			},
		},
	};
</script>