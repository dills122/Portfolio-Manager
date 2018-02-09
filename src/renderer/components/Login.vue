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
	</div>
</template>

<style type="text/css" lang="scss">

	.login-container {
		display: flex;
		justify-content: center;
		height: auto;
		width: 35%;
		min-width: 245px;
		font-family: 'Quicksand', sans-serif;
		flex-direction: column;

		.header {
			display: flex;
			align-self: flex-end;
			font-family: 'Quicksand', sans-serif;
			font-size: 2.15em;
			margin: .5em auto;	
			color: 	#7289da;
			text-align: center;
		}

		.inner-container {
			display: flex;
			flex-direction: column;
			align-self: center;
			height: auto;
			padding: 2.5em;

			background-color: #2C2F33;

			.text-input {
				padding: .5em 0;

				div {
					padding-top: .3em;
				}
			}

			a {
				color: #FFF;
			}

			a:hover {
				color: #7289da;
			}

			[type="text"],
			[type="email"],
				[type="password"]{
  				color: rgba(255,255,255,.4);
  				padding: .25rem 0 0;
  				font-size: 1.25rem;
  				font-weight: 400;
  				width: 100%;
  				border: none;
  				border-bottom: 1px solid;
  				background: none;
  				transition: color .3s ease;
  				font-family: 'Quicksand', sans-serif;
			}
			[type="text"]:focus,
			[type="email"]:focus,
				[type="password"]:focus{
  				color: rgba(255,255,255,1);
  				outline: 0;
			}

			button {
				background-color: #FFF;
				border: none;
				padding: .6em .5em;
				width: 80%;
				margin: 0 auto;
				margin-top: .75em;
				font-family: 'Quicksand', sans-serif;
				font-size: 1.1em;
			}
			button:hover {
				background-color: 	#7289da;
			}
		}
	}
</style>

<script type="text/javascript">
import firebase from 'firebase'
import Router from '../router'

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
						console.log("Authed")
						console.log(user)
						Router.push('/dashboard')					},
					function(err) {
						alert("Oppps failed")
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