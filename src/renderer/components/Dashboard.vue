<template>
	<div class="dashboard-container">
	<div class="row">
		<div class="left-bar">
			<profile-node></profile-node>
			<div style="height: 50px; width: 12px;">
				Test
			</div>
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

		.row {
			display: flex;
			flex-direction: row;
			justify-content: space-evenly;
		}
		.left-bar {
			display: flex;
			flex-direction: column;
			width: 25%;
			min-height: 100vh;
			background-color: #FFF;
		}
		.main-content {
			display: flex;
			flex-direction: column;
			width: 50%;
			min-height: 100vh;
			background-color: #CCC;
		}
		.right-bar {
			display: flex;
			flex-direction: column;
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