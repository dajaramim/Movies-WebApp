<template>
  <SearchBar />
  <v-container class="principal-container pa-0">
    <div>
      <!-- Cabecera -->
      <div class="header">
        <h2 class="title">{{ show.name }}</h2>
        <div class="rating-container">
          <img class="imdb-icon" src="../assets/imdb.png" alt="Star Icon" />
          <p class="rating-text">{{ show.vote_average?.toFixed(1) }}</p>
        </div>
      </div>

      <p class="release-date">
        Last Season {{ show.last_episode_to_air?.season_number }}
      </p>
      <!-- Poster  -->
      <v-row class="visual-container">
        <v-col class="image-container">
          <img
            class="image"
            :src="'https://image.tmdb.org/t/p/w500' + show.poster_path"
          />
        </v-col>
        <!-- Videos -->
        <v-col class="videos-container" v-if="videos && videos.length > 0">
          <Swiper
            class="carousel"
            :options="swiperOptions"
            :navigation="true"
            :modules="modules"
          >
            <SwiperSlide
              class="video"
              v-for="(video, index) in videos"
              :key="index"
            >
              <iframe
                width="800"
                height="500"
                :src="'https://www.youtube.com/embed/' + video.key"
              >
              </iframe>
            </SwiperSlide>
          </Swiper>
        </v-col>
        <!-- fin carrusel de peliculas -->
      </v-row>

      <!-- Lista de géneros y Cast heading -->
      <div class="flex-container">
        <v-col class="genre-container" v-if="show.genres"
          ><!-- Verifica si existen géneros -->
          <v-row
            class="genre"
            v-for="(genre, index) in show.genres"
            :key="index"
          >
            {{ genre.name }}
          </v-row>
        </v-col>
        <v-col class="cast-text" v-if="cast && cast.length">Cast</v-col>
      </div>
      <!-- Fin contenido audivisual -->

      <!-- Detalles -->
      <div class="detail-container">
        <v-row class="ma-0">
          <v-col class="overview-container">
            <p class="overview">{{ show.overview }}</p>
          </v-col>
          <!-- Cast -->
          <v-col class="carousel-container">
            <Swiper
              class="carousel-cast"
              :options="swiperOptions"
              :navigation="true"
              :modules="modules"
            >
              <SwiperSlide
                class="person-container"
                v-for="(person, index) in cast"
                :key="index"
              >
                <v-row>
                  <v-col>
                    <v-img
                      class="person-image"
                      :src="
                        'https://image.tmdb.org/t/p/w500' + person.profile_path
                      "
                      @click="
                        () => {
                          selectAndGoToDetail(person, 'person');
                        }
                      "
                    ></v-img>
                  </v-col>

                  <v-col class="person-detail">
                    <p>{{ person.name }}</p>
                    <p>Played: {{ person.character }}</p>
                  </v-col>
                </v-row>
              </SwiperSlide>
            </Swiper>
          </v-col>
        </v-row>
      </div>
    </div>
  </v-container>
</template>
  
  <script>
