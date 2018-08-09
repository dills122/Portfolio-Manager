<template>
	<div class="new-u-container">
		<div class="header">Sign Up</div>
		<div class="inner-container">
			<n3-input v-model="fName" ref="input" show-clean placeholder="First Name" width="99%" ></n3-input>
			<n3-input v-model="lName" ref="input" show-clean placeholder="Last Name" width="99%" ></n3-input>
			<n3-input v-model="email" ref="input" show-clean placeholder="Email" width="99%" ></n3-input>
			<n3-input v-model="password" ref="input" show-clean placeholder="Password" width="99%" ></n3-input>
			<n3-button type="primary" @click.native="createUser">Create Account</n3-button>
		</div>
		<div class="return-link">
			<router-link v-bind:to="{ name: 'login' }">Return to Login</router-link>
		</div>
		<n3-alert
		ref="wAlert"
		:duration="3000"
		type="danger"
		placement="top"
		message="Warning"
		description
		dismissable>
		<strong>Heads up!</strong>
		<p>{{error}}</p>
	</n3-alert>
</div>
</template>

<style type="text/css" lang="scss">


.new-u-container {
	display: flex;
	justify-content: center;
	height: auto;
	width: 40%;
	min-width: 245px;
	font-family: $font, sans-serif;
	flex-direction: column;

	.header {
		font-family: "Quicksand", sans-serif;
		font-size: 2.15em;
		margin: .5em auto;
		color: #FFF;
		text-align: center;
	}

	.inner-container {
		display: flex;
		flex-direction: column;
		align-self: center;
		height: auto;
		padding: 2.5em;

		background-color: $secondary-color;

		input{
			margin-bottom: 1em;
		}
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
import Router from '../../router';

export default {
	name: 'login',
	data() {
		return {
			email: '',
			password: '',
			fName: '',
			lName: '',
			error: null,
		};
	},
	methods: {
		createUser() {
			firebase.auth().createUserWithEmailAndPassword(this.email, this.password).catch((error) => {
		  // Handle Errors here.
		  const errorCode = error.code;
		  const errorMessage = error.message;
		  this.$ref.wAlert.open();
		});
		},
	},
};
</script>