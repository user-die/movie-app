<template>
  <article v-if="facts" class="my-4">
    <div class="w-100 d-flex gap-3 col-12 mb-2">
      <h2 class="text-danger m-0 fs-1 fw-bold">Факты о фильме</h2>

      <button
        @click="
          () => {
            factsToggle = !factsToggle
          }
        "
        class="btn btn-outline-danger"
      >
        <ChevronRight v-if="factsToggle" />
        <ChevronDown v-else />
      </button>
    </div>

    <ul
      class="p-0 mb-2 overflow-hidden m-0"
      :style="{ maxHeight: factsToggle ? '250px' : '100%', listStyleType: 'none' }"
    >
      <li
        v-for="fact in facts.data.filter((el) => el.type === 'FACT')"
        :key="fact?.text"
        class="mb-0 py-3 border-bottom fs-4"
      >
        {{ fact?.text.replace(/\&.*?;/g, '').replace(/\<.*?>/g, '') }}
      </li>
    </ul>

    <div class="w-100 d-flex gap-3 col-12 mb-2">
      <h2 class="text-danger m-0 fs-1 fw-bold">Ошибки в фильме ( возможны спойлеры ! )</h2>

      <button
        @click="
          () => {
            errorsToggle = !errorsToggle
          }
        "
        class="btn btn-outline-danger"
      >
        <ChevronRight v-if="errorsToggle" />
        <ChevronDown v-else />
      </button>
    </div>

    <ul
      class="p-0 mb-2 overflow-hidden m-0"
      :style="{ maxHeight: errorsToggle ? '250px' : '100%', listStyleType: 'none' }"
    >
      <li
        v-for="fact in facts.data.filter((el) => el.type !== 'FACT')"
        :key="fact?.text"
        class="mb-0 py-3 border-bottom fs-4"
      >
        {{ fact?.text.replace(/\&.*?;/g, '').replace(/\<.*?>/g, '') }}
      </li>
    </ul>
  </article>
</template>

<script setup>
import axios from 'axios'
import options from '../../../options.json'
import ChevronRight from '~icons/bi/chevron-right'
import ChevronDown from '~icons/bi/chevron-down'
import { onMounted, reactive, ref, watch } from 'vue'

var factsToggle = ref(true)
var errorsToggle = ref(true)

var facts = reactive({ data: [] })

const props = defineProps({
  id: Number
})

var getFacts = async (id) => {
  let response = await axios(
    `https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}/facts`,
    options['request2']
  )

  facts.data = response.data.items
}

watch(props, (newValue) => {
  getFacts(newValue.id)
})

onMounted(() => {
  getFacts(props.id)
})
</script>

<style scoped></style>
