<template>
  <label>
    <input
      id="autocomplete"
      class="form-control"
      type="text"
      name="location"
      placeholder="Location"
      search-bar
    />
  </label>
</template>

<script setup lang="ts">
  /// <reference types="google.maps" />
  document.addEventListener('DOMContentLoaded', function () {
    // let autoCompleteScript = document.createElement('script')
    // autoCompleteScript.setAttribute(
    //   'src',
    //   'https://maps.googleapis.com/maps/api/js?key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg&libraries=places&v=weekly&channel=1'
    // )
    // document.head.appendChild(autoCompleteScript)

    function initialize() {
      new google.maps.places.Autocomplete(
        document.getElementById('autocomplete') as HTMLInputElement,
        {
          types: ['geocode'],
        }
      )
    }
    initialize()
  })
</script>
