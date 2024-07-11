<template>
  <article class="mt-4">
    <OtherFilms
      v-if="films?.data"
      :films="films?.data.sort((a, b) => b.year - a.year)"
      text="Фильмы и сериалы"
    />

    <div class="w-100 d-flex gap-3 col-12 mb-2">
      <h2 class="text-danger m-0 fs-1 fw-bold">Участие в проектах</h2>

      <BButton
        @click="
          () => {
            rolesToggle = !rolesToggle
          }
        "
        variant="outline-danger"
      >
        <ChevronRight v-if="rolesToggle" />
        <ChevronDown v-else />
      </BButton>
    </div>

    <ul
      class="d-flex flex-wrap overflow-hidden align-items-start ps-4 m-0 justify-content-between"
      :style="{ maxHeight: rolesToggle ? '250px' : '100%' }"
    >
      <li
        v-for="movie in movies.filter((el) => el.enProfession !== 'actor')"
        :key="movie.id"
        style="flex: 1 1 400px"
        class="p-0"
      >
        <router-link :to="'/movie/' + movie.id" class="text-decoration-none text-white"
          >{{ movie.name || movie.alternativeName }}

          <span class="text-secondary">{{ movie.description && ', ' + movie.description }}</span>
        </router-link>
      </li>
    </ul>
  </article>
</template>

<script setup>
import axios from 'axios'
import options from '@/options.json'
import ChevronRight from '~icons/bi/chevron-right'
import ChevronDown from '~icons/bi/chevron-down'
import OtherFilms from '@/views/FilmProfile/components/OtherFilms.vue'
import { BButton } from 'bootstrap-vue-next'
import { onMounted, reactive, ref } from 'vue'

var rolesToggle = ref(true)

var actorRoles = reactive({ data: [] })

