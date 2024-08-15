<template>
  <section v-if="isFinished" class="cv">
    <article v-if="data?.items?.filter((el) => el.type === 'FACT').length > 0" class="my-3">
      <openListButton
        text="Факты"
        :length="data?.items?.filter((el) => el.type === 'FACT').length"
        :toggle="factsToggle"
        @toggleList="() => (factsToggle = !factsToggle)"
      />

      <ul
        class="p-0 mb-2 overflow-hidden m-0"
        :style="{ maxHeight: factsToggle ? '100%' : '200px', listStyleType: 'none' }"
      >
        <li
          v-for="fact in data?.items?.filter((el) => el.type === 'FACT')"
          :key="fact?.text"
          class="mb-0 py-3 border-bottom fs-4"
        >
          {{ fact?.text.replace(/\&.*?;/g, '').replace(/\<.*?>/g, '') }}
        </li>
      </ul>
    </article>

    <article v-if="data?.items?.filter((el) => el.type !== 'FACT').length > 0" class="my-3">
      <openListButton
        text="Ошибки (возможны спойлеры !)"
        :length="data?.items?.filter((el) => el.type !== 'FACT').length"
        :toggle="errorsToggle"
        @toggleList="() => (errorsToggle = !errorsToggle)"
      />

      <ul
        class="p-0 mb-2 overflow-hidden m-0"
        :style="{ maxHeight: errorsToggle ? '100%' : '200px' }"
      >
        <li
          v-for="fact in data?.items?.filter((el) => el.type !== 'FACT')"
          :key="fact?.text"
          class="mb-0 py-3 border-bottom fs-4"
        >
          {{ fact?.text.replace(/\&.*?;/g, '').replace(/\<.*?>/g, '') }}
        </li>
      </ul>
    </article>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useFetch2 } from '@/fetch.js'

const props = defineProps({
  id: Number
})

var url = computed(() => `/films/${props.id}/facts`)

const { data, isFinished } = useFetch2(url, { refetch: true }).json()

let factsToggle = ref(false)
let errorsToggle = ref(false)
</script>
