<template>
	<div class="login-container">
		<div class="inner-container">
			<div class="text-input">
 				 <input type="text" id="email" placeholder="Email" v-model="email">
  				<label for="email">Email</label>
			</div>
			<div class="text-input">
 				<input type="password" id="password" placeholder="Password" v-model="password">
  				<label for="password">Password</label>
			</div>
			<router-link v-bind:to="{ name: 'forgot-pass' }">Forgot Password</router-link>
			<button type="submit" class="" v-on:click="signIn">Login</button>
		</div>
	</div>
</template>

<style type="text/css" lang="scss">

	.login-container {
		display: flex;
		justify-content: center;
		height: auto;

		.inner-container {
			display: flex;
			flex-direction: column;
			align-self: center;
			height: auto;

			background-color: #2C2F33;

			input {
				margin: .5em;
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
			}
		}
	}
</script>