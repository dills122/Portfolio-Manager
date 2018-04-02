<template>
	<div class="container">
		<form>
			<div class="header">Sign Up</div>
			<div class="inner-container">
				<input type="text" name="" id="FName" placeholder="First Name">
				<input type="text" name="" id="LName" placeholder="Last Name">
				<input type="email" name="" id="Email" placeholder="Email" v-model="email">
				<input type="password" name="" id="Password" placeholder="Password" v-model="password">
				<input type="password" name="" id="RetryPass" placeholder="Confirm Password">
				<button type="submit" class="" v-on:click="createUser">Create Account</button>
			</div>
		</form>
		<div class="return-link">
			<router-link v-bind:to="{ name: 'login' }">Return to Login</router-link>
		</div>
	</div>
</template>

<style type="text/css" lang="scss">
	.header {
		    font-family: "Quicksand", sans-serif;
		    font-size: 2.15em;
		    margin: .5em auto;
		    color: #FFF;
		    text-align: center;
	}

	.container {
			text-align: center;
			color: white;
			margin-top: 18em;
		}

	.inner-container {
		width: 20em;
		padding: 2em;
		background-color: $secondary-color; 

		input{
		margin-bottom: 1em;
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

	.return-link {
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
			createUser: function() {
				firebase.auth().createUserWithEmailAndPassword(this.email, this.password).catch(function(error) {
					  // Handle Errors here.
					  var errorCode = error.code;
					  var errorMessage = error.message;
					  alert(error.message);

					});
			},
			FocusTxt: function() {
				//var lb = document.getElementById("email-lb");
				//lb.className += "raised" + " highlight";
			}
		}
	}
</script>