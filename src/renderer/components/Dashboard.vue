<template>
	<div class="dashboard-container">
	<div class="row">
		<div class="left-bar">
			<profile-node></profile-node>
		</div>
		<div class="main-content">main</div>
		<div class="right-bar">
			<watch-list></watch-list>
		</div>
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
			background-color: $back-color;
			
		}
		.left-bar {
			display: flex;
			flex-direction: column;
			width: 25%;
			min-height: 100vh;
			background-color: $middle-color;
		}
		.main-content {
			display: flex;
			flex-direction: column;
			width: 50%;
			min-height: 100vh;
			background-color: $back-color;
		}
		.right-bar {
			display: flex;
			flex-direction: column;
			width: 25%;
			min-height: 100vh;
			background-color: $middle-color;
		}
	}
</style>

<script type="text/javascript">
	import Profile from './Profile-Node.vue'
	import Watch from './Watch-List.vue'
  export default {
  	
    components: {
      'profile-node': Profile,
      'watch-list': Watch
    },
    created() {
    	this.testDB();
    },
    methods: {
    	testDB: function() {
    		var doc = {
    			name: "test",
    			state: "PA",
    			employed: false
    		};
    		// this.$db.insert(doc, function(error, Newdoc) {
    		// 	console.log("Worked ", doc.name);
    		// });

    		this.$db.find({name: 'test'}, function(err, docs) {
    			console.log("Found user ",docs);
    		});
    	}
    }   
 }   
</script>