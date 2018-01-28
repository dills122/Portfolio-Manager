<template>
  <div id="app" class="background">
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
  	background-color: #23272A;
  }

  #app {
  	display: flex;
  	justify-content: center;
  	height: 100vh;
  }
</style>
