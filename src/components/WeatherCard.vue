<script setup lang="ts">
  import SearchBar from './SearchBar.vue'
</script>

<template>
  <div class="container">
    <div class="general-information">
      <div class="status row text-center pt-3">
        <h2>Enter a location</h2>
      </div>
      <div class="location row text-center pb-3">
        <h5>To find the weather</h5>
      </div>
    </div>
    <div class="details-section row pt-6 pb-3">
      <div class="col text-center border-end">
        <h5>Wind</h5>
        <h6>val</h6>
      </div>
      <div class="col text-center border-end">
        <h5>Wind</h5>
        <h6>val</h6>
      </div>
      <div class="col text-center">
        <h5>Wind</h5>
        <h6>val</h6>
      </div>
    </div>
    <div class="row search-container pb-3">
      <SearchBar />
    </div>
  </div>
</template>

<style scoped>
  #card-icon {
    width: 30px;
    height: 30px;
  }

  .container .row {
    /* margin-bottom: 1rem; */
  }
</style>
