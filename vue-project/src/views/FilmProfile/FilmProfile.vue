<template>
  <div :style="backgroundStyles(film?.data?.backdrop?.url)">
    <article class="text-white container p-4 bg">
      <div>
        <About :film="film.data" />
      </div>

      <section v-if="film.data?.description" class="row my-4">
        <h2 class="text-danger fs-1 fw-bold">Описание</h2>
        <p class="fs-4">{{ film.data?.description }}</p>
      </section>

      <Staff :staff="actors.data" text="Актёры" />

      <Staff :staff="mainStaff.data" text="Над фильмом работали" />

      <Staff :staff="dubbingActors.data" text="Актёры дубляжа" />

      <Cadrs :id="id" />

      <OtherFilms
        v-if="film.data.sequelsAndPrequels"
        :films="film.data.sequelsAndPrequels"
        text="Другие части"
      />

      <OtherFilms
        v-if="film.data.similarMovies"
        :films="film.data.similarMovies"
        text="Похожие фильмы"
      />

      <Facts
        text="Интересные факты"
        :facts="film?.data?.facts?.filter((el) => el.type === 'FACT')"
      />

      <Facts
        text="Ошибки в фильме ( спойлеры ! )"
        :facts="film?.data?.facts?.filter((el) => el.type !== 'FACT')"
      />

      <!-- ТОП 250 ИЛИ ТОП 10 -->
    </article>
  </div>
</template>

