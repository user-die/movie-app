<template>
  <div class="d-flex flex-column gap-5 container mainBg p-4">
    <h1 class="text-white">Глобальный поиск</h1>
    <div class="row">
      <div class="col-5">
        <BFormInput
          id="input-default"
          class="bg-dark border-danger text-white"
          placeholder="Поиск"
        />
      </div>

      <div class="col-2">
        <BFormSelect class="bg-dark border-danger text-white" v-model="typeInput" :options="types">
          <template #first>
            <BFormSelectOption :value="null" disabled>Тип</BFormSelectOption>
          </template>
        </BFormSelect>
      </div>
    </div>

    <label for="">Рост от</label>
    <BFormSelect class="bg-dark border-danger text-white" v-model="growthFrom" :options="growth" />

    <label for="">Рост до</label>
    <BFormSelect
      class="bg-dark border-danger text-white"
      v-model="growthBefore"
      :options="growth"
    />

    <div>
      <BFormGroup label="Поиск по жанру" label-for="tags-with-dropdown">
        <BFormTags
          class="d-flex justify-content-between align-items-center mb-2"
          id="tags-with-dropdown"
          v-model="value"
          no-outer-focus
        >
          <template v-slot="{ tags, disabled, addTag, removeTag }">
            <ul v-if="tags.length > 0" class="d-flex gap-2 flex-wrap mb-0 p-0">
              <ol v-for="tag in tags" :key="tag" class="p-0">
                <BFormTag
                  @remove="removeTag(tag)"
                  :title="tag"
                  :disabled="disabled"
                  variant="danger"
                  >{{ tag }}</BFormTag
                >
              </ol>
            </ul>

            <BDropdown size="sm" variant="outline-danger" block no-caret>
              <template #button-content> &#x1f50d; <span>Добавить тег</span> </template>
              <BDropdownForm @submit.stop.prevent="() => {}"> </BDropdownForm>
              <BDropdownDivider></BDropdownDivider>
              <BDropdownItemButton
                v-for="option in availableOptions"
                :key="option"
                @click="onOptionClick({ option, addTag })"
              >
                {{ option }}
              </BDropdownItemButton>
              <BDropdownText v-if="availableOptions.length === 0">
                There are no tags available to select
              </BDropdownText>
            </BDropdown>
          </template>
        </BFormTags>
      </BFormGroup>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
  BFormInput,
  BFormSelectOption,
  BFormSelect,
  BFormTags,
  BFormTag,
  BFormGroup,
  BDropdown,
  BDropdownForm,
  BDropdownItemButton
} from 'bootstrap-vue-next'

var typeInput = ref(null)

var types = ['Фильм', 'Сериал', 'Мультфильм', 'Мультсериал', 'Аниме']

var growth = Array.from({ length: 130 }, (_, i) => i + 1 + 100)

var growthFrom = ref(null)
var growthBefore = ref(null)

const options = ref([
  'Биография',
  'Боевик',
  'Вестерн',
  'Военный',
  'Детектив',
  'Детский',
  'Для взрослых',
  'Документальный',
  'Драма',
  'Игра',
  'История',
  'Комедия',
  'Концерт',
  'Короткометражка',
  'Криминал',
  'Мелодрама',
  'Музыка',
  'Мультфильм',
  'Мюзикл',
  'Новости',
  'Нуар',
  'Приключения',
  'Реальное ТВ',
  'Семейный',
  'Спорт',
  'Ток-шоу',
  'Триллер',
  'Ужасы',
  'Фантаскика',
  'Фэнтези',
  'Церемония'
])

const search = ref('')
const value = ref([])

const criteria = computed(() => search.value.trim().toLowerCase())
const availableOptions = computed(() => {
  const searchCriteria = criteria.value

  const optionsFiltered = options.value.filter((opt) => value.value.indexOf(opt) === -1)
  if (searchCriteria) {
    return optionsFiltered.filter((opt) => opt.toLowerCase().indexOf(searchCriteria) > -1)
  }
  return optionsFiltered
})

const onOptionClick = ({ option, addTag }) => {
  addTag(option)
  search.value = ''
}
</script>

<style scoped></style>
