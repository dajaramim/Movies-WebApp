<template>
  <SearchBar />
  <v-container class="principal-container pa-0">
  
    <!-- Cabecera -->
    <v-row class="header">
      <v-col class="pa-0">
        <h2 class="title-header">{{ person.name }}</h2>
    <!-- Imagen  -->

        <v-row class="ma-0">
          <v-col class="image-container">
            <img
              class="image"
              :src="'https://image.tmdb.org/t/p/w500' + person.profile_path"
            />
          </v-col>
        </v-row>
      </v-col>
          <!-- Detalles -->
      <v-col class="detail-container">
        <p>Known for {{ person.known_for_department }}</p>
        <p>Place of birth: {{ person.place_of_birth }}</p>
  
        <p v-if="person.homepage">Homepage: {{ person.homepage }}</p>
      </v-col>
    </v-row>
<!-- titulos -->
  <v-row>
    <v-col class="title">Movies</v-col>
    <v-col class="title">Tv Shows</v-col>

  </v-row>
    <v-row class="carousels ma-0">
        <!-- carrusel películas -->
       
      <v-col class="carousel-movies">
        <Swiper :options="swiperOptions" :navigation="true" :modules="modules">
          <SwiperSlide
            class="movie-container"
            v-for="movie in movies"
            :key="movie.id"
          >
            <v-row class="ma-0">
              
                <img
                  class="carousel-image"
                  :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
                  @click="
                  () => {
                    
                    selectAndGoToDetail(movie, 'movie');
                  }
                "
                />
              
            </v-row>
          </SwiperSlide>
        </Swiper>
      </v-col>
      <!-- carrusel series -->

      <v-col class="carousel-shows">
        <Swiper :options="swiperOptions" :navigation="true" :modules="modules">
          <SwiperSlide
            class="show-container"
            v-for="show in shows"
            :key="show.id"
          >
            <v-row class="ma-0">
                <img
                  class="carousel-image"
                  :src="'https://image.tmdb.org/t/p/w500' + show.poster_path"
                  @click="
                  () => {
                    
                    selectAndGoToDetail(show, 'show');
                  }
                "
                />
            </v-row>
          </SwiperSlide>
        </Swiper>
      </v-col>
    </v-row>
  
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
    
    const selectedPerson = store.state.selectedEntity;

    return {
      modules: [Navigation],
      selectedPerson,
    };
  },

  data() {
    return {
      person: {},
      movies: [],
      shows: [],
      swiperOptions: {
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      },
    };
  },
  mounted() {
    this.fetchPerson(this.selectedPerson);
    this.fetchMovies(this.selectedPerson);
    this.fetchShows(this.selectedPerson);
  },

  methods: {
    fetchPerson(person_id) {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YjlhNTMwYWQ5M2FkNWJiYTRmMjllOTczNDAwNTMwNiIsInN1YiI6IjY0OGI1MjMyMjYzNDYyMDEyZDQ4Y2FmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Et8_P6mnw57auSL1lTQZJMHPwdJ-XCW0hWBjKjq83n0",
        },
      };

      fetch(
        `https://api.themoviedb.org/3/person/${person_id}?language=en-US`,
        options
      )
        .then((response) => response.json())
        .then((response) => {
          this.person = response;
        })
        .catch((err) => console.error(err));
    },

    fetchMovies(person_id) {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YjlhNTMwYWQ5M2FkNWJiYTRmMjllOTczNDAwNTMwNiIsInN1YiI6IjY0OGI1MjMyMjYzNDYyMDEyZDQ4Y2FmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Et8_P6mnw57auSL1lTQZJMHPwdJ-XCW0hWBjKjq83n0",
        },
      };

      fetch(
        `https://api.themoviedb.org/3/person/${person_id}/movie_credits?language=en-US`,
        options
      )
        .then((response) => response.json())
        .then((response) => {
          console.log(response.cast);
          this.movies = response.cast.filter( //filtro para que no muestre las películas sin foto
            (movie) => movie.poster_path !== null
          );
        })
        .catch((err) => console.error(err));
    },
    fetchShows(person_id) {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YjlhNTMwYWQ5M2FkNWJiYTRmMjllOTczNDAwNTMwNiIsInN1YiI6IjY0OGI1MjMyMjYzNDYyMDEyZDQ4Y2FmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Et8_P6mnw57auSL1lTQZJMHPwdJ-XCW0hWBjKjq83n0",
        },
      };

      fetch(
        `https://api.themoviedb.org/3/person/${person_id}/tv_credits?language=en-US`,
        options
      )
        .then((response) => response.json())
        .then((response) => {
          this.shows = response.cast.filter(
            (show) => show.poster_path !== null //filtro para que no muestre los shows sin foto
          );
        })
        .catch((err) => console.error(err));
    },
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
/*Cabecera*/
.principal-container {
  justify-content: start;
  width: 120rem;
  padding: 0;
  
}
.header {
  margin: 2rem 0;
  width: 100%;
  display: flex;
  align-items: center;

}
.title-header {
  font-size: 6rem;
  max-width: 60rem;
  margin: 0;
}
.visual-container {
  display: flex;
  align-items: center;
}

.image-container {
  padding: 0;
}
.image {
  height: 50rem;
  width: 100%;
  padding-right: 1rem;
  object-fit: contain;
}
.title {
  text-align: center;
  font-size: 4rem;
  font-weight: 400;
}
.detail-container p {
  font-weight: 400;
  font-size: 2rem;
}
.carousels {
  padding: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  
}
.carousel-movies {
  width: 50%;
  padding: 0;
}
.movie-container {
  width: 50%;
}
.carousel-image {
  margin: 0 auto;
  transition-property: opacity;
  transition-duration: 0.3s;
  cursor: pointer;
}
.carousel-image:hover {
opacity: 0.9;
}
.carousel-shows {
  width: 50%;
  height: 100%;
  padding: 0;
}

</style>