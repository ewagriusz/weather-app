<script setup lang="ts">
  import WeatherCard from './components/WeatherCard.vue'
</script>

<template>
  <main class="container border">
    <WeatherCard />
  </main>
</template>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    padding: 3rem;
  }

  main {
    display: grid;
    place-items: center;
  }
</style>
