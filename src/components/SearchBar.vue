<template>
  <div class="input-group mb-3">
    <input
      v-for="(varRef, name) in words"
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
        <!-- <span
          v-for="word in option.words.split('.')"
          :key="word"
          class="input-group-text"
        >
          {{ word }}
        </span> -->
        <span class="input-group-text row">
          <div v-for="word in option.words.split('.')" :key="word" class="col">
            {{ word }}
          </div>
        </span>
      </div>
    </div>
  </div>
  <center clas="( ͡° ͜ʖ ͡°)">
    <button
      class="form-control self-center submitButton mt-1"
      @click="submitSearch()"
    >
      Find Weather
    </button>
  </center>
</template>

<script setup lang="ts">
  import { ref, watch, defineEmits } from '@vue/runtime-core'
  let word1 = ref('podjazd')
  let word2 = ref('huczny')
  let word3 = ref('uczciwy')

  const words = {
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
    ;[word1, word2, word3].map((el, ind) => (el.value = arg.split(`.`)[ind]))
  }

  const emit = defineEmits(['newLocation'])
  function submitSearch() {
    emit('newLocation', suggestions.value[0].words)
    ;[word1, word2, word3].map(
      (el, ind) => (el.value = suggestions.value[0].words.split(`.`)[ind])
    )
  }

  watch([word1, word2, word3], () => {
    if (word1.value !== '' && word2.value !== '' && word3.value !== '')
      processPropositions()
  })
  async function showPropositions() {
    console.log(word1.value, word2.value, word3.value)
    const response = await fetch(
      `https://api.what3words.com/v3/autosuggest?input=${[word1, word2, word3]
        .map(q => q.value)
        .join(`.`)}&key=L6RT3PJO`
    )
    const data = await response.json()
    suggestions.value = data.suggestions as Option[]
    console.log(suggestions.value)
  }
  function getFlagEmoji(countryCode: string) {
    //really edgy way to get charEmoji from countryCode
    return countryCode
      .toUpperCase()
      .replace(/./g, (char: string) =>
        String.fromCodePoint(127397 + char.charCodeAt(0))
      )
  }
  const debounce = <T extends (...args: unknown[]) => unknown>(
    callback: T,
    waitFor: number
  ) => {
    let timeout: ReturnType<typeof setTimeout>
    return (...args: Parameters<T>): ReturnType<T> => {
      let result: any
      timeout && clearTimeout(timeout)
      timeout = setTimeout(() => {
        result = callback(...args)
      }, waitFor)
      return result
    }
  }
  const processPropositions = debounce(() => showPropositions(), 350)
  processPropositions()
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-nocheck

  // let autoCompleteScript = document.createElement('script')
  // autoCompleteScript.setAttribute(
  //   'src',
  //   'https://assets.what3words.com/sdk/v3/what3words.js?key=L6RT3PJO'
  // )
  // document.head.appendChild(autoCompleteScript)

  // what3words.api
  //   .convertToCoordinates('dodawać.wręczyć.hodowla')
  //   .then(function (response) {
  //     console.log('[convertToCoordinates]', response)
  //   })
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
