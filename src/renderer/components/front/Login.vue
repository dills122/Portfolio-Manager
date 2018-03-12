<template>
	<div class="login-container">
		<div class="header">
			Portfolio Manager
		</div>
		<div class="inner-container">
			<div class="text-input">
				<input type="text" id="email" placeholder="Email" v-model="email">
			</div>
			<div class="text-input">
				<input type="password" id="password" placeholder="Password" v-model="password">
				<div>
					<router-link v-bind:to="{ name: 'forgot-pass' }">Forgot Password</router-link>
				</div>
			</div>
			<button type="submit" class="" v-on:click="signIn">Login</button>
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

	.inner-container {
		display: flex;
		flex-direction: column;
		align-self: center;
		height: auto;
		padding: 2.5em;

		background-color: $secondary-color;

		.text-input {
			padding: .5em 0;

			div {
				padding-top: .3em;
			}
		}

		a {
			color: $font-color;
		}

		a:hover {
			color: $sec-font-color;
		}

		[type="text"],
		[type="email"],
		[type="password"]{
			color: $font-color;
			padding: .25rem 0 0;
			font-size: 1.25rem;
			font-weight: 400;
			width: 100%;
			border: none;
			border-bottom: 1px solid;
			background: none;
			transition: color .3s ease;
			font-family: $font, sans-serif;

			&::-webkit-input-placeholder {
				color: $font-color;
			}
		}
		[type="text"]:focus,
		[type="email"]:focus,
		[type="password"]:focus{
			color: $font-color;
			outline: 0;

			&::-webkit-input-placeholder {
				color: $sec-font-color;
			}
		}

		button {
			background-color: $main-accent-color;
			border: none;
			padding: .6em .5em;
			width: 80%;
			margin: 0 auto;
			margin-top: .75em;
			font-family: $font, sans-serif;
			font-size: 1.1em;
			color: $font-color;
		}
		button:hover {
			background-color: $minor-accent-color;
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
					console.log(user);
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