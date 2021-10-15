<script setup lang="ts">
  import { ref } from '@vue/runtime-core'

  import SearchBar from './SearchBar.vue'
  interface Address {
    country: string
    nearestPlace: string
    words: string
    rank: number
    language: string
  }
  let data = ref({} as Address)
  async function f(words: string) {
    const response = await fetch(
      `https://api.what3words.com/v3/convert-to-coordinates?words=${words}&key=L6RT3PJO`
    )
    const d = await response.json()
    data.value = d
  }
  function getFlagEmoji(countryCode = 'fr') {
    //really edgy way to get charEmoji from countryCode
    return countryCode
      .toUpperCase()
      .replace(/./g, (char: string) =>
        String.fromCodePoint(127397 + char.charCodeAt(0))
      )
  }
</script>

<template>
  <div class="container">
    <div class="general-information-section">
      <div class="status row text-center pt-3">
        <h2>Enter a <a>W3W</a> location</h2>
      </div>
      <div class="location row text-center pb-3">
        <h5>
          {{
            data.country === undefined
              ? 'To find the weather'
              : getFlagEmoji(data?.country) +
                ' ' +
                data.nearestPlace +
                ' - ' +
                data.words
          }}
        </h5>
      </div>
    </div>

    <div class="details-section row pt-6 pb-3">
      <div class="col text-center border-end">
        <h5>Temperature</h5>
        <h6>val</h6>
      </div>
      <div class="col text-center border-end">
        <h5>Pressure</h5>
        <h6>val</h6>
      </div>
      <div class="col text-center">
        <h5>Humidity</h5>
        <h6>val</h6>
      </div>
    </div>
    <div class="searchbar-section row pb-3">
      <SearchBar @newLocation="f" />
    </div>
  </div>
</template>

<style scoped>
  #card-icon {
    width: 30px;
    height: 30px;
  }
</style>
