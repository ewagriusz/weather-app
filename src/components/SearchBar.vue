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
</template>

<script setup lang="ts">
  import { ref, watch } from '@vue/runtime-core'
  let word1 = ref('')
  let word2 = ref('')
  let word3 = ref('')
  const words = {
    'first word': word1,
    'second word': word2,
    'third word': word3,
  }

  watch([word1, word2, word3], () => {
    if (word1.value !== '' && word2.value !== '' && word3.value !== '')
      showPropositions()
  })
  function showPropositions() {
    console.log(word1.value, word2.value, word3.value)
  }
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
