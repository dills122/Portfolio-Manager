<template>
  <div id="app" class="background">
    <link href="https://fonts.googleapis.com/css?family=Lato|Quicksand" rel="stylesheet">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'stock-app'
  }
</script>

<style>
	html, body {
		margin: 0;
		padding: 0;
		font-size: 100%;
	}
  /* CSS */
  .background {
  	background-color: #292f3d;
  }

  #app {
  	display: flex;
  	justify-content: center;
  	height: 100vh;
  }
</style>
