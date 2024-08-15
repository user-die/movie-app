<template>
  <section class="about">
    <!-- 
      80
      120
      240px
      390px
      -->

    <img
      :srcset="`${film.poster?.replace('orig', 'x390')} 260w, ${film.poster?.replace('orig', 'x240')} 240w, ${film.poster?.replace('orig', 'x120')} 120w`"
      sizes="(max-width: 400px) 140px, (max-width: 600px) 180px, (max-width: 800px) 200px, 260px"
      alt=""
      class="img rounded-3"
      :src="film.poster?.replace('orig', 'x390')"
    />

    <article>
      <h1 class="mb-0 text-red fs-5 fw-bold">
        {{ film.name }} <span class="text-primary">({{ film?.year }})</span>
      </h1>

      <p class="fs-4 text-secondary mt-1">{{ film.alternativeName }}</p>
    </article>

    <article class="item2">
      <p class="fs-4">{{ film?.shortDescription }}</p>

      <div class="d-flex gap-3">
        <WishlistButton :type="1" list="wishlist" :id="props.film.id" text="В закладки" />

        <WishlistButton :type="2" list="favorites" :id="props.film.id" text="В избранное" />
      </div>

      <p v-if="film?.top250" class="m-0 fs-4 text-gold">{{ film.top250 }} МЕСТО В ТОП 250</p>

      <h2 class="">Рейтинг</h2>

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
    </article>
  </section>

  <section class="info my-3">
    <p v-if="props?.film?.year" class="mb-2 text-red">Год</p>
    <p class="mb-2">{{ props.film?.year }}</p>

    <p v-if="props.film?.budget" class="mb-2 text-red">Бюджет</p>
    <p class="mb-2">
      {{ props.film?.budget?.value?.toLocaleString('ru') }}
      {{ props.film?.budget?.currency }}
    </p>

    <p v-if="props?.film?.countries" class="mb-2 text-red">Страна</p>
    <p class="mb-2">
      <span v-text="props.film?.countries?.map((el) => el.name).join(', ')"> </span>
    </p>

    <p v-if="props.film?.premiere?.russia" class="mb-2 text-red">Премьера в России</p>
    <p class="mb-2">
      {{ new Date(props.film?.premiere?.russia).toLocaleDateString('ru-RU', options) }}
    </p>

    <p v-if="props?.film?.genres" class="mb-2 text-red">Жанры</p>
    <p class="mb-2">
      <span v-text="props.film?.genres?.map((el) => el.name).join(', ')"> </span>
    </p>

    <p v-if="props.film?.premiere?.world" class="mb-2 text-red">Премьера в мире</p>
    <p class="mb-2">
      {{ new Date(props.film?.premiere?.world).toLocaleDateString('ru-RU', options) }}
    </p>

    <p v-if="props?.film?.movieLength" class="mb-2 text-red">Время</p>
    <p class="mb-2">{{ getTimeFromMins(props.film.movieLength) }}</p>

    <p v-if="props.film?.ageRating" class="mb-2 text-red">Возраст</p>
    <p class="mb-2">{{ props.film?.ageRating }}+</p>

    <p v-if="props.film?.director" class="mb-2 text-red">Режиссер</p>
    <p class="mb-2">
      {{ props.film.director }}
    </p>

    <p v-if="props.film?.fees" class="d-flex flex-column mb-2 text-red">
      Сборы: <span v-if="props.film?.fees?.world?.value" class="mx-3">в мире</span>
      <span v-if="props.film?.fees?.russia?.value" class="mx-3">в России</span>
      <span v-if="props.film?.fees?.usa?.value" class="mx-3">в США</span>
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
  </section>
</template>

<script setup>
import kp from '@/assets/images/kp.png'
import imdb from '@/assets/images/imdb.png'
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

.about {
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: 70px auto;
  gap: 20px;

  @media (max-width: 700px) {
    grid-template-columns: 200px auto;
  }

  @media (max-width: 600px) {
    grid-template-columns: 180px auto;
  }

  @media (max-width: 400px) {
    grid-template-columns: 140px auto;
  }
}

.item2 {
  grid-column: 2 / 3;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 15px;

  @media (max-width: 700px) {
    grid-column: 1 / 3;
    align-items: center;
  }
}

.info {
  display: grid;
  gap: 8px;
  grid-template-columns: 180px auto 180px auto;

  @media (max-width: 800px) {
    grid-template-columns: auto auto;
  }
}

.img {
  grid-column: 1 / 2;
  grid-row: 1 / 3;
}

.text-gold {
  color: gold;
}
</style>
