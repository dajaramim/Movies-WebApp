<template>
  <v-container class="principal-container fill-height pa-0">
    <!-- Movies -->
    <h2>Most Popular Movies</h2>
    <!-- Carrusel -->
    <Swiper
      :modules="modules"
      :navigation="true"
      :slides-per-view="3"
      :space-between="20"
    >
      <SwiperSlide
        class="my-swiper-slide"
        v-for="(movie, index) in popularMovies"
        :key="index"
      >
        <v-img
          class="image"
          :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
        ></v-img>
        <div class="details-container">
          <div class="details">
            <h3>{{ movie.title }}</h3>
            <p class="rating-container">
              <img class="imdb-icon" src="../assets/imdb.png" alt="Star Icon" />
              {{ movie.vote_average.toFixed(1) }}
            </p>
            <div class="d-flex justify-center">
              <button
                @click="selectAndGoToDetail(movie, 'movie')"
                class="detail-btn"
              >
                See More
              </button>
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>

    <!-- TV Series -->

    <h2>Most Popular TV Series</h2>

    <Swiper
      :modules="modules"
      :navigation="true"
      :slides-per-view="3"
      :space-between="20"
    >
      <SwiperSlide
        class="my-swiper-slide"
        v-for="(show, index) in popularShows"
        :key="index"
      >
        <v-img
          :src="'https://image.tmdb.org/t/p/w500' + show.poster_path"
        ></v-img>
        <div class="details-container">
          <div class="details">
            <h3>{{ show.name }}</h3>
            <p class="rating-container">
              <img class="imdb-icon" src="../assets/imdb.png" alt="Star Icon" />
              {{ show.vote_average.toFixed(1) }}
            </p>
            <div class="d-flex justify-center">
              <button
                @click="selectAndGoToDetail(show, 'show')"
                class="detail-btn"
              >
                See More
              </button>
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </v-container>
</template>

<script>
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [Navigation],
    };
  },
  data() {
    return {
      popularMovies: [],
      popularShows: [],
    };
  },
  mounted() {
    this.fetchMovies();
    this.fetchSeries();
  },
  methods: {
    //Obtengo Películas
    fetchMovies() {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YjlhNTMwYWQ5M2FkNWJiYTRmMjllOTczNDAwNTMwNiIsInN1YiI6IjY0OGI1MjMyMjYzNDYyMDEyZDQ4Y2FmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Et8_P6mnw57auSL1lTQZJMHPwdJ-XCW0hWBjKjq83n0",
        },
      };

      fetch(
        "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
        options
      )
        .then((response) => response.json())
        .then((response) => {
          this.popularMovies = response.results;
        })
        .catch((err) => console.error(err));
    },
    //Obtengo series
    fetchSeries() {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YjlhNTMwYWQ5M2FkNWJiYTRmMjllOTczNDAwNTMwNiIsInN1YiI6IjY0OGI1MjMyMjYzNDYyMDEyZDQ4Y2FmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Et8_P6mnw57auSL1lTQZJMHPwdJ-XCW0hWBjKjq83n0",
        },
      };

      fetch(
        "https://api.themoviedb.org/3/trending/tv/day?language=en-US",
        options
      )
        .then((response) => response.json())
        .then((response) => {
          this.popularShows = response.results;
        })
        .catch((err) => console.error(err));
    },
    //Función para cambiar de componente e ir a ver los detalles de una entidad
    selectAndGoToDetail(entity, entityType) {
      console.log(entity);
      this.$store.dispatch("selectEntity", entity.id); // Almacena la entidad en Vuex
      if (entityType === "movie") {
        this.$router.push({ name: "MovieDetail", params: { id: entity.id } }); // Navega al componente MovieDetail
      } else if (entityType === "show") {
        this.$router.push({ name: "ShowDetail", params: { id: entity.id } }); // Navega al componente ShowDetail
      }
    },
  },
};
</script>
<style scoped>
.principal-container {
  width: 120rem;
}
h2 {
  color: #eb1b24;
  font-size: 5rem;
  margin-bottom: 3rem;
}

/* Carrusel*/

.my-swiper-slide:hover .details-container {
  background-color: rgba(
    44,
    44,
    44,
    0.8
  ); /* hacer el elemento semi-transparente */
  pointer-events: auto; /* permitir clics de nuevo */
}
.my-swiper-slide:hover .details {
  opacity: 1;
}
.image {
  position: relative;
  width: 100%;
}

/*Información película o serie*/
.details-container {
  position: absolute;
  top: 70%;
  left: 0%;
  min-height: 30%;
  width: 100%;
  background-color: rgba(
    44,
    44,
    44,
    0
  ); /* hacer el elemento completamente transparente */
  text-align: start;
  transition: background-color 0.3s ease-in-out; /* transición de 0.5 segundos en la opacidad */
  pointer-events: none;
}
.details {
  padding: 2rem;
  opacity: 0;
  transition: opacity 0.5s;
}

.rating-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.imdb-icon {
  height: 4rem;
  margin-right: 0.2rem;
}
.detail-btn {
  background-color: #eb1b24;
  padding: 0.8rem 3rem;
  color: #fff;
  font-size: 2rem;
  display: inline-block;
  font-weight: 700;
  border-radius: 3rem;
  opacity: 0.4;
  transition: opacity 0.3s;
  text-align: center;
}
.detail-btn:hover {
  opacity: 1;
}
</style>