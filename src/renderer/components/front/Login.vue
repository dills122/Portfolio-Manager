<template>
	<div class="login-container">
		<div class="header">
			Portfolio Manager
		</div>
		<div class="inner-container">
			<div class="text-input">
				<n3-input v-model="email" ref="email" show-clean placeholder="Email" width="99%" ></n3-input>
			</div>
			<div class="text-input">
				<n3-input v-model="password" ref="password" type="password" show-clean placeholder="Password" width="99%" ></n3-input>
				<div>
					<router-link v-bind:to="{ name: 'forgot-pass' }">Forgot Password</router-link>
				</div>
			</div>
			<n3-button type="primary" @click.native="signIn">Login</n3-button>
		</div>
		<div class="new-user">
			<router-link v-bind:to="{ name: 'new-user' }">New Here?</router-link>
		</div>
	</div>
</template>

<style type="text/css" lang="scss">

.login-container {
	display: flex;
	justify-content: center;
	height: auto;
	width: 35%;
	min-width: 245px;
	font-family: $font, sans-serif;
	flex-direction: column;

	.header {
		display: flex;
		align-self: flex-end;
		font-family: $font, sans-serif;
		font-size: 2.15em;
		margin: .5em auto;	
		color: 	$font-color;
		text-align: center;
	}

	.new-user {
		text-align: center;
		font-family: $font, sans-serif;
		font-size: 1.5em;
		margin-top: .25em;

		a {
			color: 	$font-color;

			&:hover {
				color: #000;
			}
		}
	}

	.text-input {
		padding: .25em 0;
	}

	.inner-container {
		display: flex;
		flex-direction: column;
		align-self: center;
		height: auto;
		padding: 2.5em;

		background-color: $secondary-color;

		a {
			color: $font-color;
			margin: .5em 0;
		}

		a:hover {
			color: $sec-font-color;
		}
	}
}
</style>

<script type="text/javascript">
import firebase from 'firebase'
import Router from '../../router'
import initialize from './initialize'

export default {
	name: 'login',
	data: function() {
		return {
			email: '',
			password: ''
		}
	},
	methods: {
		signIn: function() {
			firebase.auth().signInWithEmailAndPassword(this.email,this.password).then(
				function(user) {
					//alert('Well Done')
					console.log("Authed");
					//initialize.initializeApp();
					Router.push('/dashboard');					},
					function(err) {
						alert("Oppps failed");
					}
					);
		},
		FocusTxt: function() {
			var lb = document.getElementById("email-lb");
			lb.className += "raised" + " highlight";
		}
	}
}
</script>