<template>
  <article>
    <div class="row align-items-start">
      <img :src="film.poster" alt="" class="rounded-5" style="width: 300px" />

      <div class="col-12 col-sm-12 col-md-7 col-lg-7 col-xl-8 col-xxl-9">
        <div class="d-flex align-items-center gap-5">
          <div class="d-flex w-100 justify-content-between align-items-center">
            <h1 class="mb-0 text-danger fs-1 fw-bold">{{ film.name }}</h1>

            <div class="d-flex gap-3">
              <WishlistButton :type="1" list="wishlist" :id="props.film.id" text="В закладки" />

              <WishlistButton :type="2" list="favorites" :id="props.film.id" text="В избранное" />
            </div>
          </div>
        </div>

        <p class="fs-5 text-secondary mt-1">{{ film.alternativeName }}</p>

        <p class="fs-5">{{ film?.shortDescription }}</p>

        <div class="row">
          <article class="d-flex gap-3 col-7">
            <article>
              <p class="mb-2">Год</p>
              <p class="mb-2">Страна</p>
              <p class="mb-2">Жанры</p>
              <p class="mb-2">Время</p>
              <p class="mb-2">Бюджет</p>
              <p class="d-flex flex-column mb-2">
                Сборы: <span class="mx-3">в мире</span> <span class="mx-3">в России</span>
                <span class="mx-3">в США</span>
              </p>
              <p class="mb-2">Возраст</p>
              <p class="mb-2">Режиссер</p>
              <p class="mb-2">Премьера в мире</p>
              <p class="mb-2">Премьера в России</p>
            </article>

            <section>
              <p class="mb-2">{{ props.film?.year }}</p>
              <p class="mb-2">
                <span v-text="props.film?.countries?.map((el) => el.name).join(', ')"> </span>
              </p>
              <p class="mb-2">
                <span v-text="props.film?.genres?.map((el) => el.name).join(', ')"> </span>
              </p>
              <p class="mb-2">{{ getTimeFromMins(props.film.movieLength) }}</p>
              <p class="mb-2">
                {{ props.film?.budget?.value?.toLocaleString('ru') }}
                {{ props.film?.budget?.currency }}
              </p>
              <p class="d-flex flex-column mb-2">
                <br />
                <span>
                  {{ props.film?.fees?.world?.value?.toLocaleString('ru') }}
                  {{ props.film?.fees?.world?.currency }}
                </span>

                <span>
                  {{ props.film?.fees?.russia?.value?.toLocaleString('ru') }}
                  {{ props.film?.fees?.russia?.currency }}
                </span>

                <span>
                  {{ props.film?.fees?.usa?.value?.toLocaleString('ru') }}
                  {{ props.film?.fees?.usa?.currency }}
                </span>
              </p>
              <p class="mb-2">{{ props.film?.ageRating }}+</p>
              <p class="mb-2">
                {{ props.film.director }}
              </p>
              <p class="mb-2">
                {{ new Date(props.film?.premiere?.world).toLocaleDateString('ru-RU', options) }}
              </p>
              <p class="mb-2">
                {{ new Date(props.film?.premiere?.russia).toLocaleDateString('ru-RU', options) }}
              </p>
            </section>
          </article>

          <section class="col-5 d-flex flex-column align-items-center gap-3">
            <h2 class="text-danger">Рейтинг</h2>

            <article class="d-flex gap-4">
              <div v-if="film.rating?.imdb">
                <img :src="imdb" alt="" class="mx-auto" />
                <p class="text-center mb-0 mt-2 text-warning fs-4">
                  {{ film.rating?.imdb.toFixed(1) }}
                </p>
              </div>

              <div v-if="film.rating?.kp">
                <img :src="kp" alt="" class="mx-auto" />
                <p class="text-center mb-0 mt-2 text-warning fs-4">
                  {{ film.rating?.kp.toFixed(1) }}
                </p>
              </div>
            </article>

            <section
              v-if="film.top250"
              class="top text-warning fs-3 d-flex flex-column align-items-center"
            >
              <p class="m-0">{{ film.top250 }} МЕСТО</p>

              <p>В ТОП 250</p>
            </section>
          </section>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup>
import kp from '@/assets/kp.png'
import imdb from '@/assets/imdb.png'
import WishlistButton from '@/components/WishlistButton.vue'

const props = defineProps({
  film: Object
})

var getTimeFromMins = function (mins) {
  let hours = Math.trunc(mins / 60)
  let minutes = mins % 60
  return hours + ' ч ' + minutes + ' мин '
}

const options = {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
}
</script>

<style scoped>
.bgTop {
  background: linear-gradient(165deg, #ffd25e 16.44%, #b59646 63.42%);
}

.top {
  font-weight: 600;
}
</style>