<script setup>
import axios from 'axios'
import { onMounted, reactive, watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import options from '../../options.json'
import Staff from './components/Staff.vue'
import Cadrs from './components/Cadrs.vue'
import About from './components/About.vue'
import OtherFilms from './components/OtherFilms.vue'
import Facts from './components/Facts.vue'

const route = useRoute()
var id = ref(route.params.id)
var film = reactive({
  data: {
    status: null,
    externalId: { imdb: 'tt1853728', tmdb: 68718, kpHD: '4d757e043db71463a2014d864138a5ff' },
    rating: { kp: 8.24, imdb: 8.5, filmCritics: 8, russianFilmCritics: 88.2353, await: null },
    votes: { kp: 716097, imdb: 1710578, filmCritics: 299, russianFilmCritics: 34, await: 0 },
    backdrop: {
      url: 'https://image.openmoviedb.com/kinopoisk-ott-images/374297/2a0000016c65ca93df91c6b03e406ea2104e/orig',
      previewUrl:
        'https://image.openmoviedb.com/kinopoisk-ott-images/374297/2a0000016c65ca93df91c6b03e406ea2104e/x1000'
    },
    movieLength: 165,
    images: { postersCount: 61, backdropsCount: 18, framesCount: 42 },
    productionCompanies: [
      {
        name: 'The Weinstein Company',
        url: 'https://www.themoviedb.org/t/p/original/e8F3mQM7DkJ5SfYYDp8FYzPBOGX.png',
        previewUrl: 'https://www.themoviedb.org/t/p/w500/e8F3mQM7DkJ5SfYYDp8FYzPBOGX.png'
      },
      {
        name: 'Columbia Pictures',
        url: 'https://www.themoviedb.org/t/p/original/71BqEFAF4V3qjjMPCpLuyJFB9A.png',
        previewUrl: 'https://www.themoviedb.org/t/p/w500/71BqEFAF4V3qjjMPCpLuyJFB9A.png'
      }
    ],
    spokenLanguages: [
      { name: 'English', nameEn: 'English' },
      { name: 'Français', nameEn: 'French' },
      { name: 'Deutsch', nameEn: 'German' }
    ],
    id: 586397,
    type: 'movie',
    name: 'Джанго освобожденный',
    description:
      'Шульц — эксцентричный охотник за головами, который выслеживает и отстреливает самых опасных преступников. Он освобождает раба по имени Джанго, поскольку тот может помочь ему в поисках трёх бандитов. Джанго знает этих парней в лицо, ведь у него с ними свои счёты.',
    distributors: { distributor: 'WDSSPR', distributorRelease: 'Columbia/Sony' },
    premiere: {
      world: '2012-12-11T00:00:00.000Z',
      russia: '2013-01-17T00:00:00.000Z',
      bluray: '2013-05-28T00:00:00.000Z',
      dvd: '2013-05-28T00:00:00.000Z',
      cinema: null,
      digital: null
    },
    slogan: 'Они забрали его свободу. Он заберёт у них всё',
    year: 2012,
    budget: { value: 100000000, currency: '$' },
    poster: {
      url: 'https://image.openmoviedb.com/kinopoisk-images/1898899/401c67e4-5047-42c2-8668-aeda39da529f/orig',
      previewUrl:
        'https://image.openmoviedb.com/kinopoisk-images/1898899/401c67e4-5047-42c2-8668-aeda39da529f/x1000'
    },
    facts: [
      {
        value:
          '<a href="/name/513/" class="all">Уилл Смит</a>, <a href="/name/48134/" class="all">Идрис Эльба</a>, <a href="/name/6742/" class="all">Крис Такер</a>, <a href="/name/1656/" class="all">Терренс Ховард</a>, <a href="/name/25359/" class="all">Майкл К. Уильямс</a> и <a href="/name/30027/" class="all">Тайриз Гибсон</a> рассматривались на роль Джанго. <a href="/name/7640/" class="all">Квентин Тарантино</a> видел в этой роли Смита, и агенты Смита хотели, чтобы он принял эту роль, но в конечном итоге он отказался. После этого Тарантино предложил роль <a href="/name/514/" class="all">Джейми Фоксу</a>, и он согласился.',
        type: 'FACT',
        spoiler: false
      },
      {
        value:
          '<a href="/name/10374/" class="all">Зои Белл</a> рассматривалась на роль Лары Ли Кэнди-Фитцвилли.',
        type: 'FACT',
        spoiler: false
      },
      {
        value:
          'На роль Мистера Стоунсифера рассматривался <a href="/name/31933/" class="all">Сид Хэйг</a>, и даже впоследствии он был приглашен на кастинг, о чем было сообщено агенту актера. Первоначально режиссер согласился с кандидатурой Хэйга, но в последнюю минуту отменил два прослушивания актера. Режиссер известен своим специфическим юмором. Однако, эта «шутка» скорее всего имела место из-за отказа Сида Хэйга сниматься в роли Марселласа Уоллеса в «Криминальном чтиве» 17 лет назад. Спустя два месяца на роль Мистера Стоунсифера был приглашен актер <a href="/name/119128/" class="all">Дэвид Стин</a>.',
        type: 'FACT',
        spoiler: false
      },
      {
        value:
          '<a href="/name/7640/" class="all">Квентин Тарантино</a> специально написал роль для <a href="/name/25359/" class="all">Майкла К. Уильямса</a>, однако актер был вынужден отказаться от участия в фильме из-за съемок в сериале «<a href="/film/474779/" class="all">Подпольная империя</a>».',
        type: 'FACT',
        spoiler: false
      },
      {
        value:
          '<a href="/name/1669323/" class="all">Леди Гага</a> рассматривалась на роль Лары Ли Кэнди-Фитцвилли, которую в итоге получила <a href="/name/24144/" class="all">Лаура Кайот</a>.',
        type: 'FACT',
        spoiler: false
      },
      {
        value:
          'Съемки фильма начались 28 ноября 2011 года в местечке с идеальным для вестернов экстерьером: ранчо «Мелодия» в Санта Кларита, штат Калифорния. Когда-то этот западный городок принадлежал Джину Отри и часто выступал фоном классических фильмов и телевизионных сериалов, включая <a href="/film/524/" class="all">Дилижанс</a>; <a href="/film/401/" class="all">Ровно в полдень</a> и «<a href="/film/229988/" class="all">Дымок из ствола</a>».',
        type: 'FACT',
        spoiler: false
      },
      {
        value:
          'Салун, в который заходят Джанго и Кинг Шульц, называется &laquo;Минессота Клей&raquo; — в честь одного из ранних вестернов <a href="/name/170630/" class="all">Серджио Корбуччи</a>.',
        type: 'FACT',
        spoiler: false
      },
      {
        value:
          '<a href="/name/24087/" class="all">Кевин Костнер</a> мог сыграть в этом фильме, но покинул проект из-за несогласованности расписаний съемок.',
        type: 'FACT',
        spoiler: false
      },
      {
        value:
          'Первый художественный фильм <a href="/name/7640/" class="all">Квентина Тарантино</a>, монтажом которого не занималась <a href="/name/55970/" class="all">Салли Менке</a>, она скончалась в 2010 году.',
        type: 'FACT',
        spoiler: false
      },
      {
        value:
          'Хотя фильм технически принадлежит к западному жанру, <a href="/name/7640/" class="all">Квентин Тарантино</a> предпочитает говорить о фильме, как о &laquo;южном&raquo;, в связи с тем, что события фильма развиваются в южной части Америки.',
        type: 'FACT',
        spoiler: false
      },
      {
        value:
          'Во время съемок в Джексон Хоул, штат Вайоминг, режиссер <a href="/name/7640/" class="all">Квентин Тарантино</a> арендовал местный кинотеатр, чтобы показать самурайские фильмы и вестерны из своей личной коллекции.',
        type: 'FACT',
        spoiler: false
      },
      {
        value:
          '<a href="/name/9867/" class="all">Джозеф Гордон-Левитт</a> получил роль Жано, но вынужден был отказаться из-за несогласованности расписаний съемок с фильмом, в котором он дебютирует как режиссер.',
        type: 'FACT',
        spoiler: false
      },
      {
        value:
          'Во время съемок <a href="/name/514/" class="all">Джейми Фокс</a> использовал свою собственную лошадь по имени Чита.',
        type: 'FACT',
        spoiler: false
      },
      {
        value:
          'Это второй раз, когда <a href="/name/514/" class="all">Джейми Фокс</a> и <a href="/name/17932/" class="all">Керри Вашингтон</a> играли семейную пару. До этого они играли роли Рэя Чарльза и Деллы Би Робинсон в фильме &laquo;<a href="/film/5319/" class="all">Рэй</a>&raquo; (2004).',
        type: 'FACT',
        spoiler: false
      },
      {
        value:
          '<a href="/name/41294/" class="all">Саша Барон Коэн</a> был взят на роль Скотти, а <a href="/name/37652/" class="all">Курт Рассел</a> на роль Вуди, но оба покинули проект из-за несогласованности расписаний съемок.',
        type: 'FACT',
        spoiler: false
      },
      {
        value: 'Окончательный вариант сценария был утвержден 26 апреля 2011 года.',
        type: 'FACT',
        spoiler: false
      },
      {
        value:
          'Название и события фильма были основаны на спагетти-вестерне &laquo;<a href="/film/77394/" class="all">Джанго</a>&raquo; (1966). Актер <a href="/name/2984/" class="all">Франко Неро</a>, который играл Джанго в том фильме, получил небольшую роль в &laquo;Джанго освобожденный&raquo; (2012).',
        type: 'FACT',
        spoiler: false
      },
      {
        value:
          '<a href="/name/37859/" class="all">Леонардо ДиКаприо</a>, который играет в этом фильме злодея Кэлвина Кэнди, был первоначально выбран на роль антагониста Ганса Ланды в предыдущем фильме <a href="/name/7640/" class="all">Квентина Тарантино</a> &laquo;<a href="/film/9691/" class="all">Бесславные ублюдки</a>&raquo; (2009). Однако Тарантино решил отдать эту роль немецко-говорящему актеру, и роль отошла <a href="/name/245737/" class="all">Кристофу Вальцу</a>, который сыграл доктора Кинга Шульца в &laquo;Джанго освобожденный&raquo; (2012).',
        type: 'FACT',
        spoiler: false
      },
      {
        value:
          'Режиссер <a href="/name/7640/" class="all">Квентин Тарантино</a> рассказал на комик-коне, что персонажи <a href="/name/514/" class="all">Джейми Фокса</a> и <a href="/name/17932/" class="all">Керри Вашингтон</a> это прапрапрадедушка и прапрапрабабушка соответственно персонажа по имени Джон Шафт из фильма &laquo;<a href="/film/13673/" class="all">Шафт</a>&raquo; (1971). Это подтверждает и имя персонажа Керри Вашингтон — Брумгильда фон Шафт.',
        type: 'FACT',
        spoiler: false
      },
      {
        value:
          'Фильм был снят за 130 дней. Это были самые долгие съемки одного фильма <a href="/name/7640/" class="all">Квентина Тарантино</a>.',
        type: 'FACT',
        spoiler: false
      },
      {
        value:
          'Во время тренировок для своей роли <a href="/name/245737/" class="all">Кристоф Вальц</a> получил травму.',
        type: 'FACT',
        spoiler: false
      },
      {
        value:
          '<a href="/name/3131/" class="all">Расс Тэмблин</a>, персонажа, которого в этом фильме зовут &laquo;Сын стрелка&raquo;, снимался в фильме &laquo;<a href="/film/96349/" class="all">Сын стрелка</a>&raquo; (1965). Дочь Тэмблина — актриса <a href="/name/40001/" class="all">Эмбер Тэмблин</a> так же играет в фильме &laquo;Джанго освобожденный&raquo; (2012), ее персонажа зовут &laquo;Дочь сына стрелка&raquo;.',
        type: 'FACT',
        spoiler: false
      },
      {
        value:
          'Это первый фильм (не считая &laquo;<a href="/film/103572/" class="all">Грайндхаус</a>&raquo; (2007) и &laquo;<a href="/film/273064/" class="all">Доказательство смерти</a>&raquo; (2007)) режиссера <a href="/name/7640/" class="all">Квентина Тарантино</a>, который не был спродюсирован <a href="/name/26107/" class="all">Лоуренсом Бендером</a>.',
        type: 'FACT',
        spoiler: false
      },
      {
        value:
          'Впервые за 16 лет <a href="/name/37859/" class="all">Леонардо ДиКаприо</a> не на первом месте в списке актеров на афишах и постерах к фильму.',
        type: 'FACT',
        spoiler: false
      },
      {
        value:
          'Доктор Шульц (<a href="/name/245737/" class="all">Кристоф Вальц</a>) напоминает монсеньору Кэнди (<a href="/name/37859/" class="all">Леонардо ДиКаприо</a>), что его раб д\'Артаньян (<a href="/name/44303/" class="all">Ато Эссонда</a>) назван по имени героя романов <a href="/name/40422/" class="all">Александра Дюма</a>. Вальц и ДиКаприо оба снимались в адаптациях этих романов: Вальц играл кардинала Ришелье в фильме &laquo;<a href="/film/474752/" class="all">Мушкетеры</a>&raquo; (2011), а ДиКаприо играл короля Людовика XIV и его брата Филиппа в фильме &laquo;<a href="/film/6872/" class="all">Человек в железной маске</a>&raquo; (1998).',
        type: 'FACT',
        spoiler: false
      },
      {
        value:
          'Бойцы мандинго упоминаются в фильме как отсылка к фильму <a href="/name/152800/" class="all">Ричарда Флайшера</a> &laquo;<a href="/film/28727/" class="all">Мандинго</a>&raquo; (1975).',
        type: 'FACT',
        spoiler: false
      },
      {
        value:
          'Доктор Шульц называет Самсона &laquo;Черным Геркулесом&raquo;. Такое прозвище было у актера и боксера <a href="/name/65297/" class="all">Кена Нортона</a>, который снимался в фильме &laquo;<a href="/film/28727/" class="all">Мандинго</a>&raquo; (1975).',
        type: 'FACT',
        spoiler: false
      },
      {
        value:
          '<a href="/name/37859/" class="all">Леонардо ДиКаприо</a>, который впервые сыграл роль злодея, не очень нравилось, что его персонаж был таким ужасным и явно расистским. Однако <a href="/name/7640/" class="all">Квентин Тарантино</a> убедил его быть максимально зловещим.',
        type: 'FACT',
        spoiler: false
      },
      {
        value:
          'Кэлвин объясняет, что благодаря изучению френологии, он может найти три ямочки на черепе Бена, которые представляют собой покорность. Френология была неудачным этапом реальной психологии, когда на самом деле люди верили, что выпуклости в разных местах черепа отражали различные черты, такие как творчество, способности к спорту и другие.',
        type: 'FACT',
        spoiler: false
      },
      {
        value:
          'Синий костюм Джанго основан на знаменитой картине &laquo;Голубой мальчик&raquo;. Эта картина вдохновила <a href="/name/222466/" class="all">Фридриха Вильгельма Мурнау</a> на создание фильма &laquo;<a href="/film/245135/" class="all">Мальчик в голубом</a>&raquo; (1919). Мурнау хорошо известен за открытие так называемой &laquo;Unchained camera technique&raquo; (метод съемки &laquo;освобожденной&raquo; камерой).',
        type: 'FACT',
        spoiler: false
      },
      {
        value:
          'Лошадей Шульца и Джанго зовут Фриц и Тони. Такие же имена были у лошадей героев вестернов <a href="/name/197843/" class="all">Уильяма С. Харта</a> и <a href="/name/219583/" class="all">Тома Микса</a>.',
        type: 'FACT',
        spoiler: false
      },
      {
        value:
          'После того как проект покинули <a href="/name/25359/" class="all">Майкл К. Уильямс</a>, <a href="/name/41294/" class="all">Саша Барон Коэн</a> и <a href="/name/9867/" class="all">Джозеф Гордон-Левитт</a>, их персонажи были удалены из сценария.',
        type: 'FACT',
        spoiler: false
      },
      {
        value:
          'Многие актеры сыграли роли, которые изначально писались именно под них. Среди этих актеров <a href="/name/245737/" class="all">Кристоф Вальц</a>, <a href="/name/37859/" class="all">Леонардо ДиКаприо</a> и <a href="/name/7164/" class="all">Сэмюэл Л. Джексон</a>.',
        type: 'FACT',
        spoiler: false
      },
      {
        value:
          'Герой <a href="/name/245737/" class="all">Кристофа Вальца</a> говорит о том, что у него имеется опыт в управлении передвижными цирками. Кристоф Вальц сыграл хозяина передвижного цирка в фильме &laquo;<a href="/film/462342/" class="all">Воды слонам!</a>&raquo; (2011).',
        type: 'FACT',
        spoiler: false
      },
      {
        value:
          'Бутоньерка на груди Кэлвина Кэнди (<a href="/name/37859/" class="all">Леонардо ДиКаприо</a>) такая же, как у главного злодея в исполнении Джэка Пэлэнса  в фильме &laquo;<a href="/film/54636/" class="all">Наёмник</a>&raquo; (1968) <a href="/name/170630/" class="all">Серджио Корбуччи</a>. И в одной из сцен появляется в кадре таким же образом.',
        type: 'FACT',
        spoiler: true
      },
      {
        value:
          'В сцене, где Кэлвин Кэнди, персонаж <a href="/name/37859/" class="all">Леонардо ДиКаприо</a>, бьёт ладонью по обеденному столу, актер разбил рукой стакан и у него действительно пошла кровь. ДиКаприо проигнорировал это, остался в образе и продолжил играть сцену. Этот дубль в итоге и использовали в фильме. <a href="/name/7640/" class="all">Квентин Тарантино</a> назвал этот момент &laquo;завораживающим&raquo;.',
        type: 'FACT',
        spoiler: true
      },
      {
        value:
          'Белые мужчины, которые играют в покер ближе к концу фильма, используют отрезанные уши рабов вместо денег.',
        type: 'FACT',
        spoiler: true
      },
      {
        value:
          'Хотя подразумевается, что у Кэлвина Кэнди и его сестры Лары кровосмесительные отношения, это можно оспорить, потому что он франкофил, а французам свойственно целовать друг друга во время приветствия.',
        type: 'FACT',
        spoiler: true
      },
      {
        value:
          'Борьба мандинго проходит в Кэлвинском клубе Клеопатры, в котором в качестве символа клуба используется бюст Нефертити. Это было сделано специально, чтобы подчеркнуть отсутствие утонченности Кэлвина Кэнди.',
        type: 'FACT',
        spoiler: true
      },
      {
        value:
          '&laquo;Вильгельмов крик&raquo; слышно, когда всадники отступают после взрыва повозки во время ночного рейда, и один из них падает с лошади.',
        type: 'FACT',
        spoiler: true
      },
      {
        value:
          'В своей эпизодической роли <a href="/name/2984/" class="all">Франко Неро</a> носит белые перчатки. Возможно, это намек на оригинальный фильм &laquo;<a href="/film/77394/" class="all">Джанго</a>&raquo; (1966), где в конце фильма мексиканцы разбивают руки его персонажу за воровство.',
        type: 'FACT',
        spoiler: true
      },
      {
        value:
          'На вилле Кэлвина Кэнди есть декоративная копия бюста Нефертити. Действие фильма разворачивается в 1858 году, в то время как бюст был найден после 1912 года.',
        type: 'BLOOPER',
        spoiler: true
      },
      {
        value:
          'В фильме используется динамит, но он был изобретен только в 1867 году, а это 9-ю годами позднее событий фильма.',
        type: 'BLOOPER',
        spoiler: true
      },
      {
        value:
          'Во время аукциона в начале фильма в оригинале доктор Шульц выкрикивает: "Sold, American!" (Продан американец). Но эта фраза стала популярной только с 1920-х годов, когда аукционер \'Speed\' Riggs ("Скоростной" Риггс) произнес это в заключении рекламы Lucky Strike на радио. Кроме того, "American" — это ссылка на American Tobacco Company, которая появилась только в 1890-х годах.',
        type: 'BLOOPER',
        spoiler: true
      },
      {
        value:
          'Соломенная шляпа <a href="/name/51980/" class="all">Майкла Паркса</a> слишком современная, так как в ней есть воздушные отверстия и пластиковый замок на шнурке.',
        type: 'BLOOPER',
        spoiler: true
      },
      {
        value:
          'Когда Шульц и Джанго впервые разбивают лагерь, видно, как Шульц надевает брюки и подтяжки. В следующей сцене брюки уже на нем, но он снова надевает подтяжки.',
        type: 'BLOOPER',
        spoiler: true
      },
      {
        value:
          'По пути на виллу Кэлвина Кэнди Джанго валит на землю лошадь вместе с одним из приспешников Кэнди. В следующем кадре всадник все еще лежит на земле, а лошадь стоит, как будто и не падала.',
        type: 'BLOOPER',
        spoiler: true
      },
      {
        value:
          'Когда Джанго узнает, что ему разрешено одеваться так, как заблагорассудится, он бросает шляпу на подставку, и она свисает передним краем вниз. В следующем кадре она висит ровно, как и остальные шляпы.',
        type: 'BLOOPER',
        spoiler: true
      },
      {
        value:
          'В доме Кэнди исполнительница на арфе играет произведение Бетховена &laquo;К Элизе&raquo;, впервые опубликованное в 1867 году, через 9 лет после событий фильма.',
        type: 'BLOOPER',
        spoiler: true
      },
      {
        value:
          'Когда Джанго и компания прибывают в Candyland видно, что сахарный тростник на полях не выше колена. По завершению фильма видно, что тот же самый тростник уже на уровне человеческого роста, хотя действие разворачивалось на следующий день после прибытия.',
        type: 'BLOOPER',
        spoiler: true
      },
      {
        value:
          'Когда Шульц и Джанго сидят в баре, то количество пива в бокалах сначала уменьшается, а потом снова становится таким же, как когда его принес Шульц.',
        type: 'BLOOPER',
        spoiler: true
      }
    ],
    genres: [{ name: 'вестерн' }, { name: 'боевик' }, { name: 'драма' }, { name: 'комедия' }],
    countries: [{ name: 'США' }],
    seasonsInfo: [],
    persons: [
      {
        id: 514,
        photo: 'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_514.jpg',
        name: 'Джейми Фокс',
        enName: 'Jamie Foxx',
        description: 'Django',
        profession: 'актеры',
        enProfession: 'actor'
      },
      {
        id: 245737,
        photo:
          'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_245737.jpg',
        name: 'Кристоф Вальц',
        enName: 'Christoph Waltz',
        description: 'Dr. King Schultz',
        profession: 'актеры',
        enProfession: 'actor'
      },
      {
        id: 37859,
        photo:
          'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_37859.jpg',
        name: 'Леонардо ДиКаприо',
        enName: 'Leonardo DiCaprio',
        description: 'Calvin Candie',
        profession: 'актеры',
        enProfession: 'actor'
      },
      {
        id: 17932,
        photo:
          'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_17932.jpg',
        name: 'Керри Вашингтон',
        enName: 'Kerry Washington',
        description: 'Broomhilda von Shaft',
        profession: 'актеры',
        enProfession: 'actor'
      },
      {
        id: 7164,
        photo: 'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_7164.jpg',
        name: 'Сэмюэл Л. Джексон',
        enName: 'Samuel L. Jackson',
        description: 'Stephen',
        profession: 'актеры',
        enProfession: 'actor'
      },
      {
        id: 14969,
        photo:
          'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_14969.jpg',
        name: 'Уолтон Гоггинс',
        enName: 'Walton Goggins',
        description: 'Billy Crash',
        profession: 'актеры',
        enProfession: 'actor'
      },
      {
        id: 86251,
        photo:
          'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_86251.jpg',
        name: 'Деннис Кристофер',
        enName: 'Dennis Christopher',
        description: 'Leonide Moguy',
        profession: 'актеры',
        enProfession: 'actor'
      },
      {
        id: 23296,
        photo:
          'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_23296.jpg',
        name: 'Джеймс Римар',
        enName: 'James Remar',
        description: 'Butch Pooch / Ace Speck',
        profession: 'актеры',
        enProfession: 'actor'
      },
      {
        id: 22094,
        photo:
          'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_22094.jpg',
        name: 'Дон Джонсон',
        enName: 'Don Johnson',
        description: 'Big Daddy',
        profession: 'актеры',
        enProfession: 'actor'
      },
      {
        id: 24144,
        photo:
          'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_24144.jpg',
        name: 'Лора Кайюэтт',
        enName: 'Laura Cayouette',
        description: 'Lara Lee Candie-Fitzwilly',
        profession: 'актеры',
        enProfession: 'actor'
      },
      {
        id: 1272251,
        photo:
          'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_1272251.jpg',
        name: 'Дж. Майкл Рива',
        enName: 'J. Michael Riva',
        description: null,
        profession: 'художники',
        enProfession: 'designer'
      },
      {
        id: 1986602,
        photo:
          'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_1986602.jpg',
        name: 'Пейдж Бакнер',
        enName: 'Page Buckner',
        description: null,
        profession: 'художники',
        enProfession: 'designer'
      },
      {
        id: 1986604,
        photo:
          'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_1986604.jpg',
        name: 'Дэвид Ф. Классен',
        enName: 'David F. Klassen',
        description: null,
        profession: 'художники',
        enProfession: 'designer'
      },
      {
        id: 2027711,
        photo:
          'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_2027711.jpg',
        name: 'Мара ЛеПере-Шлуп',
        enName: 'Mara LePere-Schloop',
        description: null,
        profession: 'художники',
        enProfession: 'designer'
      },
      {
        id: 1994282,
        photo:
          'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_1994282.jpg',
        name: 'Сюзен Уэкслер',
        enName: 'Suzan Wexler',
        description: null,
        profession: 'художники',
        enProfession: 'designer'
      },
      {
        id: 1529392,
        photo:
          'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_1529392.jpg',
        name: 'Шэрен Дэвис',
        enName: 'Sharen Davis',
        description: null,
        profession: 'художники',
        enProfession: 'designer'
      },
      {
        id: 1995996,
        photo:
          'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_1995996.jpg',
        name: 'Лесли А. Поуп',
        enName: 'Leslie Pope',
        description: null,
        profession: 'художники',
        enProfession: 'designer'
      },
      {
        id: 7640,
        photo: 'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_7640.jpg',
        name: 'Квентин Тарантино',
        enName: 'Quentin Tarantino',
        description: null,
        profession: 'режиссеры',
        enProfession: 'director'
      },
      {
        id: 1732397,
        photo:
          'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_1732397.jpg',
        name: 'Фред Раскин',
        enName: 'Fred Raskin',
        description: null,
        profession: 'монтажеры',
        enProfession: 'editor'
      },
      {
        id: 74952,
        photo:
          'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_74952.jpg',
        name: 'Роберт Ричардсон',
        enName: 'Robert Richardson',
        description: null,
        profession: 'операторы',
        enProfession: 'operator'
      },
      {
        id: 38952,
        photo:
          'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_38952.jpg',
        name: 'Реджинальд Хадлин',
        enName: 'Reginald Hudlin',
        description: null,
        profession: 'продюсеры',
        enProfession: 'producer'
      },
      {
        id: 1214460,
        photo:
          'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_1214460.jpg',
        name: 'Пилар Савон',
        enName: 'Pilar Savone',
        description: null,
        profession: 'продюсеры',
        enProfession: 'producer'
      },
      {
        id: 1988,
        photo: 'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_1988.jpg',
        name: 'Стейси Шер',
        enName: 'Stacey Sher',
        description: null,
        profession: 'продюсеры',
        enProfession: 'producer'
      },
      {
        id: 10298,
        photo:
          'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_10298.jpg',
        name: 'Уильям Пол Кларк',
        enName: 'William Paul Clark',
        description: null,
        profession: 'продюсеры',
        enProfession: 'producer'
      },
      {
        id: 1608429,
        photo:
          'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_1608429.jpg',
        name: 'Александр Носков',
        enName: null,
        description: null,
        profession: 'актеры дубляжа',
        enProfession: 'voice_actor'
      },
      {
        id: 290494,
        photo:
          'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_290494.jpg',
        name: 'Леонид Белозорович',
        enName: null,
        description: null,
        profession: 'актеры дубляжа',
        enProfession: 'voice_actor'
      },
      {
        id: 1193331,
        photo:
          'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_1193331.jpg',
        name: 'Сергей Бурунов',
        enName: null,
        description: null,
        profession: 'актеры дубляжа',
        enProfession: 'voice_actor'
      },
      {
        id: 1622838,
        photo:
          'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_1622838.jpg',
        name: 'Инна Королёва',
        enName: null,
        description: null,
        profession: 'актеры дубляжа',
        enProfession: 'voice_actor'
      },
      {
        id: 1078857,
        photo:
          'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_1078857.jpg',
        name: 'Алексей Колган',
        enName: null,
        description: null,
        profession: 'актеры дубляжа',
        enProfession: 'voice_actor'
      },
      {
        id: 7640,
        photo: 'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_7640.jpg',
        name: 'Квентин Тарантино',
        enName: 'Quentin Tarantino',
        description: null,
        profession: 'редакторы',
        enProfession: 'writer'
      },
      {
        id: 51980,
        photo:
          'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_51980.jpg',
        name: 'Майкл Паркс',
        enName: 'Michael Parks',
        description: null,
        profession: 'актеры',
        enProfession: 'actor'
      },
      {
        id: 92188,
        photo:
          'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_92188.jpg',
        name: 'Джон Джаррэтт',
        enName: 'John Jarratt',
        description: null,
        profession: 'актеры',
        enProfession: 'actor'
      },
      {
        id: 2984,
        photo: 'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_2984.jpg',
        name: 'Франко Неро',
        enName: 'Franco Nero',
        description: null,
        profession: 'актеры',
        enProfession: 'actor'
      },
      {
        id: 581340,
        photo:
          'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_581340.jpg',
        name: 'Джона Хилл',
        enName: 'Jonah Hill',
        description: null,
        profession: 'актеры',
        enProfession: 'actor'
      },
      {
        id: 5825,
        photo: 'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_5825.jpg',
        name: 'Том Савини',
        enName: 'Tom Savini',
        description: null,
        profession: 'актеры',
        enProfession: 'actor'
      },
      {
        id: 10374,
        photo:
          'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_10374.jpg',
        name: 'Зои Белл',
        enName: 'Zoë Bell',
        description: null,
        profession: 'актеры',
        enProfession: 'actor'
      },
      {
        id: 23374,
        photo:
          'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_23374.jpg',
        name: 'Майкл Боуэн',
        enName: 'Michael Bowen',
        description: null,
        profession: 'актеры',
        enProfession: 'actor'
      },
      {
        id: 27255,
        photo:
          'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_27255.jpg',
        name: 'Роберт Кэрредин',
        enName: 'Robert Carradine',
        description: null,
        profession: 'актеры',
        enProfession: 'actor'
      },
      {
        id: 1400838,
        photo:
          'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_1400838.jpg',
        name: 'Джэйк Гарбер',
        enName: 'Jake Garber',
        description: null,
        profession: 'актеры',
        enProfession: 'actor'
      },
      {
        id: 165956,
        photo:
          'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_165956.jpg',
        name: 'Тед Нили',
        enName: 'Ted Neeley',
        description: null,
        profession: 'актеры',
        enProfession: 'actor'
      },
      {
        id: 18240,
        photo:
          'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_18240.jpg',
        name: 'Джеймс Паркс',
        enName: 'James Parks',
        description: null,
        profession: 'актеры',
        enProfession: 'actor'
      },
      {
        id: 119128,
        photo:
          'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_119128.jpg',
        name: 'Дэвид Стин',
        enName: 'David Steen',
        description: null,
        profession: 'актеры',
        enProfession: 'actor'
      },
      {
        id: 2330167,
        photo:
          'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_2330167.jpg',
        name: 'Дэна Гурье',
        enName: 'Dana Gourrier',
        description: null,
        profession: 'актеры',
        enProfession: 'actor'
      },
      {
        id: 26344,
        photo:
          'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_26344.jpg',
        name: 'Николь Галисия',
        enName: 'Nichole Galicia',
        description: null,
        profession: 'актеры',
        enProfession: 'actor'
      },
      {
        id: 44303,
        photo:
          'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_44303.jpg',
        name: 'Ато Эссандо',
        enName: 'Ato Essandoh',
        description: null,
        profession: 'актеры',
        enProfession: 'actor'
      },
      {
        id: 30422,
        photo:
          'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_30422.jpg',
        name: 'Сэмми Ротиби',
        enName: 'Sammi Rotibi',
        description: null,
        profession: 'актеры',
        enProfession: 'actor'
      },
      {
        id: 55392,
        photo:
          'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_55392.jpg',
        name: 'Клэй Донахью Фонтенот',
        enName: 'Clay Donahue Fontenot',
        description: null,
        profession: 'актеры',
        enProfession: 'actor'
      },
      {
        id: 1562277,
        photo:
          'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_1562277.jpg',
        name: 'Эскаланте Ланди',
        enName: 'Escalante Lundy',
        description: null,
        profession: 'актеры',
        enProfession: 'actor'
      },
      {
        id: 2313905,
        photo:
          'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_2313905.jpg',
        name: 'Мириам Ф. Гловер',
        enName: 'Miriam F. Glover',
        description: null,
        profession: 'актеры',
        enProfession: 'actor'
      },
      {
        id: 14933,
        photo:
          'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_14933.jpg',
        name: 'Джеймс Руссо',
        enName: 'James Russo',
        description: null,
        profession: 'актеры',
        enProfession: 'actor'
      },
      {
        id: 693192,
        photo:
          'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_693192.jpg',
        name: 'Том Вопат',
        enName: 'Tom Wopat',
        description: null,
        profession: 'актеры',
        enProfession: 'actor'
      },
      {
        id: 73004,
        photo:
          'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_73004.jpg',
        name: 'Дон Страуд',
        enName: 'Don Stroud',
        description: null,
        profession: 'актеры',
        enProfession: 'actor'
      },
      {
        id: 3131,
        photo: 'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_3131.jpg',
        name: 'Расс Тэмблин',
        enName: 'Russ Tamblyn',
        description: null,
        profession: 'актеры',
        enProfession: 'actor'
      },
      {
        id: 40001,
        photo:
          'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_40001.jpg',
        name: 'Эмбер Тэмблин',
        enName: 'Amber Tamblyn',
        description: null,
        profession: 'актеры',
        enProfession: 'actor'
      },
      {
        id: 22241,
        photo:
          'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_22241.jpg',
        name: 'Брюс Дерн',
        enName: 'Bruce Dern',
        description: null,
        profession: 'актеры',
        enProfession: 'actor'
      },
      {
        id: 266,
        photo: 'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_266.jpg',
        name: 'М. К. Гейни',
        enName: 'M.C. Gainey',
        description: null,
        profession: 'актеры',
        enProfession: 'actor'
      },
      {
        id: 24674,
        photo:
          'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_24674.jpg',
        name: 'Купер Хукаби',
        enName: 'Cooper Huckabee',
        description: null,
        profession: 'актеры',
        enProfession: 'actor'
      },
      {
        id: 21991,
        photo:
          'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_21991.jpg',
        name: 'Док Дуэйм',
        enName: 'Doc Duhame',
        description: null,
        profession: 'актеры',
        enProfession: 'actor'
      },
      {
        id: 163087,
        photo:
          'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_163087.jpg',
        name: 'Ли Хорсли',
        enName: 'Lee Horsley',
        description: null,
        profession: 'актеры',
        enProfession: 'actor'
      },
      {
        id: 1733951,
        photo:
          'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_1733951.jpg',
        name: 'Амари Читом',
        enName: 'Amari Cheatom',
        description: null,
        profession: 'актеры',
        enProfession: 'actor'
      },
      {
        id: 1122415,
        photo:
          'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_1122415.jpg',
        name: 'Кит Джефферсон',
        enName: 'Keith Jefferson',
        description: null,
        profession: 'актеры',
        enProfession: 'actor'
      },
      {
        id: 3032611,
        photo:
          'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_3032611.jpg',
        name: 'Маркус Хендерсон',
        enName: 'Marcus Henderson',
        description: null,
        profession: 'актеры',
        enProfession: 'actor'
      },
      {
        id: 1506998,
        photo:
          'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_1506998.jpg',
        name: 'Лил Чаач',
        enName: 'Chuuch',
        description: null,
        profession: 'актеры',
        enProfession: 'actor'
      },
      {
        id: 1533110,
        photo:
          'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_1533110.jpg',
        name: 'Кинетик',
        enName: 'Kinetic',
        description: null,
        profession: 'актеры',
        enProfession: 'actor'
      },
      {
        id: 3022,
        photo: 'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_3022.jpg',
        name: 'Луиз Стрэттен',
        enName: 'Louise Stratten',
        description: null,
        profession: 'актеры',
        enProfession: 'actor'
      },
      {
        id: 552,
        photo: 'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_552.jpg',
        name: 'Ким Робиллард',
        enName: 'Kim Robillard',
        description: null,
        profession: 'актеры',
        enProfession: 'actor'
      },
      {
        id: 30155,
        photo:
          'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_30155.jpg',
        name: 'Шена Стейн',
        enName: 'Shana Stein',
        description: null,
        profession: 'актеры',
        enProfession: 'actor'
      },
      {
        id: 1214457,
        photo:
          'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_1214457.jpg',
        name: 'Шеннон Хэзлет',
        enName: 'Shannon Hazlett',
        description: null,
        profession: 'актеры',
        enProfession: 'actor'
      },
      {
        id: 113179,
        photo:
          'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_113179.jpg',
        name: 'Джек Лукарелли',
        enName: 'Jack Lucarelli',
        description: null,
        profession: 'актеры',
        enProfession: 'actor'
      },
      {
        id: 1646080,
        photo:
          'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_1646080.jpg',
        name: 'Александр Дзюба',
        enName: null,
        description: null,
        profession: 'актеры дубляжа',
        enProfession: 'voice_actor'
      },
      {
        id: 273180,
        photo:
          'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_273180.jpg',
        name: 'Никита Прозоровский',
        enName: null,
        description: null,
        profession: 'актеры дубляжа',
        enProfession: 'voice_actor'
      },
      {
        id: 1078947,
        photo:
          'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_1078947.jpg',
        name: 'Александр Клюквин',
        enName: null,
        description: null,
        profession: 'актеры дубляжа',
        enProfession: 'voice_actor'
      },
      {
        id: 269650,
        photo:
          'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_269650.jpg',
        name: 'Любовь Германова',
        enName: null,
        description: null,
        profession: 'актеры дубляжа',
        enProfession: 'voice_actor'
      },
      {
        id: 1787640,
        photo:
          'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_1787640.jpg',
        name: 'Александр Хошабаев',
        enName: null,
        description: null,
        profession: 'актеры дубляжа',
        enProfession: 'voice_actor'
      },
      {
        id: 1616407,
        photo:
          'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_1616407.jpg',
        name: 'Всеволод Кузнецов',
        enName: null,
        description: null,
        profession: 'актеры дубляжа',
        enProfession: 'voice_actor'
      },
      {
        id: 1781077,
        photo:
          'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_1781077.jpg',
        name: 'Диомид Виноградов',
        enName: null,
        description: null,
        profession: 'актеры дубляжа',
        enProfession: 'voice_actor'
      },
      {
        id: 1557383,
        photo:
          'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_1557383.jpg',
        name: 'Константин Карасик',
        enName: null,
        description: null,
        profession: 'актеры дубляжа',
        enProfession: 'voice_actor'
      },
      {
        id: 281329,
        photo:
          'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_281329.jpg',
        name: 'Ольга Кузнецова',
        enName: null,
        description: null,
        profession: 'актеры дубляжа',
        enProfession: 'voice_actor'
      },
      {
        id: 1665278,
        photo:
          'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_1665278.jpg',
        name: 'Вероника Саркисова',
        enName: null,
        description: null,
        profession: 'актеры дубляжа',
        enProfession: 'voice_actor'
      },
      {
        id: 1604859,
        photo:
          'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_1604859.jpg',
        name: 'Борис Токарев',
        enName: null,
        description: null,
        profession: 'актеры дубляжа',
        enProfession: 'voice_actor'
      },
      {
        id: 590562,
        photo:
          'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_590562.jpg',
        name: 'Олег Форостенко',
        enName: null,
        description: null,
        profession: 'актеры дубляжа',
        enProfession: 'voice_actor'
      },
      {
        id: 1454718,
        photo:
          'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_1454718.jpg',
        name: 'Василий Стоноженко',
        enName: null,
        description: null,
        profession: 'актеры дубляжа',
        enProfession: 'voice_actor'
      },
      {
        id: 298651,
        photo:
          'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_298651.jpg',
        name: 'Олег Щербинин',
        enName: null,
        description: null,
        profession: 'актеры дубляжа',
        enProfession: 'voice_actor'
      },
      {
        id: 284376,
        photo:
          'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_284376.jpg',
        name: 'Сергей Балабанов',
        enName: null,
        description: null,
        profession: 'актеры дубляжа',
        enProfession: 'voice_actor'
      },
      {
        id: 1468040,
        photo:
          'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_1468040.jpg',
        name: 'Михаил Георгиу',
        enName: null,
        description: null,
        profession: 'актеры дубляжа',
        enProfession: 'voice_actor'
      },
      {
        id: 1500422,
        photo:
          'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_1500422.jpg',
        name: 'Роман Стабуров',
        enName: null,
        description: null,
        profession: 'актеры дубляжа',
        enProfession: 'voice_actor'
      },
      {
        id: 1599035,
        photo:
          'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_1599035.jpg',
        name: 'Михаил Белякович',
        enName: null,
        description: null,
        profession: 'актеры дубляжа',
        enProfession: 'voice_actor'
      },
      {
        id: 1921569,
        photo:
          'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_1921569.jpg',
        name: 'Иван Жарков',
        enName: null,
        description: null,
        profession: 'актеры дубляжа',
        enProfession: 'voice_actor'
      },
      {
        id: 2497445,
        photo:
          'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_2497445.jpg',
        name: 'Анастасия Жаркова',
        enName: null,
        description: null,
        profession: 'актеры дубляжа',
        enProfession: 'voice_actor'
      },
      {
        id: 2887091,
        photo:
          'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_2887091.jpg',
        name: 'Кирилл Туранский',
        enName: null,
        description: null,
        profession: 'актеры дубляжа',
        enProfession: 'voice_actor'
      }
    ],
    lists: [
      'top250',
      'top500',
      'popular-films',
      '100_greatest_movies_XXI',
      'box-usa-all-time',
      'box-world-not-usa',
      'box-total',
      'box-russia-dollar',
      'oscar-best-film-nominees',
      'oscar-writing-original-screenplay'
    ],
    typeNumber: 1,
    alternativeName: 'Django Unchained',
    enName: null,
    names: [
      { name: 'Джанго освобожденный' },
      { name: 'Django Unchained' },
      { name: 'Zencirsiz Canqo', language: 'AZ', type: null },
      { name: 'Đangova osveta', language: 'RS', type: 'Latin' },
      { name: "ג'נגו ללא מעצורים", language: 'IL', type: null },
      { name: 'جانكو المتحرر', language: 'United Arab Emirates', type: null },
      { name: 'Ђангова освета', language: 'RS', type: 'Cyrillic' },
      { name: 'Django Livre', language: 'BR', type: null },
      { name: '장고: 분노의 추적자', language: 'KR', type: null },
      { name: '被解放的姜戈', language: 'CN', type: null },
      { name: 'Django desencadenado', language: 'ES', type: null }
    ],
    updatedAt: '2024-07-09T01:53:45.325Z',
    fees: {
      world: { value: 425368238, currency: '$' },
      russia: { value: 15990907, currency: '$' },
      usa: { value: 162805434, currency: '$' }
    },
    imagesInfo: { framesCount: 42 },
    ratingMpaa: 'r',
    shortDescription:
      'Метко шутя и стреляя, охотники за головами уничтожают негодяев. Квентин Тарантино пробует силы в вестерне',
    technology: { hasImax: false, has3D: false },
    ticketsOnSale: false,
    similarMovies: [
      {
        id: 9691,
        name: 'Бесславные ублюдки',
        enName: null,
        alternativeName: 'Inglourious Basterds',
        type: 'movie',
        poster: {
          url: 'https://avatars.mds.yandex.net/get-kinopoisk-image/1946459/5e6dde98-74a8-4c02-b003-01d48e091025/orig',
          previewUrl:
            'https://avatars.mds.yandex.net/get-kinopoisk-image/1946459/5e6dde98-74a8-4c02-b003-01d48e091025/x1000'
        },
        year: 2009,
        rating: { kp: 7.989, imdb: 8.4, filmCritics: 7.8, russianFilmCritics: 80, await: null }
      },
      {
        id: 606646,
        name: '12 лет рабства',
        enName: null,
        alternativeName: '12 Years a Slave',
        type: 'movie',
        poster: {
          url: 'https://avatars.mds.yandex.net/get-kinopoisk-image/6201401/5bf49fa3-333d-4625-9857-14b533adbad7/orig',
          previewUrl:
            'https://avatars.mds.yandex.net/get-kinopoisk-image/6201401/5bf49fa3-333d-4625-9857-14b533adbad7/x1000'
        },
        year: 2013,
        rating: { kp: 7.804, imdb: 8.1, filmCritics: 8.9, russianFilmCritics: 88.8889, await: null }
      },
      {
        id: 819101,
        name: 'Омерзительная восьмерка',
        enName: null,
        alternativeName: 'The Hateful Eight',
        type: 'movie',
        poster: {
          url: 'https://avatars.mds.yandex.net/get-kinopoisk-image/1600647/e5013408-8374-400b-a444-b9753e9da28d/orig',
          previewUrl:
            'https://avatars.mds.yandex.net/get-kinopoisk-image/1600647/e5013408-8374-400b-a444-b9753e9da28d/x1000'
        },
        year: 2015,
        rating: { kp: 7.971, imdb: 7.8, filmCritics: 7.3, russianFilmCritics: 87.0968, await: null }
      },
      {
        id: 2717,
        name: 'Убить Билла',
        enName: null,
        alternativeName: 'Kill Bill: Vol. 1',
        type: 'movie',
        poster: {
          url: 'https://avatars.mds.yandex.net/get-kinopoisk-image/1599028/c28ed8ad-54b7-4781-8f42-002d26b39b7f/orig',
          previewUrl:
            'https://avatars.mds.yandex.net/get-kinopoisk-image/1599028/c28ed8ad-54b7-4781-8f42-002d26b39b7f/x1000'
        },
        year: 2003,
        rating: { kp: 7.684, imdb: 8.2, filmCritics: 7.7, russianFilmCritics: 80, await: null }
      },
      {
        id: 349,
        name: 'Хороший, плохой, злой',
        enName: null,
        alternativeName: 'Il buono, il brutto, il cattivo',
        type: 'movie',
        poster: {
          url: 'https://avatars.mds.yandex.net/get-kinopoisk-image/1773646/8b9d4616-9426-4c74-a63c-296189f28213/orig',
          previewUrl:
            'https://avatars.mds.yandex.net/get-kinopoisk-image/1773646/8b9d4616-9426-4c74-a63c-296189f28213/x1000'
        },
        year: 1966,
        rating: { kp: 8.513, imdb: 8.8, filmCritics: 8.8, russianFilmCritics: 0, await: null }
      },
      {
        id: 462553,
        name: 'Железная хватка',
        enName: null,
        alternativeName: 'True Grit',
        type: 'movie',
        poster: {
          url: 'https://avatars.mds.yandex.net/get-kinopoisk-image/4303601/3387db29-e54b-4704-8def-4a68fe195a21/orig',
          previewUrl:
            'https://avatars.mds.yandex.net/get-kinopoisk-image/4303601/3387db29-e54b-4704-8def-4a68fe195a21/x1000'
        },
        year: 2010,
        rating: { kp: 7.616, imdb: 7.6, filmCritics: 8.3, russianFilmCritics: 100, await: null }
      },
      {
        id: 342,
        name: 'Криминальное чтиво',
        enName: null,
        alternativeName: 'Pulp Fiction',
        type: 'movie',
        poster: {
          url: 'https://avatars.mds.yandex.net/get-kinopoisk-image/1900788/87b5659d-a159-4224-9bff-d5a5d109a53b/orig',
          previewUrl:
            'https://avatars.mds.yandex.net/get-kinopoisk-image/1900788/87b5659d-a159-4224-9bff-d5a5d109a53b/x1000'
        },
        year: 1994,
        rating: { kp: 8.65, imdb: 8.9, filmCritics: 9.2, russianFilmCritics: 100, await: null }
      },
      {
        id: 47015,
        name: 'Убить Билла 2',
        enName: null,
        alternativeName: 'Kill Bill: Vol. 2',
        type: 'movie',
        poster: {
          url: 'https://avatars.mds.yandex.net/get-kinopoisk-image/1777765/2f8295c3-cc9f-43cf-8dfe-13616c3eaa5e/orig',
          previewUrl:
            'https://avatars.mds.yandex.net/get-kinopoisk-image/1777765/2f8295c3-cc9f-43cf-8dfe-13616c3eaa5e/x1000'
        },
        year: 2004,
        rating: { kp: 7.59, imdb: 8, filmCritics: 7.8, russianFilmCritics: 100, await: null }
      },
      {
        id: 470553,
        name: 'Прислуга',
        enName: null,
        alternativeName: 'The Help',
        type: 'movie',
        poster: {
          url: 'https://avatars.mds.yandex.net/get-kinopoisk-image/4303601/f1c4d9cb-2120-487c-a84a-cbb8e5c462c0/orig',
          previewUrl:
            'https://avatars.mds.yandex.net/get-kinopoisk-image/4303601/f1c4d9cb-2120-487c-a84a-cbb8e5c462c0/x1000'
        },
        year: 2011,
        rating: { kp: 8.239, imdb: 8.1, filmCritics: 7, russianFilmCritics: 50, await: null }
      },
      {
        id: 394,
        name: 'Бешеные псы',
        enName: null,
        alternativeName: 'Reservoir Dogs',
        type: 'movie',
        poster: {
          url: 'https://avatars.mds.yandex.net/get-kinopoisk-image/1946459/b1add366-9e49-4ad8-905a-46ca23da8adc/orig',
          previewUrl:
            'https://avatars.mds.yandex.net/get-kinopoisk-image/1946459/b1add366-9e49-4ad8-905a-46ca23da8adc/x1000'
        },
        year: 1991,
        rating: { kp: 8.115, imdb: 8.3, filmCritics: 8.9, russianFilmCritics: 0, await: null }
      }
    ],
    sequelsAndPrequels: [],
    ageRating: 18,
    logo: {
      url: 'https://avatars.mds.yandex.net/get-ott/1672343/2a00000170cfa903c504effbb48cb6d55881/orig'
    },
    watchability: {
      items: [
        {
          name: '24ТВ',
          logo: {
            url: 'https://avatars.mds.yandex.net/get-ott/2439731/85e83b8d-1159-4781-bad5-ce0a809b3843/orig'
          },
          url: 'https://24h.tv/contents/2012-django-unchained-551466305518043322'
        },
        {
          name: 'Смотрёшка',
          logo: {
            url: 'https://avatars.mds.yandex.net/get-ott/236744/c88e652e-2eb1-472d-b636-a266364dbf58/orig'
          },
          url: 'https://smotreshka.tv/archive/5b4c0cb2b2de77e75224f536?utm_source=yandex_search&utm_campaign=yandex_feed&utm_term=archive&utm_content=archive'
        }
      ]
    },
    top10: null,
    top250: 44,
    audience: [
      { count: 4449101, country: 'Германия' },
      { count: 4298436, country: 'Франция' },
      { count: 1990109, country: 'Россия' }
    ],
    deletedAt: null,
    isSeries: false,
    seriesLength: null,
    totalSeriesLength: null,
    networks: null,
    videos: {
      trailers: [
        {
          url: 'https://www.youtube.com/embed/_iH0UBYDI4g',
          name: 'Official International Trailer',
          site: 'youtube',
          type: 'TRAILER'
        },
        {
          url: 'https://www.youtube.com/embed/_iH0UBYDI4g',
          name: 'Official International Trailer',
          site: 'youtube',
          type: 'TRAILER'
        }
      ]
    }
  }
})
var actors = reactive({
  data: [
    {
      id: 514,
      photo: 'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_514.jpg',
      name: 'Джейми Фокс',
      enName: 'Jamie Foxx',
      description: 'Django',
      profession: 'актеры',
      enProfession: 'actor'
    },
    {
      id: 245737,
      photo: 'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_245737.jpg',
      name: 'Кристоф Вальц',
      enName: 'Christoph Waltz',
      description: 'Dr. King Schultz',
      profession: 'актеры',
      enProfession: 'actor'
    },
    {
      id: 37859,
      photo: 'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_37859.jpg',
      name: 'Леонардо ДиКаприо',
      enName: 'Leonardo DiCaprio',
      description: 'Calvin Candie',
      profession: 'актеры',
      enProfession: 'actor'
    },
    {
      id: 17932,
      photo: 'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_17932.jpg',
      name: 'Керри Вашингтон',
      enName: 'Kerry Washington',
      description: 'Broomhilda von Shaft',
      profession: 'актеры',
      enProfession: 'actor'
    },
    {
      id: 7164,
      photo: 'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_7164.jpg',
      name: 'Сэмюэл Л. Джексон',
      enName: 'Samuel L. Jackson',
      description: 'Stephen',
      profession: 'актеры',
      enProfession: 'actor'
    },
    {
      id: 14969,
      photo: 'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_14969.jpg',
      name: 'Уолтон Гоггинс',
      enName: 'Walton Goggins',
      description: 'Billy Crash',
      profession: 'актеры',
      enProfession: 'actor'
    },
    {
      id: 86251,
      photo: 'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_86251.jpg',
      name: 'Деннис Кристофер',
      enName: 'Dennis Christopher',
      description: 'Leonide Moguy',
      profession: 'актеры',
      enProfession: 'actor'
    },
    {
      id: 23296,
      photo: 'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_23296.jpg',
      name: 'Джеймс Римар',
      enName: 'James Remar',
      description: 'Butch Pooch / Ace Speck',
      profession: 'актеры',
      enProfession: 'actor'
    },
    {
      id: 22094,
      photo: 'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_22094.jpg',
      name: 'Дон Джонсон',
      enName: 'Don Johnson',
      description: 'Big Daddy',
      profession: 'актеры',
      enProfession: 'actor'
    },
    {
      id: 24144,
      photo: 'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_24144.jpg',
      name: 'Лора Кайюэтт',
      enName: 'Laura Cayouette',
      description: 'Lara Lee Candie-Fitzwilly',
      profession: 'актеры',
      enProfession: 'actor'
    },
    {
      id: 51980,
      photo: 'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_51980.jpg',
      name: 'Майкл Паркс',
      enName: 'Michael Parks',
      description: null,
      profession: 'актеры',
      enProfession: 'actor'
    },
    {
      id: 92188,
      photo: 'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_92188.jpg',
      name: 'Джон Джаррэтт',
      enName: 'John Jarratt',
      description: null,
      profession: 'актеры',
      enProfession: 'actor'
    },
    {
      id: 2984,
      photo: 'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_2984.jpg',
      name: 'Франко Неро',
      enName: 'Franco Nero',
      description: null,
      profession: 'актеры',
      enProfession: 'actor'
    },
    {
      id: 581340,
      photo: 'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_581340.jpg',
      name: 'Джона Хилл',
      enName: 'Jonah Hill',
      description: null,
      profession: 'актеры',
      enProfession: 'actor'
    },
    {
      id: 5825,
      photo: 'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_5825.jpg',
      name: 'Том Савини',
      enName: 'Tom Savini',
      description: null,
      profession: 'актеры',
      enProfession: 'actor'
    },
    {
      id: 10374,
      photo: 'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_10374.jpg',
      name: 'Зои Белл',
      enName: 'Zoë Bell',
      description: null,
      profession: 'актеры',
      enProfession: 'actor'
    },
    {
      id: 23374,
      photo: 'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_23374.jpg',
      name: 'Майкл Боуэн',
      enName: 'Michael Bowen',
      description: null,
      profession: 'актеры',
      enProfession: 'actor'
    },
    {
      id: 27255,
      photo: 'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_27255.jpg',
      name: 'Роберт Кэрредин',
      enName: 'Robert Carradine',
      description: null,
      profession: 'актеры',
      enProfession: 'actor'
    },
    {
      id: 1400838,
      photo:
        'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_1400838.jpg',
      name: 'Джэйк Гарбер',
      enName: 'Jake Garber',
      description: null,
      profession: 'актеры',
      enProfession: 'actor'
    },
    {
      id: 165956,
      photo: 'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_165956.jpg',
      name: 'Тед Нили',
      enName: 'Ted Neeley',
      description: null,
      profession: 'актеры',
      enProfession: 'actor'
    },
    {
      id: 18240,
      photo: 'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_18240.jpg',
      name: 'Джеймс Паркс',
      enName: 'James Parks',
      description: null,
      profession: 'актеры',
      enProfession: 'actor'
    },
    {
      id: 119128,
      photo: 'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_119128.jpg',
      name: 'Дэвид Стин',
      enName: 'David Steen',
      description: null,
      profession: 'актеры',
      enProfession: 'actor'
    },
    {
      id: 2330167,
      photo:
        'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_2330167.jpg',
      name: 'Дэна Гурье',
      enName: 'Dana Gourrier',
      description: null,
      profession: 'актеры',
      enProfession: 'actor'
    },
    {
      id: 26344,
      photo: 'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_26344.jpg',
      name: 'Николь Галисия',
      enName: 'Nichole Galicia',
      description: null,
      profession: 'актеры',
      enProfession: 'actor'
    },
    {
      id: 44303,
      photo: 'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_44303.jpg',
      name: 'Ато Эссандо',
      enName: 'Ato Essandoh',
      description: null,
      profession: 'актеры',
      enProfession: 'actor'
    },
    {
      id: 30422,
      photo: 'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_30422.jpg',
      name: 'Сэмми Ротиби',
      enName: 'Sammi Rotibi',
      description: null,
      profession: 'актеры',
      enProfession: 'actor'
    },
    {
      id: 55392,
      photo: 'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_55392.jpg',
      name: 'Клэй Донахью Фонтенот',
      enName: 'Clay Donahue Fontenot',
      description: null,
      profession: 'актеры',
      enProfession: 'actor'
    },
    {
      id: 1562277,
      photo:
        'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_1562277.jpg',
      name: 'Эскаланте Ланди',
      enName: 'Escalante Lundy',
      description: null,
      profession: 'актеры',
      enProfession: 'actor'
    },
    {
      id: 2313905,
      photo:
        'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_2313905.jpg',
      name: 'Мириам Ф. Гловер',
      enName: 'Miriam F. Glover',
      description: null,
      profession: 'актеры',
      enProfession: 'actor'
    },
    {
      id: 14933,
      photo: 'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_14933.jpg',
      name: 'Джеймс Руссо',
      enName: 'James Russo',
      description: null,
      profession: 'актеры',
      enProfession: 'actor'
    },
    {
      id: 693192,
      photo: 'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_693192.jpg',
      name: 'Том Вопат',
      enName: 'Tom Wopat',
      description: null,
      profession: 'актеры',
      enProfession: 'actor'
    },
    {
      id: 73004,
      photo: 'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_73004.jpg',
      name: 'Дон Страуд',
      enName: 'Don Stroud',
      description: null,
      profession: 'актеры',
      enProfession: 'actor'
    },
    {
      id: 3131,
      photo: 'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_3131.jpg',
      name: 'Расс Тэмблин',
      enName: 'Russ Tamblyn',
      description: null,
      profession: 'актеры',
      enProfession: 'actor'
    },
    {
      id: 40001,
      photo: 'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_40001.jpg',
      name: 'Эмбер Тэмблин',
      enName: 'Amber Tamblyn',
      description: null,
      profession: 'актеры',
      enProfession: 'actor'
    },
    {
      id: 22241,
      photo: 'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_22241.jpg',
      name: 'Брюс Дерн',
      enName: 'Bruce Dern',
      description: null,
      profession: 'актеры',
      enProfession: 'actor'
    },
    {
      id: 266,
      photo: 'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_266.jpg',
      name: 'М. К. Гейни',
      enName: 'M.C. Gainey',
      description: null,
      profession: 'актеры',
      enProfession: 'actor'
    },
    {
      id: 24674,
      photo: 'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_24674.jpg',
      name: 'Купер Хукаби',
      enName: 'Cooper Huckabee',
      description: null,
      profession: 'актеры',
      enProfession: 'actor'
    },
    {
      id: 21991,
      photo: 'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_21991.jpg',
      name: 'Док Дуэйм',
      enName: 'Doc Duhame',
      description: null,
      profession: 'актеры',
      enProfession: 'actor'
    },
    {
      id: 163087,
      photo: 'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_163087.jpg',
      name: 'Ли Хорсли',
      enName: 'Lee Horsley',
      description: null,
      profession: 'актеры',
      enProfession: 'actor'
    },
    {
      id: 1733951,
      photo:
        'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_1733951.jpg',
      name: 'Амари Читом',
      enName: 'Amari Cheatom',
      description: null,
      profession: 'актеры',
      enProfession: 'actor'
    },
    {
      id: 1122415,
      photo:
        'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_1122415.jpg',
      name: 'Кит Джефферсон',
      enName: 'Keith Jefferson',
      description: null,
      profession: 'актеры',
      enProfession: 'actor'
    },
    {
      id: 3032611,
      photo:
        'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_3032611.jpg',
      name: 'Маркус Хендерсон',
      enName: 'Marcus Henderson',
      description: null,
      profession: 'актеры',
      enProfession: 'actor'
    },
    {
      id: 1506998,
      photo:
        'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_1506998.jpg',
      name: 'Лил Чаач',
      enName: 'Chuuch',
      description: null,
      profession: 'актеры',
      enProfession: 'actor'
    },
    {
      id: 1533110,
      photo:
        'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_1533110.jpg',
      name: 'Кинетик',
      enName: 'Kinetic',
      description: null,
      profession: 'актеры',
      enProfession: 'actor'
    },
    {
      id: 3022,
      photo: 'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_3022.jpg',
      name: 'Луиз Стрэттен',
      enName: 'Louise Stratten',
      description: null,
      profession: 'актеры',
      enProfession: 'actor'
    },
    {
      id: 552,
      photo: 'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_552.jpg',
      name: 'Ким Робиллард',
      enName: 'Kim Robillard',
      description: null,
      profession: 'актеры',
      enProfession: 'actor'
    },
    {
      id: 30155,
      photo: 'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_30155.jpg',
      name: 'Шена Стейн',
      enName: 'Shana Stein',
      description: null,
      profession: 'актеры',
      enProfession: 'actor'
    },
    {
      id: 1214457,
      photo:
        'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_1214457.jpg',
      name: 'Шеннон Хэзлет',
      enName: 'Shannon Hazlett',
      description: null,
      profession: 'актеры',
      enProfession: 'actor'
    },
    {
      id: 113179,
      photo: 'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_113179.jpg',
      name: 'Джек Лукарелли',
      enName: 'Jack Lucarelli',
      description: null,
      profession: 'актеры',
      enProfession: 'actor'
    }
  ]
})
var staff = reactive({
  data: [
    {
      id: 1272251,
      photo:
        'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_1272251.jpg',
      name: 'Дж. Майкл Рива',
      enName: 'J. Michael Riva',
      description: null,
      profession: 'художники',
      enProfession: 'designer'
    },
    {
      id: 1986602,
      photo:
        'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_1986602.jpg',
      name: 'Пейдж Бакнер',
      enName: 'Page Buckner',
      description: null,
      profession: 'художники',
      enProfession: 'designer'
    },
    {
      id: 1986604,
      photo:
        'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_1986604.jpg',
      name: 'Дэвид Ф. Классен',
      enName: 'David F. Klassen',
      description: null,
      profession: 'художники',
      enProfession: 'designer'
    },
    {
      id: 2027711,
      photo:
        'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_2027711.jpg',
      name: 'Мара ЛеПере-Шлуп',
      enName: 'Mara LePere-Schloop',
      description: null,
      profession: 'художники',
      enProfession: 'designer'
    },
    {
      id: 1994282,
      photo:
        'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_1994282.jpg',
      name: 'Сюзен Уэкслер',
      enName: 'Suzan Wexler',
      description: null,
      profession: 'художники',
      enProfession: 'designer'
    },
    {
      id: 1529392,
      photo:
        'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_1529392.jpg',
      name: 'Шэрен Дэвис',
      enName: 'Sharen Davis',
      description: null,
      profession: 'художники',
      enProfession: 'designer'
    },
    {
      id: 1995996,
      photo:
        'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_1995996.jpg',
      name: 'Лесли А. Поуп',
      enName: 'Leslie Pope',
      description: null,
      profession: 'художники',
      enProfession: 'designer'
    },
    {
      id: 7640,
      photo: 'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_7640.jpg',
      name: 'Квентин Тарантино',
      enName: 'Quentin Tarantino',
      description: null,
      profession: 'режиссеры',
      enProfession: 'director'
    },
    {
      id: 1732397,
      photo:
        'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_1732397.jpg',
      name: 'Фред Раскин',
      enName: 'Fred Raskin',
      description: null,
      profession: 'монтажеры',
      enProfession: 'editor'
    },
    {
      id: 74952,
      photo: 'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_74952.jpg',
      name: 'Роберт Ричардсон',
      enName: 'Robert Richardson',
      description: null,
      profession: 'операторы',
      enProfession: 'operator'
    },
    {
      id: 38952,
      photo: 'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_38952.jpg',
      name: 'Реджинальд Хадлин',
      enName: 'Reginald Hudlin',
      description: null,
      profession: 'продюсеры',
      enProfession: 'producer'
    },
    {
      id: 1214460,
      photo:
        'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_1214460.jpg',
      name: 'Пилар Савон',
      enName: 'Pilar Savone',
      description: null,
      profession: 'продюсеры',
      enProfession: 'producer'
    },
    {
      id: 1988,
      photo: 'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_1988.jpg',
      name: 'Стейси Шер',
      enName: 'Stacey Sher',
      description: null,
      profession: 'продюсеры',
      enProfession: 'producer'
    },
    {
      id: 10298,
      photo: 'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_10298.jpg',
      name: 'Уильям Пол Кларк',
      enName: 'William Paul Clark',
      description: null,
      profession: 'продюсеры',
      enProfession: 'producer'
    },
    {
      id: 1608429,
      photo:
        'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_1608429.jpg',
      name: 'Александр Носков',
      enName: null,
      description: null,
      profession: 'актеры дубляжа',
      enProfession: 'voice_actor'
    },
    {
      id: 290494,
      photo: 'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_290494.jpg',
      name: 'Леонид Белозорович',
      enName: null,
      description: null,
      profession: 'актеры дубляжа',
      enProfession: 'voice_actor'
    },
    {
      id: 1193331,
      photo:
        'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_1193331.jpg',
      name: 'Сергей Бурунов',
      enName: null,
      description: null,
      profession: 'актеры дубляжа',
      enProfession: 'voice_actor'
    },
    {
      id: 1622838,
      photo:
        'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_1622838.jpg',
      name: 'Инна Королёва',
      enName: null,
      description: null,
      profession: 'актеры дубляжа',
      enProfession: 'voice_actor'
    },
    {
      id: 1078857,
      photo:
        'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_1078857.jpg',
      name: 'Алексей Колган',
      enName: null,
      description: null,
      profession: 'актеры дубляжа',
      enProfession: 'voice_actor'
    },
    {
      id: 7640,
      photo: 'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_7640.jpg',
      name: 'Квентин Тарантино',
      enName: 'Quentin Tarantino',
      description: null,
      profession: 'редакторы',
      enProfession: 'writer'
    },
    {
      id: 1646080,
      photo:
        'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_1646080.jpg',
      name: 'Александр Дзюба',
      enName: null,
      description: null,
      profession: 'актеры дубляжа',
      enProfession: 'voice_actor'
    },
    {
      id: 273180,
      photo: 'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_273180.jpg',
      name: 'Никита Прозоровский',
      enName: null,
      description: null,
      profession: 'актеры дубляжа',
      enProfession: 'voice_actor'
    },
    {
      id: 1078947,
      photo:
        'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_1078947.jpg',
      name: 'Александр Клюквин',
      enName: null,
      description: null,
      profession: 'актеры дубляжа',
      enProfession: 'voice_actor'
    },
    {
      id: 269650,
      photo: 'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_269650.jpg',
      name: 'Любовь Германова',
      enName: null,
      description: null,
      profession: 'актеры дубляжа',
      enProfession: 'voice_actor'
    },
    {
      id: 1787640,
      photo:
        'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_1787640.jpg',
      name: 'Александр Хошабаев',
      enName: null,
      description: null,
      profession: 'актеры дубляжа',
      enProfession: 'voice_actor'
    },
    {
      id: 1616407,
      photo:
        'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_1616407.jpg',
      name: 'Всеволод Кузнецов',
      enName: null,
      description: null,
      profession: 'актеры дубляжа',
      enProfession: 'voice_actor'
    },
    {
      id: 1781077,
      photo:
        'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_1781077.jpg',
      name: 'Диомид Виноградов',
      enName: null,
      description: null,
      profession: 'актеры дубляжа',
      enProfession: 'voice_actor'
    },
    {
      id: 1557383,
      photo:
        'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_1557383.jpg',
      name: 'Константин Карасик',
      enName: null,
      description: null,
      profession: 'актеры дубляжа',
      enProfession: 'voice_actor'
    },
    {
      id: 281329,
      photo: 'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_281329.jpg',
      name: 'Ольга Кузнецова',
      enName: null,
      description: null,
      profession: 'актеры дубляжа',
      enProfession: 'voice_actor'
    },
    {
      id: 1665278,
      photo:
        'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_1665278.jpg',
      name: 'Вероника Саркисова',
      enName: null,
      description: null,
      profession: 'актеры дубляжа',
      enProfession: 'voice_actor'
    },
    {
      id: 1604859,
      photo:
        'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_1604859.jpg',
      name: 'Борис Токарев',
      enName: null,
      description: null,
      profession: 'актеры дубляжа',
      enProfession: 'voice_actor'
    },
    {
      id: 590562,
      photo: 'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_590562.jpg',
      name: 'Олег Форостенко',
      enName: null,
      description: null,
      profession: 'актеры дубляжа',
      enProfession: 'voice_actor'
    },
    {
      id: 1454718,
      photo:
        'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_1454718.jpg',
      name: 'Василий Стоноженко',
      enName: null,
      description: null,
      profession: 'актеры дубляжа',
      enProfession: 'voice_actor'
    },
    {
      id: 298651,
      photo: 'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_298651.jpg',
      name: 'Олег Щербинин',
      enName: null,
      description: null,
      profession: 'актеры дубляжа',
      enProfession: 'voice_actor'
    },
    {
      id: 284376,
      photo: 'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_284376.jpg',
      name: 'Сергей Балабанов',
      enName: null,
      description: null,
      profession: 'актеры дубляжа',
      enProfession: 'voice_actor'
    },
    {
      id: 1468040,
      photo:
        'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_1468040.jpg',
      name: 'Михаил Георгиу',
      enName: null,
      description: null,
      profession: 'актеры дубляжа',
      enProfession: 'voice_actor'
    },
    {
      id: 1500422,
      photo:
        'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_1500422.jpg',
      name: 'Роман Стабуров',
      enName: null,
      description: null,
      profession: 'актеры дубляжа',
      enProfession: 'voice_actor'
    },
    {
      id: 1599035,
      photo:
        'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_1599035.jpg',
      name: 'Михаил Белякович',
      enName: null,
      description: null,
      profession: 'актеры дубляжа',
      enProfession: 'voice_actor'
    },
    {
      id: 1921569,
      photo:
        'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_1921569.jpg',
      name: 'Иван Жарков',
      enName: null,
      description: null,
      profession: 'актеры дубляжа',
      enProfession: 'voice_actor'
    },
    {
      id: 2497445,
      photo:
        'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_2497445.jpg',
      name: 'Анастасия Жаркова',
      enName: null,
      description: null,
      profession: 'актеры дубляжа',
      enProfession: 'voice_actor'
    },
    {
      id: 2887091,
      photo:
        'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_2887091.jpg',
      name: 'Кирилл Туранский',
      enName: null,
      description: null,
      profession: 'актеры дубляжа',
      enProfession: 'voice_actor'
    }
  ]
})
var trailers = reactive({
  data: []
})

var backgroundStyles = (img) => {
  return {
    background: `linear-gradient(rgba(33, 37, 41, 0.8) 0%, rgba(33, 37, 41, 0.8)), url(${img})`,

    'background-repeat': 'no-repeat',
    'background-size': '100%',
    'background-attachment': 'fixed'
  }
}

var sorderStaff = reactive({ data: [] })
var mainStaff = reactive({ data: [] })
var dubbingActors = reactive({ data: [] })

var getFilm = async (id) => {
  let response = await axios(`https://api.kinopoisk.dev/v1.4/movie/${id}`, options)

  film.data = response.data
  actors.data = response.data.persons.filter((el) => el.profession === 'актеры')
  staff.data = response.data.persons.filter((el) => el.profession !== 'актеры')
  trailers.data = response.data.videos
}

watch(staff, (newValue) => {
  sorderStaff.data = newValue.data.reduce((acc, el) => {
    acc[el.name] = acc[el.name] || { name: el.name, id: el.id, photo: el.photo, professions: [] }
    acc[el.name].professions.push(el.profession)
    return acc
  }, {})
})

watch(sorderStaff, (newValue) => {
  mainStaff.data = Object.fromEntries(
    Object.entries(newValue.data)
      .filter((el) => !el[1].professions.includes('актеры дубляжа'))
      .sort((a, b) => b[1].professions.length - a[1].professions.length)
  )

  dubbingActors.data = Object.fromEntries(
    Object.entries(newValue.data)
      .filter((el) => el[1].professions.includes('актеры дубляжа'))
      .sort((a, b) => b[1].professions.length - a[1].professions.length)
  )
})

watch(route, (newValue) => {
  id.value = newValue.params.id

  getFilm(newValue.params.id)
})

onMounted(() => {
  getFilm(id.value)
})
</script>

<style scoped>
.bg {
  background: rgba(18, 18, 18, 0.6);
}
</style>