var films = reactive({
  data: [
    {
      id: 1388409,
      name: 'Фуриоса: Хроники Безумного Макса',
      image:
        'https://image.openmoviedb.com/kinopoisk-images/10671298/67682659-46ae-48db-865f-2ee993b9af4a/orig',
      genres: [
        { name: 'фантастика' },
        { name: 'боевик' },
        { name: 'триллер' },
        { name: 'приключения' },
        { name: 'драма' }
      ],
      year: 2024,
      rating: { kp: 7.234, imdb: 7.7 },
      description: {
        _custom: {
          type: 'reactive',
          stateTypeName: 'Reactive',
          value: {
            id: 1388409,
            name: 'Фуриоса: Хроники Безумного Макса',
            alternativeName: 'Furiosa: A Mad Max Saga',
            rating: 7.469,
            general: false,
            description: 'Furiosa',
            enProfession: 'actor'
          }
        }
      }
    },
    {
      id: 1346594,
      name: 'Амстердам',
      image:
        'https://image.openmoviedb.com/kinopoisk-images/1898899/61f397d6-b84c-44ab-806f-4a5226d5f0b1/orig',
      genres: [{ name: 'комедия' }, { name: 'детектив' }, { name: 'история' }],
      year: 2022,
      rating: { kp: 6.121, imdb: 6.1 },
      description: {
        _custom: {
          type: 'reactive',
          stateTypeName: 'Reactive',
          value: {
            id: 1346594,
            name: 'Амстердам',
            alternativeName: 'Amsterdam',
            rating: 6.122,
            general: false,
            description: 'Libby Voze',
            enProfession: 'actor'
          }
        }
      }
    },
    {
      id: 1313198,
      name: 'Варяг',
      image:
        'https://image.openmoviedb.com/kinopoisk-images/6201401/67c19114-3d37-4c76-92e6-ad1088a6f1f5/orig',
      genres: [{ name: 'фэнтези' }, { name: 'боевик' }, { name: 'драма' }],
      year: 2022,
      rating: { kp: 6.735, imdb: 7 },
      description: {
        _custom: {
          type: 'reactive',
          stateTypeName: 'Reactive',
          value: {
            id: 1313198,
            name: 'Варяг',
            alternativeName: 'The Northman',
            rating: 6.737,
            general: false,
            description: 'Olga of the Birch Forest',
            enProfession: 'actor'
          }
        }
      }
    },
    {
      id: 4929549,
      name: 'Anya Taylor-Joy: Downtown (Downtempo)',
      image:
        'https://image.openmoviedb.com/kinopoisk-images/9784475/d8e90426-aefa-4a99-887c-ca48da950534/orig',
      genres: [{ name: 'короткометражка' }, { name: 'музыка' }],
      year: 2021,
      rating: { kp: 0, imdb: 8.1 },
      description: {
        _custom: {
          type: 'reactive',
          stateTypeName: 'Reactive',
          value: {
            id: 4929549,
            name: null,
            alternativeName: 'Anya Taylor-Joy: Downtown (Downtempo)',
            rating: null,
            general: false,
            description: null,
            enProfession: 'actor'
          }
        }
      }
    },
    {
      id: 2001031,
      name: 'Золушка: Комическая пантомима на Рождество',
      image:
        'https://image.openmoviedb.com/kinopoisk-images/4486454/737d2f53-d385-40bf-98e1-d2953f29c9aa/orig',
      genres: [{ name: 'комедия' }],
      year: 2020,
      rating: { kp: 0, imdb: 6.6 },
      description: {
        _custom: {
          type: 'reactive',
          stateTypeName: 'Reactive',
          value: {
            id: 2001031,
            name: 'Золушка: Комическая пантомима на Рождество',
            alternativeName: 'Cinderella: A Comic Relief Pantomime for Christmas',
            rating: null,
            general: false,
            description: 'Cinderella',
            enProfession: 'actor'
          }
        }
      }
    },
    {
      id: 910085,
      name: 'Новые мутанты',
      image:
        'https://image.openmoviedb.com/kinopoisk-images/4303601/638f98db-5933-4893-a5ee-63f48ed0c648/orig',
      genres: [{ name: 'фантастика' }, { name: 'боевик' }, { name: 'детектив' }, { name: 'ужасы' }],
      year: 2020,
      rating: { kp: 5.6, imdb: 5.3 },
      description: {
        _custom: {
          type: 'reactive',
          stateTypeName: 'Reactive',
          value: {
            id: 910085,
            name: 'Новые мутанты',
            alternativeName: 'The New Mutants',
            rating: 5.601,
            general: false,
            description: 'Illyana Rasputin',
            enProfession: 'actor'
          }
        }
      }
    },
    {
      id: 1253633,
      name: 'Ход королевы',
      image:
        'https://image.openmoviedb.com/kinopoisk-images/1777765/c657ae89-e600-42a9-983f-6f4ee685b5b3/orig',
      genres: [{ name: 'драма' }, { name: 'спорт' }],
      year: 2020,
      rating: { kp: 8.279, imdb: 8.5 },
      description: {
        _custom: {
          type: 'reactive',
          stateTypeName: 'Reactive',
          value: {
            id: 1253633,
            name: 'Ход королевы',
            alternativeName: "The Queen's Gambit",
            rating: 8.281,
            general: false,
            description: 'Beth Harmon',
            enProfession: 'actor'
          }
        }
      }
    },
    {
      id: 940083,
      name: 'Playmobil фильм: Через вселенные',
      image:
        'https://image.openmoviedb.com/kinopoisk-images/1898899/4caac291-7269-45be-8a82-110f73fdd5c6/orig',
      genres: [
        { name: 'мультфильм' },
        { name: 'мюзикл' },
        { name: 'фэнтези' },
        { name: 'комедия' },
        { name: 'приключения' },
        { name: 'семейный' }
      ],
      year: 2019,
      rating: { kp: 6.905, imdb: 4.9 },
      description: {
        _custom: {
          type: 'reactive',
          stateTypeName: 'Reactive',
          value: {
            id: 940083,
            name: 'Playmobil фильм: Через вселенные',
            alternativeName: 'Playmobil: The Movie',
            rating: 6.886,
            general: false,
            description: 'Marla Brenner',
            enProfession: 'actor'
          }
        }
      }
    },
    {
      id: 1045245,
      name: 'Опасный элемент',
      image:
        'https://image.openmoviedb.com/kinopoisk-images/4774061/790a5387-6783-4e5e-b703-e5db3db0b80d/orig',
      genres: [{ name: 'биография' }, { name: 'драма' }, { name: 'мелодрама' }],
      year: 2019,
      rating: { kp: 7.208, imdb: 6.3 },
      description: {
        _custom: {
          type: 'reactive',
          stateTypeName: 'Reactive',
          value: {
            id: 1045245,
            name: 'Опасный элемент',
            alternativeName: 'Radioactive',
            rating: 7.209,
            general: false,
            description: 'Irène Aged 18',
            enProfession: 'actor'
          }
        }
      }
    },
    {
      id: 1289390,
      name: 'Hozier: Dinner & Diatribes',
      image: null,
      genres: [{ name: 'короткометражка' }, { name: 'ужасы' }, { name: 'музыка' }],
      year: 2019,
      rating: { kp: 7.55, imdb: 7.9 },
      description: {
        _custom: {
          type: 'reactive',
          stateTypeName: 'Reactive',
          value: {
            id: 1289390,
            name: null,
            alternativeName: 'Hozier: Dinner & Diatribes',
            rating: 7.519,
            general: false,
            description: 'Wife',
            enProfession: 'actor'
          }
        }
      }
    },
    {
      id: 1178956,
      name: 'Дублинские дебоширы',
      image:
        'https://image.openmoviedb.com/kinopoisk-images/4774061/c38031ff-76a0-4930-ba81-20a61c62079c/orig',
      genres: [{ name: 'драма' }],
      year: 2019,
      rating: { kp: 5.209, imdb: 4.7 },
      description: {
        _custom: {
          type: 'reactive',
          stateTypeName: 'Reactive',
          value: {
            id: 1178956,
            name: 'Дублинские дебоширы',
            alternativeName: 'Here Are the Young Men',
            rating: 5.21,
            general: false,
            description: 'Jen',
            enProfession: 'actor'
          }
        }
      }
    },
    {
      id: 1055374,
      name: 'Crossmaglen',
      image:
        'https://image.openmoviedb.com/kinopoisk-images/1900788/541235af-cf2f-474c-90cd-a3ca8e3f9e4b/orig',
      genres: [{ name: 'короткометражка' }],
      year: 2018,
      rating: { kp: 0, imdb: 6.1 },
      description: {
        _custom: {
          type: 'reactive',
          stateTypeName: 'Reactive',
          value: {
            id: 1055374,
            name: null,
            alternativeName: 'Crossmaglen',
            rating: null,
            general: false,
            description: 'Ana',
            enProfession: 'actor'
          }
        }
      }
    },
    {
      id: 992500,
      name: 'Обитель теней',
      image:
        'https://image.openmoviedb.com/kinopoisk-images/1599028/87753e26-5f31-4fad-be34-2522840420f0/orig',
      genres: [{ name: 'ужасы' }, { name: 'драма' }],
      year: 2017,
      rating: { kp: 7.077, imdb: 6.7 },
      description: {
        _custom: {
          type: 'reactive',
          stateTypeName: 'Reactive',
          value: {
            id: 992500,
            name: 'Обитель теней',
            alternativeName: 'Marrowbone',
            rating: 7.073,
            general: false,
            description: 'Allie',
            enProfession: 'actor'
          }
        }
      }
    },
    {
      id: 1363698,
      name: 'The Making of «Split»',
      image: null,
      genres: [{ name: 'документальный' }, { name: 'короткометражка' }],
      year: 2017,
      rating: { kp: 0, imdb: 6 },
      description: {
        _custom: {
          type: 'reactive',
          stateTypeName: 'Reactive',
          value: {
            id: 1363698,
            name: null,
            alternativeName: 'The Making of «Split»',
            rating: null,
            general: false,
            description: 'Self',
            enProfession: 'actor'
          }
        }
      }
    },
    {
      id: 1002874,
      name: 'GTA Feat. Sam Bruno: Red Lips (Skrillex Remix)',
      image:
        'https://image.openmoviedb.com/kinopoisk-images/10671298/72d39997-b5bf-41c1-ab7c-f9aa56d203cb/orig',
      genres: [{ name: 'музыка' }],
      year: 2015,
      rating: { kp: 6.735, imdb: 7.3 },
      description: {
        _custom: {
          type: 'reactive',
          stateTypeName: 'Reactive',
          value: {
            id: 1002874,
            name: null,
            alternativeName: 'GTA Feat. Sam Bruno: Red Lips (Skrillex Remix)',
            rating: 6.733,
            general: false,
            description: null,
            enProfession: 'actor'
          }
        }
      }
    },
    {
      id: 865203,
      name: 'Приключения викингов',
      image:
        'https://image.openmoviedb.com/kinopoisk-images/1946459/567a70b1-65fe-4b90-bb61-b82446d4df7b/orig',
      genres: [{ name: 'фэнтези' }, { name: 'боевик' }, { name: 'приключения' }],
      year: 2015,
      rating: { kp: 4.256, imdb: 3.8 },
      description: {
        _custom: {
          type: 'reactive',
          stateTypeName: 'Reactive',
          value: {
            id: 865203,
            name: 'Приключения викингов',
            alternativeName: 'Viking Quest',
            rating: 4.256,
            general: false,
            description: 'Mani',
            enProfession: 'actor'
          }
        }
      }
    },
    {
      id: 794531,
      name: 'Атлантида',
      image:
        'https://image.openmoviedb.com/kinopoisk-images/1599028/a9f4fcb3-7df3-4c0b-ab0e-9d965d95c0ac/orig',
      genres: [
        { name: 'фэнтези' },
        { name: 'драма' },
        { name: 'мелодрама' },
        { name: 'приключения' }
      ],
      year: 2013,
      rating: { kp: 6.59, imdb: 6.5 },
      description: {
        _custom: {
          type: 'reactive',
          stateTypeName: 'Reactive',
          value: {
            id: 794531,
            name: 'Атлантида',
            alternativeName: 'Atlantis',
            rating: 6.589,
            general: false,
            description: 'Cassandra',
            enProfession: 'actor'
          }
        }
      }
    },
    {
      id: 747494,
      name: 'Молодой Морс',
      image:
        'https://image.openmoviedb.com/kinopoisk-images/4774061/2637fda4-1841-480f-ac80-4dd8ed6f84e7/orig',
      genres: [{ name: 'драма' }, { name: 'криминал' }, { name: 'детектив' }],
      year: 2012,
      rating: { kp: 8.283, imdb: 8.6 },
      description: {
        _custom: {
          type: 'reactive',
          stateTypeName: 'Reactive',
          value: {
            id: 747494,
            name: 'Молодой Морс',
            alternativeName: 'Endeavour',
            rating: 8.287,
            general: false,
            description: 'Philippa Collins-Davidson',
            enProfession: 'actor'
          }
        }
      }
    },
    {
      id: 4294079,
      name: 'Laughter in the Dark',
      image: null,
      genres: [{ name: 'триллер' }, { name: 'драма' }],
      year: null,
      rating: { kp: 0, imdb: 0 },
      description: {
        _custom: {
          type: 'reactive',
          stateTypeName: 'Reactive',
          value: {
            id: 4294079,
            name: null,
            alternativeName: 'Laughter in the Dark',
            rating: null,
            general: false,
            description: null,
            enProfession: 'actor'
          }
        }
      }
    },
    {
      id: 5098653,
      name: 'The Gorge',
      image: null,
      genres: [
        { name: 'ужасы' },
        { name: 'фантастика' },
        { name: 'боевик' },
        { name: 'мелодрама' }
      ],
      year: null,
      rating: { kp: 0, imdb: 0 },
      description: {
        _custom: {
          type: 'reactive',
          stateTypeName: 'Reactive',
          value: {
            id: 5098653,
            name: null,
            alternativeName: 'The Gorge',
            rating: null,
            general: false,
            description: null,
            enProfession: 'actor'
          }
        }
      }
    }
  ]
})

const props = defineProps({
  movies: Array
})

var getFilms = async () => {
  let response = await axios(
    `https://api.kinopoisk.dev/v1.4/movie?page=1&limit=20&${actorRoles.data.map((el) => `&id=${el.id}`).join('')}`,
    options
  )

  films.data = [
    ...films.data,
    ...response.data.docs.map(
      (element) =>
        (element = {
          id: element.id,
          name: element.name || element.alternativeName,
          image: element.poster.url,
          genres: [...element.genres],
          year: element.year,
          rating: {
            kp: element.rating.kp,
            imdb: element.rating.imdb
          },
          description: actorRoles?.data?.find((el) => el.id === element.id).description
        })
    )
  ]
}

onMounted(() => {
  actorRoles.data = props.movies.filter((el) => el.enProfession === 'actor')

  //getFilms()
})
</script>

<style scoped></style>
