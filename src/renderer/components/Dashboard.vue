<template>
	<div class="dashboard-container">
	<div>
		<div class="left-bar">
			<profile-node></profile-node>
		</div>
		<div class="main-content">main</div>
		<div class="right-bar">right</div>
	</div>
	<div class="footer"></div>
	</div>
</template>

<style type="text/css" lang="scss">
	.dashboard-container {
		width: 100%;
		height: auto;

		div {
			display: flex;
			flex-direction: row;
			justify-content: space-evenly;
		}

		.left-bar {
			display: flex;
			width: 25%;
			min-height: 100vh;
			background-color: #FFF;
		}
		.main-content {
			display: flex;
			width: 50%;
			min-height: 100vh;
			background-color: #CCC;
		}
		.right-bar {
			display: flex;
			width: 25%;
			min-height: 100vh;
			background-color: #EEE;
		}
	}
</style>

<script type="text/javascript">
	import Profile from './Profile-Node.vue'
  export default {
  	
    components: {
      'profile-node': Profile
    }   
 }   
</script>