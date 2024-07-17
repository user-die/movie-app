<template>
  <article class="d-grid flex-column align-items-start">
    <div>
      <div class="d-flex align-items-center justify-content-between">
        <h1 class="mb-0 actorName fw-bold">{{ actor.name }}</h1>
        <wishlistButton :type="3" list="stars" :id="props.actor.id" text="Любимая звезда" />
      </div>

      <p class="fs-5 text-secondary mb-3">{{ actor.enName }}</p>
    </div>

    <article class="d-flex gap-3 mt-3">
      <article class="text-secondary">
        <p v-if="props?.actor?.birthday">Возраст</p>
        <p>Дата рождения</p>
        <p>Место рождения</p>
        <p>Всего фильмов</p>
        <p v-if="props?.actor?.growth">Рост</p>
        <p v-if="props?.actor?.countAwards">Количество наград</p>
      </article>

      <section>
        <p>
          {{ calculateAge(new Date(props.actor?.birthday)) }}
          {{ pluralAge(calculateAge(new Date(props.actor?.birthday))) }}
        </p>
        <p>{{ new Date(props.actor?.birthday).toLocaleDateString('ru-RU', options) }}</p>
        <p>
          <span v-text="props.actor.birthPlace?.map((el) => el.value).join(', ')"></span>
        </p>
        <p>{{ actor.movies?.filter((el) => el.enProfession == 'actor').length }}</p>
        <p v-if="props?.actor?.growth">{{ actor.growth }} см</p>
        <p>{{ actor.countAwards }}</p>
      </section>
    </article>
  </article>
</template>

<script setup>
import wishlistButton from '@/components/WishlistButton.vue'

const props = defineProps({
  actor: Object
})

var calculateAge = (birthday) => {
  var ageDifMs = Date.now() - birthday.getTime()
  var ageDate = new Date(ageDifMs)
  return Math.abs(ageDate.getUTCFullYear() - 1970)
}

var pluralAge = (age) => {
  var lastNumber = age.toString().at(-1)

  switch (true) {
    case lastNumber == 1:
      return 'год'
    case lastNumber > 1 && lastNumber <= 4:
      return 'года'
    default:
      return 'лет'
  }
}

const options = {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
}
</script>

<style scoped>
.actorName {
  font-family: Anton, sans-serif;
}
</style>
