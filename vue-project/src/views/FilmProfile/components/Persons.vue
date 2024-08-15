<template>
  <Staff id="actors" ref="actors" :staff="actors" text="Актёры" />

  <Staff id="staff" ref="staff" :staff="mainStaff" text="Над фильмом работали" />

  <Staff id="dubbing" ref="dubbing" :staff="dubbingActors" text="Актёры дубляжа" />
</template>

<script setup>
import Staff from './Staff.vue'
import { computed } from 'vue'

const props = defineProps({
  persons: Array
})

var actors = computed(() => props.persons?.filter((el) => el.profession === 'актеры'))
var staff = computed(() => props.persons?.filter((el) => el.profession !== 'актеры'))

var dubbingActors = computed(() => staff?.value?.filter((el) => el.profession === 'актеры дубляжа'))

var sorderStaff = computed(() =>
  staff?.value
    ?.filter((el) => el.profession !== 'актеры дубляжа')
    .reduce((acc, el) => {
      acc[el.name] = acc[el.name] || { name: el.name, id: el.id, photo: el.photo, professions: [] }
      acc[el.name].professions.push(el.profession)
      return acc
    }, {})
)

var mainStaff = computed(
  () =>
    sorderStaff.value &&
    Object.fromEntries(
      Object.entries(sorderStaff?.value).sort(
        (a, b) => b[1].professions.length - a[1].professions.length
      )
    )
)
</script>
