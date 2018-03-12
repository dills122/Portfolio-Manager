<template>
	<div class="container">
		<form>
			<fieldset>
				<div class="pure-g">
					<div class="pure-u-1">
						<input type="text" name="" id="FName">
					</div>
				</div>
				<div class="pure-g">
					<div class="pure-u-1">
						<input type="text" name="" id="LName">
					</div>
				</div>
				<div class="pure-g">
					<div class="pure-u-1">
						<input type="email" name="" id="Email">
					</div>
				</div>
				<div class="pure-g">
					<div class="pure-u-1">
						<input type="password" name="" id="Password">
					</div>
				</div>
				<div class="pure-g">
					<div class="pure-u-1">
						<input type="password" name="" id="RetryPasss">
					</div>
				</div>
			</fieldset>
		</form>
		<div class="return-link">
			<router-link v-bind:to="{ name: 'login' }">Return to Login</router-link>
		</div>
	</div>
</template>

<style type="text/css" lang="scss">
	.return-link {
		text-align: center;
		font-family: $font, sans-serif;
		font-size: 1.25em;
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

</script>