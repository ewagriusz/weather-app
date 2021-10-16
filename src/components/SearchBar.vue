<template>
  <div class="input-group mb-3">
    <input
      v-for="(varRef, name) in placeholderWords"
      :key="name"
      v-model="varRef.value"
      :placeholder="name"
      class="form-control"
    />
  </div>
  <div class="flex">
    <div
      v-for="option in suggestions"
      :key="option.words"
      class="option"
      @click="changeWords(option.words)"
    >
      <div class="input-group mb-2">
        <span class="input-group-text words justify-start">
          {{ [getFlagEmoji(option.country), option.nearestPlace].join(` `) }}
        </span>
        <span class="input-group-text row">
          <div v-for="word in option.words.split('.')" :key="word" class="col">
            {{ word }}
          </div>
        </span>
      </div>
    </div>
  </div>
  <!-- <center clas="( ͡° ͜ʖ ͡°)"> -->
  <button
    class="form-control self-center submitButton mt-1 m-auto"
    @click="submitSearch()"
  >
    Find Weather
  </button>
  <!-- </center> -->
</template>

<script setup lang="ts">
  import { ref, watch, defineEmits } from '@vue/runtime-core'
  let word1 = ref('podjazd')
  let word2 = ref('huczny')
  let word3 = ref('uczciwy')
  const refToWords = [word1, word2, word3]
  const placeholderWords = {
    'first word': word1,
    'second word': word2,
    'third word': word3,
  }
  interface Option {
    country: string
    nearestPlace: string
    words: string
    rank: number
    language: string
  }
  let suggestions = ref([] as Option[])

  function changeWords(arg: string) {
    refToWords.map((el, ind) => (el.value = arg.split(`.`)[ind]))
  }

  const emit = defineEmits(['newLocation'])
  function submitSearch() {
    emit('newLocation', suggestions.value[0].words)
    refToWords.forEach(
      (el, ind) => (el.value = suggestions.value[0].words.split(`.`)[ind])
    )
  }

  watch(refToWords, () => {
    if (refToWords.every(word => word.value !== '')) processPropositions()
  })

  async function showPropositions() {
    const response = await fetch(
      `https://api.what3words.com/v3/autosuggest?input=${refToWords
        .map(q => q.value)
        .join(`.`)}&key=${import.meta.env.VITE_W3W_API_KEY}`
    )
    const data = await response.json()
    suggestions.value = data.suggestions as Option[]
  }

  function getFlagEmoji(countryCode: string) {
    //really edgy way to get charEmoji from countryCode
    return countryCode
      .toUpperCase()
      .replace(/./g, (char: string) =>
        String.fromCodePoint(127397 + char.charCodeAt(0))
      )
  }
  //i know this, and couple of other functions should be in seperate file, in proper folder
  //but im not gonna do it
  const debounce = <T extends (...args: unknown[]) => unknown>(
    callback: (...a: unknown[]) => ReturnType<T>,
    waitFor: number
  ) => {
    let timeout: ReturnType<typeof setTimeout>
    return (...args: Parameters<T>): ReturnType<T> => {
      let result: ReturnType<T> = undefined as ReturnType<T>
      timeout && clearTimeout(timeout)
      timeout = setTimeout(() => {
        result = callback(...args)
      }, waitFor)
      return result
    }
  }
  const processPropositions = debounce(() => showPropositions(), 300)
  processPropositions()
</script>

<style scoped>
  .words {
    flex: auto;
  }

  .option {
    cursor: pointer;
  }

  .submitButton {
    width: auto;
  }
</style>
