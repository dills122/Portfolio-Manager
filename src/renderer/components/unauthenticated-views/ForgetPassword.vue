<template>
	<div class="forgot-container">
		<div class="header">
			Forgot Password
		</div>
		<div class="inner-container">
			<div class="text-input">
				<n3-input v-model="email" ref="email" show-clean placeholder="Email" width="99%" ></n3-input>
			</div>
			<n3-button type="primary" @click.native="checkCredentials">Submit</n3-button>
		</div>
		<div class="login-return">
			<router-link v-bind:to="{ name: 'login' }">Back</router-link>
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
		<p>Couldn't find a user with those credentials</p>
	</n3-alert>
</div>
</template>

<style type="text/css" lang="scss">
	.forgot-container {
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

	.login-return {
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
import firebase from 'firebase';
	export default {
		data() {
			return {
				email: '',
			}
		},
		methods: {
			checkCredentials() {
				firebase.auth().sendPasswordResetEmail(this.email).then(() => {

				}).catch((error) => {
					this.$ref.wAlert.open();
				});
			}
		},
	}
</script>