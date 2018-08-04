<template>
  <div id="app" class="background main-container">
    <link href="https://fonts.googleapis.com/css?family=Lato|Quicksand" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="http://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
    <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons">
    <router-view></router-view>
  </div>
</template>

<script>

  export default {
    name: 'personal-portfolio',
  };
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
    min-height: 100vh;
    align-items:center;
    width: 100%;
  }
</style>
