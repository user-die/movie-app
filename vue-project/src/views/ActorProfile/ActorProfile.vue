<template>
  <article class="text-white container mainBg p-4">
    <div class="row gap-2">
      <img :src="actor.data?.photo || ''" alt="" class="rounded-5" style="width: 300px" />

      <About :actor="actor?.data" class="col-12 col-sm-12 col-md-7 col-lg-7 col-xl-8 col-xxl-9" />
    </div>

    <article class="d-flex flex-column gap-4 mx-4">
      <Roles :movies="actor?.data?.movies?.sort((a, b) => b.rating - a.rating)" />

      <Awards :awards="winnings.data" text="Награды" />

      <Awards :awards="nominations.data" text="Номинации" />

      <Facts :facts="actor.data?.facts" />
    </article>
  </article>
</template>

<script setup>
import axios from 'axios'
import { onMounted, reactive, watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import options from '../../options.json'
import About from './components/About.vue'
import Roles from './components/Roles.vue'
import Facts from './components/Facts.vue'
import Awards from './components/Awards.vue'

const route = useRoute()
var id = ref(route.params.id)

var actor = reactive({
  data: {
    id: 3360189,
    name: 'Аня Тейлор-Джой',
    enName: 'Anya Taylor-Joy',
    photo:
      'https://avatars.mds.yandex.net/get-kinopoisk-image/1946459/ad7259d5-23df-45f8-b460-b3c9c166ebd1/orig',
    sex: 'Женский',
    growth: 173,
    birthday: '1996-04-16T00:00:00.000Z',
    death: null,
    age: 28,
    birthPlace: [{ value: 'Майами' }, { value: 'Флорида' }, { value: 'США' }],
    deathPlace: [],
    spouses: [{ id: 1578100, name: null, divorced: false, children: 0, relation: 'супруг' }],
    countAwards: 1,
    profession: [],
    facts: [
      { value: 'Полное имя — Аня Джозефин Мари Тейлор-Джой (Anya Josephine Marie Taylor-Joy).' },
      {
        value:
          'Мать Ани — англичанка южноафриканского и испанского происхождения, отец — шотландский аргентинец.'
      },
      { value: 'В детстве занималась балетом.' },
      {
        value:
          'Была исключена из окончательного монтажа своей первой актерской роли в комедии ужасов 2014 года &#171;<a href="/film/535429/" class="all">Академия вампиров</a>&#187;, и ее роль осталась без упоминания в титрах.'
      },
      { value: 'Аня – билингв, она свободно говорит на английском и испанском языках.' }
    ],
    movies: [
      {
        id: 1234825,
        name: 'С любовью, Антоша',
        alternativeName: 'Love, Antosha',
        rating: 8.405,
        general: false,
        description: null,
        enProfession: 'cameo'
      },
      {
        id: 716587,
        name: 'Острые козырьки',
        alternativeName: 'Peaky Blinders',
        rating: 8.359,
        general: false,
        description: 'Gina Gray',
        enProfession: 'actor'
      },
      {
        id: 400753,
        name: 'Saturday Night Live',
        alternativeName: 'Saturday Night Live',
        rating: 8.342,
        general: false,
        description: null,
        enProfession: 'cameo'
      },
      {
        id: 4540126,
        name: 'Дюна: Часть вторая',
        alternativeName: 'Dune: Part Two',
        rating: 8.328,
        general: false,
        description: 'Alia Atreides',
        enProfession: 'uncredited'
      },
      {
        id: 397353,
        name: 'Шоу Грэма Нортона',
        alternativeName: 'The Graham Norton Show',
        rating: 8.323,
        general: false,
        description: null,
        enProfession: 'cameo'
      },
      {
        id: 747494,
        name: 'Молодой Морс',
        alternativeName: 'Endeavour',
        rating: 8.287,
        general: false,
        description: 'Philippa Collins-Davidson',
        enProfession: 'actor'
      },
      {
        id: 1253633,
        name: 'Ход королевы',
        alternativeName: "The Queen's Gambit",
        rating: 8.281,
        general: false,
        description: 'Beth Harmon',
        enProfession: 'actor'
      },
      {
        id: 445866,
        name: 'Эллен: Шоу Эллен ДеДженерес',
        alternativeName: 'Ellen: The Ellen DeGeneres Show',
        rating: 8.132,
        general: false,
        description: null,
        enProfession: 'cameo'
      },
      {
        id: 820516,
        name: 'Ночное шоу с Джимми Фэллоном',
        alternativeName: 'The Tonight Show Starring Jimmy Fallon',
        rating: 7.892,
        general: false,
        description: null,
        enProfession: 'cameo'
      },
      {
        id: 1045246,
        name: 'Тёмный кристалл: Эпоха сопротивления',
        alternativeName: 'The Dark Crystal: Age of Resistance',
        rating: 7.648,
        general: false,
        description: 'Brea',
        enProfession: 'actor'
      },
      {
        id: 666732,
        name: 'Сделано в Голливуде',
        alternativeName: 'Made in Hollywood',
        rating: 7.563,
        general: false,
        description: null,
        enProfession: 'cameo'
      },
      {
        id: 5458837,
        name: '96-я церемония вручения премии «Оскар»',
        alternativeName: '96th Academy Awards',
        rating: 7.545,
        general: false,
        description: null,
        enProfession: 'cameo'
      },
      {
        id: 1289390,
        name: null,
        alternativeName: 'Hozier: Dinner & Diatribes',
        rating: 7.519,
        general: false,
        description: 'Wife',
        enProfession: 'actor'
      },
      {
        id: 1388409,
        name: 'Фуриоса: Хроники Безумного Макса',
        alternativeName: 'Furiosa: A Mad Max Saga',
        rating: 7.469,
        general: false,
        description: 'Furiosa',
        enProfession: 'actor'
      },
      {
        id: 565742,
        name: 'Конан',
        alternativeName: 'Conan',
        rating: 7.393,
        general: false,
        description: null,
        enProfession: 'cameo'
      },
      {
        id: 1045245,
        name: 'Опасный элемент',
        alternativeName: 'Radioactive',
        rating: 7.209,
        general: false,
        description: 'Irène Aged 18',
        enProfession: 'actor'
      },
      {
        id: 469190,
        name: 'В прямом эфире с Риджесом и Кэти Ли',
        alternativeName: 'Live with Regis and Kathie Lee',
        rating: 7.164,
        general: false,
        description: null,
        enProfession: 'cameo'
      },
      {
        id: 587593,
        name: 'Развлечения сегодня вечером',
        alternativeName: 'Entertainment Tonight',
        rating: 7.15,
        general: false,
        description: null,
        enProfession: 'cameo'
      },
      {
        id: 891588,
        name: 'Очень позднее шоу с Джеймсом Корденом',
        alternativeName: 'The Late Late Show with James Corden',
        rating: 7.103,
        general: false,
        description: null,
        enProfession: 'cameo'
      },
      {
        id: 992500,
        name: 'Обитель теней',
        alternativeName: 'Marrowbone',
        rating: 7.073,
        general: false,
        description: 'Allie',
        enProfession: 'actor'
      },
      {
        id: 930534,
        name: 'Сплит',
        alternativeName: 'Split',
        rating: 7.023,
        general: false,
        description: 'Casey Cooke',
        enProfession: 'actor'
      },
      {
        id: 1111005,
        name: 'Братья Супер Марио в кино',
        alternativeName: 'The Super Mario Bros. Movie',
        rating: 6.997,
        general: false,
        description: 'Princess Peach',
        enProfession: 'actor'
      },
      {
        id: 1244402,
        name: 'Эмма.',
        alternativeName: 'Emma.',
        rating: 6.948,
        general: false,
        description: 'Emma Woodhouse',
        enProfession: 'actor'
      },
      {
        id: 940083,
        name: 'Playmobil фильм: Через вселенные',
        alternativeName: 'Playmobil: The Movie',
        rating: 6.886,
        general: false,
        description: 'Marla Brenner',
        enProfession: 'actor'
      },
      {
        id: 1236583,
        name: 'Прошлой ночью в Сохо',
        alternativeName: 'Last Night in Soho',
        rating: 6.862,
        general: false,
        description: 'Sandie',
        enProfession: 'actor'
      },
      {
        id: 594789,
        name: 'Доброе утро, Америка',
        alternativeName: 'Good Morning America',
        rating: 6.783,
        general: false,
        description: null,
        enProfession: 'cameo'
      },
      {
        id: 445917,
        name: 'Три кинотеатра',
        alternativeName: 'Cinema 3',
        rating: 6.782,
        general: false,
        description: null,
        enProfession: 'cameo'
      },
      {
        id: 1313198,
        name: 'Варяг',
        alternativeName: 'The Northman',
        rating: 6.737,
        general: false,
        description: 'Olga of the Birch Forest',
        enProfession: 'actor'
      },
      {
        id: 1002874,
        name: null,
        alternativeName: 'GTA Feat. Sam Bruno: Red Lips (Skrillex Remix)',
        rating: 6.733,
        general: false,
        description: null,
        enProfession: 'actor'
      },
      {
        id: 1257264,
        name: 'Меню',
        alternativeName: 'The Menu',
        rating: 6.721,
        general: false,
        description: 'Margot',
        enProfession: 'actor'
      },
      {
        id: 1045336,
        name: 'Миниатюрист',
        alternativeName: 'The Miniaturist',
        rating: 6.699,
        general: false,
        description: 'Petronella Brandt',
        enProfession: 'actor'
      },
      {
        id: 865302,
        name: 'Ведьма',
        alternativeName: 'The VVitch: A New-England Folktale',
        rating: 6.618,
        general: false,
        description: 'Thomasin',
        enProfession: 'actor'
      },
      {
        id: 794531,
        name: 'Атлантида',
        alternativeName: 'Atlantis',
        rating: 6.589,
        general: false,
        description: 'Cassandra',
        enProfession: 'actor'
      },
      {
        id: 1044601,
        name: 'Стекло',
        alternativeName: 'Glass',
        rating: 6.581,
        general: false,
        description: 'Casey Cooke',
        enProfession: 'actor'
      },
      {
        id: 891560,
        name: 'Позднее шоу со Стивеном Колбером',
        alternativeName: 'The Late Show with Stephen Colbert',
        rating: 6.352,
        general: false,
        description: null,
        enProfession: 'cameo'
      },
      {
        id: 703018,
        name: 'Экстра',
        alternativeName: 'Extra',
        rating: 6.315,
        general: false,
        description: null,
        enProfession: 'cameo'
      },
      {
        id: 601776,
        name: 'Шоу «Один»',
        alternativeName: 'The One Show',
        rating: 6.177,
        general: false,
        description: null,
        enProfession: 'cameo'
      },
      {
        id: 1346594,
        name: 'Амстердам',
        alternativeName: 'Amsterdam',
        rating: 6.122,
        general: false,
        description: 'Libby Voze',
        enProfession: 'actor'
      },
      {
        id: 975388,
        name: 'Чистокровные',
        alternativeName: 'Thoroughbreds',
        rating: 6.037,
        general: false,
        description: 'Lily',
        enProfession: 'actor'
      },
      {
        id: 837100,
        name: 'Поздней ночью с Сетом Майерсом',
        alternativeName: 'Late Night with Seth Meyers',
        rating: 6.002,
        general: false,
        description: null,
        enProfession: 'cameo'
      },
      {
        id: 968563,
        name: 'Барри',
        alternativeName: 'Barry',
        rating: 5.894,
        general: false,
        description: 'Charlotte',
        enProfession: 'actor'
      },
      {
        id: 535429,
        name: 'Академия вампиров',
        alternativeName: 'Vampire Academy',
        rating: 5.846,
        general: false,
        description: 'Feeder Girl',
        enProfession: 'uncredited'
      },
      {
        id: 679725,
        name: 'Последний звонок с Карсоном Дэйли',
        alternativeName: 'Last Call with Carson Daly',
        rating: 5.839,
        general: false,
        description: null,
        enProfession: 'cameo'
      },
      {
        id: 906340,
        name: 'Морган',
        alternativeName: 'Morgan',
        rating: 5.787,
        general: false,
        description: 'Morgan',
        enProfession: 'actor'
      },
      {
        id: 910085,
        name: 'Новые мутанты',
        alternativeName: 'The New Mutants',
        rating: 5.601,
        general: false,
        description: 'Illyana Rasputin',
        enProfession: 'actor'
      },
      {
        id: 564847,
        name: 'Дни кино',
        alternativeName: 'Días de cine',
        rating: 5.562,
        general: false,
        description: null,
        enProfession: 'cameo'
      },
      {
        id: 842906,
        name: 'Доступ в Голливуд',
        alternativeName: 'Access Hollywood',
        rating: 5.36,
        general: false,
        description: null,
        enProfession: 'cameo'
      },
      {
        id: 1178956,
        name: 'Дублинские дебоширы',
        alternativeName: 'Here Are the Young Men',
        rating: 5.21,
        general: false,
        description: 'Jen',
        enProfession: 'actor'
      },
      {
        id: 865203,
        name: 'Приключения викингов',
        alternativeName: 'Viking Quest',
        rating: 4.256,
        general: false,
        description: 'Mani',
        enProfession: 'actor'
      },
      {
        id: 5629198,
        name: null,
        alternativeName: 'Sacrifice',
        rating: null,
        general: false,
        description: 'Joan',
        enProfession: 'actor'
      },
      {
        id: 4294079,
        name: null,
        alternativeName: 'Laughter in the Dark',
        rating: null,
        general: false,
        description: null,
        enProfession: 'actor'
      },
      {
        id: 5098653,
        name: null,
        alternativeName: 'The Gorge',
        rating: null,
        general: false,
        description: null,
        enProfession: 'actor'
      },
      {
        id: 4929549,
        name: null,
        alternativeName: 'Anya Taylor-Joy: Downtown (Downtempo)',
        rating: null,
        general: false,
        description: null,
        enProfession: 'actor'
      },
      {
        id: 2001031,
        name: 'Золушка: Комическая пантомима на Рождество',
        alternativeName: 'Cinderella: A Comic Relief Pantomime for Christmas',
        rating: null,
        general: false,
        description: 'Cinderella',
        enProfession: 'actor'
      },
      {
        id: 1055374,
        name: null,
        alternativeName: 'Crossmaglen',
        rating: null,
        general: false,
        description: 'Ana',
        enProfession: 'actor'
      },
      {
        id: 1363698,
        name: null,
        alternativeName: 'The Making of «Split»',
        rating: null,
        general: false,
        description: 'Self',
        enProfession: 'actor'
      },
      {
        id: 5629198,
        name: null,
        alternativeName: 'Sacrifice',
        rating: null,
        general: false,
        description: null,
        enProfession: 'producer'
      },
      {
        id: 4540969,
        name: 'Животрепещущие вопросы',
        alternativeName: 'Burning Questions',
        rating: null,
        general: false,
        description: null,
        enProfession: 'cameo'
      },
      {
        id: 4409948,
        name: '73-я церемония вручения прайм-тайм премии «Эмми»',
        alternativeName: 'The 73rd Primetime Emmy Awards',
        rating: null,
        general: false,
        description: null,
        enProfession: 'cameo'
      },
      {
        id: 4380101,
        name: '78-я церемония вручения премии «Золотой глобус»',
        alternativeName: '2021 Golden Globe Awards',
        rating: null,
        general: false,
        description: null,
        enProfession: 'cameo'
      },
      {
        id: 4648899,
        name: 'IMDb on the Scene — Interviews',
        alternativeName: null,
        rating: null,
        general: false,
        description: null,
        enProfession: 'cameo'
      },
      {
        id: 4411043,
        name: null,
        alternativeName: 'IMDb Originals',
        rating: null,
        general: false,
        description: null,
        enProfession: 'cameo'
      },
      {
        id: 1112141,
        name: null,
        alternativeName: 'Ok! TV',
        rating: null,
        general: false,
        description: null,
        enProfession: 'cameo'
      },
      {
        id: 734195,
        name: null,
        alternativeName: 'Hollywood on Set',
        rating: null,
        general: false,
        description: null,
        enProfession: 'cameo'
      },
      {
        id: 805005,
        name: 'Лоррэйн',
        alternativeName: 'Lorraine',
        rating: null,
        general: false,
        description: null,
        enProfession: 'cameo'
      },
      {
        id: 1261627,
        name: 'Утренние новости WGN',
        alternativeName: 'WGN Morning News',
        rating: null,
        general: false,
        description: null,
        enProfession: 'cameo'
      }
    ],
    createdAt: '2024-04-13T02:47:35.566Z',
    updatedAt: '2024-06-04T03:31:54.289Z'
  }
})

var awards = reactive({
  data: [
    {
      nomination: {
        award: { title: 'Британская академия', year: 2017 },
        title: 'Восходящая звезда'
      },
      winning: false,
      personId: 3360189,
      movie: null,
      createdAt: '2024-04-13T02:47:35.619Z',
      updatedAt: '2024-04-13T02:47:35.619Z',
      id: '6619f2475421889f6f53e241'
    },
    {
      nomination: {
        award: { title: 'Эмми', year: 2021 },
        title: 'Лучшая женская роль в мини-сериале или телефильме'
      },
      winning: false,
      personId: 3360189,
      movie: { id: 1253633, name: 'Ход королевы', rating: 8.281 },
      createdAt: '2024-04-13T02:47:35.616Z',
      updatedAt: '2024-04-13T02:47:35.616Z',
      id: '6619f2475421889f6f53e23f'
    },
    {
      nomination: {
        award: { title: 'Премия канала «MTV»', year: 2021 },
        title: 'Лучший актер или актриса в ТВ-шоу'
      },
      winning: false,
      personId: 3360189,
      movie: { id: 1253633, name: 'Ход королевы', rating: 8.281 },
      createdAt: '2024-04-13T02:47:35.613Z',
      updatedAt: '2024-04-13T02:47:35.613Z',
      id: '6619f2475421889f6f53e23d'
    },
    {
      nomination: {
        award: { title: 'Премия Гильдии актеров', year: 2021 },
        title: 'Лучшая женская роль в телефильме или минисериале'
      },
      winning: true,
      personId: 3360189,
      movie: { id: 1253633, name: 'Ход королевы', rating: 8.281 },
      createdAt: '2024-04-13T02:47:35.609Z',
      updatedAt: '2024-04-13T02:47:35.609Z',
      id: '6619f2475421889f6f53e23b'
    },
    {
      nomination: { award: { title: 'Сатурн', year: 2017 }, title: 'Лучший молодой актер/актриса' },
      winning: false,
      personId: 3360189,
      movie: { id: 865302, name: 'Ведьма', rating: 6.614 },
      createdAt: '2024-04-13T02:47:35.605Z',
      updatedAt: '2024-04-13T02:47:35.605Z',
      id: '6619f2475421889f6f53e239'
    },
    {
      nomination: { award: { title: 'Сатурн', year: 2024 }, title: 'Лучшая актриса' },
      winning: false,
      personId: 3360189,
      movie: { id: 1257264, name: 'Меню', rating: 6.719 },
      createdAt: '2024-04-13T02:47:35.600Z',
      updatedAt: '2024-04-13T02:47:35.600Z',
      id: '6619f2475421889f6f53e237'
    },
    {
      nomination: {
        award: { title: 'Каннский кинофестиваль', year: 2017 },
        title: 'Приз компании «Шопар» лучшей молодой актрисе'
      },
      winning: true,
      personId: 3360189,
      movie: null,
      createdAt: '2024-04-13T02:47:35.596Z',
      updatedAt: '2024-04-13T02:47:35.596Z',
      id: '6619f2475421889f6f53e235'
    },
    {
      nomination: {
        award: { title: 'Золотой глобус', year: 2021 },
        title: 'Лучшая женская роль (комедия или мюзикл)'
      },
      winning: false,
      personId: 3360189,
      movie: { id: 1244402, name: 'Эмма.', rating: 6.947 },
      createdAt: '2024-04-13T02:47:35.593Z',
      updatedAt: '2024-04-13T02:47:35.593Z',
      id: '6619f2475421889f6f53e233'
    },
    {
      nomination: {
        award: { title: 'Золотой глобус', year: 2021 },
        title: 'Лучшая актриса мини-сериала или фильма на ТВ'
      },
      winning: true,
      personId: 3360189,
      movie: { id: 1253633, name: 'Ход королевы', rating: 8.281 },
      createdAt: '2024-04-13T02:47:35.588Z',
      updatedAt: '2024-04-13T02:47:35.588Z',
      id: '6619f2475421889f6f53e231'
    },
    {
      nomination: {
        award: { title: 'Золотой глобус', year: 2023 },
        title: 'Лучшая женская роль (комедия или мюзикл)'
      },
      winning: false,
      personId: 3360189,
      movie: { id: 1257264, name: 'Меню', rating: 6.719 },
      createdAt: '2024-04-13T02:47:35.584Z',
      updatedAt: '2024-04-13T02:47:35.584Z',
      id: '6619f2475421889f6f53e22f'
    },
    {
      nomination: {
        award: { title: 'Британская академия', year: 2017 },
        title: 'Восходящая звезда'
      },
      winning: false,
      personId: 3360189,
      movie: null,
      createdAt: '2024-03-15T10:51:01.224Z',
      updatedAt: '2024-03-15T10:51:01.224Z',
      id: '65f428159b5b0a37ccb82400'
    },
    {
      nomination: {
        award: { title: 'Эмми', year: 2021 },
        title: 'Лучшая женская роль в мини-сериале или телефильме'
      },
      winning: false,
      personId: 3360189,
      movie: { id: 1253633, name: 'Ход королевы', rating: 8.283 },
      createdAt: '2024-03-15T10:51:01.222Z',
      updatedAt: '2024-03-15T10:51:01.222Z',
      id: '65f428159b5b0a37ccb823fe'
    },
    {
      nomination: {
        award: { title: 'Премия канала «MTV»', year: 2021 },
        title: 'Лучший актер или актриса в ТВ-шоу'
      },
      winning: false,
      personId: 3360189,
      movie: { id: 1253633, name: 'Ход королевы', rating: 8.283 },
      createdAt: '2024-03-15T10:51:01.220Z',
      updatedAt: '2024-03-15T10:51:01.220Z',
      id: '65f428159b5b0a37ccb823fc'
    },
    {
      nomination: {
        award: { title: 'Премия Гильдии актеров', year: 2021 },
        title: 'Лучшая женская роль в телефильме или минисериале'
      },
      winning: true,
      personId: 3360189,
      movie: { id: 1253633, name: 'Ход королевы', rating: 8.283 },
      createdAt: '2024-03-15T10:51:01.218Z',
      updatedAt: '2024-03-15T10:51:01.218Z',
      id: '65f428159b5b0a37ccb823fa'
    },
    {
      nomination: { award: { title: 'Сатурн', year: 2017 }, title: 'Лучший молодой актер/актриса' },
      winning: false,
      personId: 3360189,
      movie: { id: 865302, name: 'Ведьма', rating: 6.611 },
      createdAt: '2024-03-15T10:51:01.215Z',
      updatedAt: '2024-03-15T10:51:01.215Z',
      id: '65f428159b5b0a37ccb823f8'
    },
    {
      nomination: { award: { title: 'Сатурн', year: 2024 }, title: 'Лучшая актриса' },
      winning: false,
      personId: 3360189,
      movie: { id: 1257264, name: 'Меню', rating: 6.72 },
      createdAt: '2024-03-15T10:51:01.212Z',
      updatedAt: '2024-03-15T10:51:01.212Z',
      id: '65f428159b5b0a37ccb823f6'
    },
    {
      nomination: {
        award: { title: 'Каннский кинофестиваль', year: 2017 },
        title: 'Приз компании «Шопар» лучшей молодой актрисе'
      },
      winning: true,
      personId: 3360189,
      movie: null,
      createdAt: '2024-03-15T10:51:01.209Z',
      updatedAt: '2024-03-15T10:51:01.209Z',
      id: '65f428159b5b0a37ccb823f4'
    },
    {
      personId: 3360189,
      nomination: {
        award: { title: 'Золотой глобус', year: 2021 },
        title: 'Лучшая женская роль (комедия или мюзикл)'
      },
      movie: { id: 1244402, name: 'Эмма.', rating: 6.9 },
      winning: false,
      createdAt: '2023-03-05T18:59:47.006Z',
      updatedAt: '2023-03-05T18:59:47.006Z',
      id: '6404e6a3b645fd8a227949e3'
    },
    {
      personId: 3360189,
      nomination: {
        award: { title: 'Золотой глобус', year: 2023 },
        title: 'Лучшая женская роль (комедия или мюзикл)'
      },
      movie: { id: 1257264, name: 'Меню', rating: null },
      winning: false,
      createdAt: '2023-03-05T18:59:46.930Z',
      updatedAt: '2023-03-05T18:59:46.930Z',
      id: '6404e6a2b645fd8a227949cf'
    },
    {
      personId: 3360189,
      nomination: {
        award: { title: 'Золотой глобус', year: 2021 },
        title: 'Лучшая актриса мини-сериала или фильма на ТВ'
      },
      movie: { id: 1253633, name: 'Ход королевы', rating: 8.3 },
      winning: true,
      createdAt: '2023-03-05T18:59:46.853Z',
      updatedAt: '2023-03-05T18:59:46.853Z',
      id: '6404e6a2b645fd8a227949b9'
    }
  ]
})

var winnings = reactive({
  data: [
    {
      _custom: {
        type: 'reactive',
        stateTypeName: 'Reactive',
        value: {
          nomination: {
            award: { title: 'Премия Гильдии актеров', year: 2021 },
            title: 'Лучшая женская роль в телефильме или минисериале'
          },
          winning: true,
          personId: 3360189,
          movie: { id: 1253633, name: 'Ход королевы', rating: 8.281 },
          createdAt: '2024-04-13T02:47:35.609Z',
          updatedAt: '2024-04-13T02:47:35.609Z',
          id: '6619f2475421889f6f53e23b'
        }
      }
    },
    {
      _custom: {
        type: 'reactive',
        stateTypeName: 'Reactive',
        value: {
          nomination: {
            award: { title: 'Каннский кинофестиваль', year: 2017 },
            title: 'Приз компании «Шопар» лучшей молодой актрисе'
          },
          winning: true,
          personId: 3360189,
          movie: null,
          createdAt: '2024-04-13T02:47:35.596Z',
          updatedAt: '2024-04-13T02:47:35.596Z',
          id: '6619f2475421889f6f53e235'
        }
      }
    },
    {
      _custom: {
        type: 'reactive',
        stateTypeName: 'Reactive',
        value: {
          nomination: {
            award: { title: 'Золотой глобус', year: 2021 },
            title: 'Лучшая актриса мини-сериала или фильма на ТВ'
          },
          winning: true,
          personId: 3360189,
          movie: { id: 1253633, name: 'Ход королевы', rating: 8.281 },
          createdAt: '2024-04-13T02:47:35.588Z',
          updatedAt: '2024-04-13T02:47:35.588Z',
          id: '6619f2475421889f6f53e231'
        }
      }
    }
  ]
})

var nominations = reactive({
  data: []
})

var getActor = async (id) => {
  let response = await axios(`https://api.kinopoisk.dev/v1.4/person/${id}`, options)

  actor.data = response.data
}

var getAwards = async (id) => {
  let response = await axios(
    `https://api.kinopoisk.dev/v1.4/person/awards?page=1&limit=250&personId=${id}`,
    options
  )

  awards.data = response.data.docs
}

watch(awards, (newValue) => {
  winnings.data = newValue.data.filter(
    (el, index, arr) =>
      el.winning === true &&
      index ===
        arr.findIndex(
          (t) =>
            t.nomination.title === el.nomination.title &&
            t.nomination.award.title === el.nomination.award.title &&
            t.nomination.award.year === el.nomination.award.year
        )
  )

  nominations.data = newValue.data.filter(
    (el, index, arr) =>
      el.winning !== true &&
      index ===
        arr.findIndex(
          (t) =>
            t.nomination.title === el.nomination.title &&
            t.nomination.award.title === el.nomination.award.title &&
            t.nomination.award.year === el.nomination.award.year
        )
  )
})

watch(route, (newValue) => {
  id.value = newValue.params.id

  // getActor(newValue.params.id)
  //getAwards(newValue.params.id)
})

onMounted(() => {
  // getActor(id.value)
  //getAwards(id.value)
})
</script>

<style scoped></style>