import SearchBar from "@/components/SearchBar.vue";
import { Navigation } from "swiper";
import { useStore } from "vuex";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
export default {
  components: {
    Swiper,
    SwiperSlide,
    SearchBar,
  },
  setup() {
    const store = useStore();

    const selectedShow = store.state.selectedEntity;

    return {
      modules: [Navigation],
      selectedShow,
    };
  },

  data() {
    return {
      show: {},
      swiperOptions: {
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      },
      videos: [],
      cast: [],
    };
  },
  mounted() {
    this.fetchShow(this.selectedShow);
    this.fetchShowVideo(this.selectedShow);
    this.fetchCast(this.selectedShow);
  },

  methods: {
    fetchShow(show_id) {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YjlhNTMwYWQ5M2FkNWJiYTRmMjllOTczNDAwNTMwNiIsInN1YiI6IjY0OGI1MjMyMjYzNDYyMDEyZDQ4Y2FmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Et8_P6mnw57auSL1lTQZJMHPwdJ-XCW0hWBjKjq83n0",
        },
      };

      fetch(
        `https://api.themoviedb.org/3/tv/${show_id}?language=en-US`,
        options
      )
        .then((response) => response.json())
        .then((response) => {
          this.show = response;
        })
        .catch((err) => console.error(err));
    },
    fetchShowVideo(show_id) {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YjlhNTMwYWQ5M2FkNWJiYTRmMjllOTczNDAwNTMwNiIsInN1YiI6IjY0OGI1MjMyMjYzNDYyMDEyZDQ4Y2FmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Et8_P6mnw57auSL1lTQZJMHPwdJ-XCW0hWBjKjq83n0",
        },
      };

      fetch(
        `https://api.themoviedb.org/3/tv/${show_id}/videos?language=en-US`,
        options
      )
        .then((response) => response.json())
        .then((response) => {
          this.videos = response.results;
        })
        .catch((err) => console.error(err));
    },
    fetchCast(show_id) {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YjlhNTMwYWQ5M2FkNWJiYTRmMjllOTczNDAwNTMwNiIsInN1YiI6IjY0OGI1MjMyMjYzNDYyMDEyZDQ4Y2FmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Et8_P6mnw57auSL1lTQZJMHPwdJ-XCW0hWBjKjq83n0",
        },
      };

      fetch(
        `https://api.themoviedb.org/3/tv/${show_id}/credits?language=en-US`,
        options
      )
        .then((response) => response.json())
        .then((response) => {
          this.cast = response.cast;
          console.log(response.cast);
        })
        .catch((err) => console.error(err));
    },
    selectAndGoToDetail(entity, entityType) {
      console.log(entity);
      this.$store.dispatch("selectEntity", entity.id); // Almacena la entidad en Vuex
      if (entityType === "person") {
        this.$router.push({ name: "PersonDetail", params: { id: entity.id } }); // Navega al componente PersonDetail
      }
    },
  },
};
</script>
  
  <style scoped>
/*Cabecera*/

.principal-container {
  width: 120rem;
  padding: 0;
}
.header {
  display: flex;
  gap: 2rem;
  align-items: start;
}
.title {
  font-size: 6rem;
  max-width: 60rem;
  margin: 0;
}
.release-date {
  font-weight: 400;
  margin-bottom: 3rem;

  color: #a4a4a4;
}
.rating-text {
  font-weight: 400;
  font-size: 5rem;
}
.rating-container {
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 1rem;
  padding: 0;
}

/*Imagenes y videos*/
.visual-container {
  width: 100%;
  display: flex;
  align-items: start;
  margin: 0;
}
.carousel {
  width: 80rem;
}
.image-container {
  padding: 0;
}
.image {
  height: 50rem;
  width: 50rem;
  padding-right: 1rem;
}
.videos-container {
  width: 120rem;
  height: 50rem;
  padding: 0;
}
.video {
  display: flex;
  justify-content: center;
}

/*Detalles películas*/

.detail-container {
  margin: 2rem 0 5rem 0;
}
.overview-container {
  padding: 0;
}
.overview {
  font-weight: 400;
}

.imdb-icon {
  height: 10rem;
  margin-right: 0.2rem;
}
.flex-container {
  display: flex;
  margin: 0;
}
.genre-container {
  margin-top: 2rem;
  padding: 0;
}

.genre {
  font-weight: 400;
  padding: 0.4rem;
  border: 1px solid rgb(255, 255, 255, 0.5);
  border-radius: 1rem;
  display: inline;
  margin: 0;
}

/* Cast*/

.cast-text {
  font-size: 5rem;
  text-align: start;
  padding: 0;
  margin-top: 1rem;
  margin-left: 10rem;
  font-weight: 400;
}
.carousel-container {
  padding: 0;
}
.carousel-cast {
  width: 60rem;
}
.person-image {
  height: 30rem;
  transition-property: opacity;
  transition-duration: 0.3s;
  cursor: pointer;
}
.person-image:hover {
  opacity: 0.9;
}
.person-detail p {
  font-weight: 400;
}
</style>