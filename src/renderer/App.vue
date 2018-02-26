<template>
  <div id="app" class="background">
    <link href="https://fonts.googleapis.com/css?family=Lato|Quicksand" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="http://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/chartist/0.11.0/chartist.min.css">
    <link rel="stylesheet" href="https://unpkg.com/purecss@1.0.0/build/pure-min.css" integrity="sha384-nn4HPE8lTHyVtfCBi5yW9d20FjT8BJwUXyWZT9InLYax14RDjBj46LmSztkmNP9w" crossorigin="anonymous">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'stock-app'
  }
</script>

<style lang="scss">
	html, body {
		margin: 0;
		padding: 0;
		font-size: 100%;
	}
  /* CSS */
  .background {
  	background-color: $back-color;
  }

  #app {
  	display: flex;
  	justify-content: center;
  	height: 100vh;
  }
</style>
