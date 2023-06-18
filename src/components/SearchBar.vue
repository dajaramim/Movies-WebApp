<template>
  <div class="menu">
    <div class="container">
      <div class="home-router" @click="goToHome">DanMovies</div>
      <div
        class="search-bar-container"
        @mouseenter="isHovering = true"
        @mouseleave="isHovering = false"
      >
        <input
          placeholder="Search"
          class="search-bar"
          type="text"
          v-model="searchQuery"
        />
        <img
          class="search-icon"
          src="../assets/search-black.png"
          alt="search icon"
        />
        <div
          class="search-results-container"
          :style="{ display: searchQuery && isHovering ? 'block' : 'none' }"
        >
          <!-- Películas -->
          <div v-if="movies && movies.length">
            <h2 class="heading-query">Movies</h2>
            <v-row
              class="result-row"
              v-for="(movie, index) in movies"
              :key="index"
            >
              <v-col cols="3" class="image-container">
                <img
                  class="image"
                  :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
                />
              </v-col>
              <v-col class="query-details">
                {{ movie.original_title }}
                <p class="rating-container">
                  <img
                    class="imdb-icon"
                    src="../assets/imdb.png"
                    alt="Star Icon"
                  />
                  {{ movie.vote_average.toFixed(1) }}
                </p>
              </v-col>
            </v-row>
          </div>

          <!-- Series de tv -->
          <div v-if="shows && shows.length">
            <h2 class="heading-query">Tv Shows</h2>
            <v-row
              class="result-row"
              v-for="(show, index) in shows"
              :key="index"
            >
              <v-col cols="3" class="image-container">
                <img
                  class="image"
                  :src="'https://image.tmdb.org/t/p/w500' + show.poster_path"
                />
              </v-col>
              <v-col class="query-details">
                {{ show.name }}
                <p class="rating-container">
                  <img
                    class="imdb-icon"
                    src="../assets/imdb.png"
                    alt="Star Icon"
                  />
                  {{ show.vote_average.toFixed(1) }}
                </p>
              </v-col>
            </v-row>
          </div>

          <!-- Personas -->
          <div v-if="people && people.length">
            <h2 class="heading-query">People</h2>
            <v-row
              class="result-row"
              v-for="(person, index) in people"
              :key="index"
            >
              <v-col cols="3" class="image-container">
                <img
                  class="image"
                  :src="'https://image.tmdb.org/t/p/w500' + person.profile_path"
                />
              </v-col>
              <v-col class="query-details">
                {{ person.name }}
                <p class="profession">
                  Known for {{ person.known_for_department }}
                </p>
              </v-col>
            </v-row>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();

    const goToHome = () => {
      router.push({ name: "Home" });
    };
    return {
      goToHome,
    };
  },
  data() {
    return {
      searchQuery: "",
      isHovering: false,
      movies: [],
      shows: [],
      people: [],
    };
  },
  watch: {
    async searchQuery() {
      if (!this.searchQuery) {
        // Si la consulta de búsqueda está vacía, limpia los resultados
        this.movies = [];
        this.shows = [];
        this.people = [];
        return;
      }

      // Llama a los métodos de búsqueda para cada tipo
      await Promise.all([
        this.searchMovies(this.searchQuery),
        this.searchshows(this.searchQuery),
        this.searchpeople(this.searchQuery),
      ]);
    },
  },
  methods: {
    async searchMovies(query) {
      const moviesResult = await this.fetchData(
        `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
      );
      //filtro para que no guarde los elementos que no tengan foto
      this.movies = moviesResult.results.filter(
        (movie) => movie.poster_path !== null
      );
    },
    async searchshows(query) {
      const showsResult = await this.fetchData(
        `https://api.themoviedb.org/3/search/tv?query=${query}&language=en-US&page=1`
      );
      this.shows = showsResult.results.filter(
        (tvShow) => tvShow.poster_path !== null
      );
    },
    async searchpeople(query) {
      const peopleResults = await this.fetchData(
        `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`
      );
      this.people = peopleResults.results.filter(
        (person) => person.profile_path !== null
      );
    },
    async fetchData(url) {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YjlhNTMwYWQ5M2FkNWJiYTRmMjllOTczNDAwNTMwNiIsInN1YiI6IjY0OGI1MjMyMjYzNDYyMDEyZDQ4Y2FmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Et8_P6mnw57auSL1lTQZJMHPwdJ-XCW0hWBjKjq83n0",
        },
      };
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    },
  },
};
</script>

<style scoped>
.menu {
  background-color: #202020;
  display: flex;
  justify-content: space-around;
  position: relative;
  
  z-index: 10; /* Esto es ara que aparezca por encima del componente Popular*/
  height: 5rem;
}
.container {
  width: 120rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.home-router {
  font-size: 3rem;
  transition: 0.1s
}
.home-router:hover {
  transform: scale(1.1);
  cursor: pointer;
  opacity: 0.8;
}


/* Barra de busqueda*/
.search-bar-container {
  background-color: #ffffff;
  height: 80%;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 1rem;
}
.search-bar {
  padding: 0.5rem 1rem;
  font-weight: 400;
  height: 100%;
  width: 100%;
  border-radius: 1rem;
}
.search-bar:focus {
  outline: groove;
  border: 1px solid #888888;
}
.search-icon {
  width: 3rem;
  position: absolute;
  top: 10%;
  left: 92%;
  cursor: pointer;
}
.search-icon:hover {
  transform: scale(1.1);
}
/* Resultado de la busqueda */
.search-results-container {
  padding: 2rem 4rem 2rem 2rem;
  position: absolute;
  height: 80rem;
  width: 100%;
  background-color: #202020;
  top: 100%;
  left: 0%;
  display: none;
  overflow-y: auto;
  overflow-x: hidden;
}
/* cuandos search-bar este seleccionado, se le cambiará la opacidad a .search-results-container*/
.search-bar:focus + .search-results-container {
  opacity: 1;
}
.heading-query {
  margin: 2rem;
  text-align: start;
  font-size: 4rem;
}
.result-row {
  transition-property: background-color;
  transition-duration: 0.3s;
}
.result-row:hover {
  background-color: #484848;
  cursor: pointer;
}
.image-container {
  height: 15rem;
}
.image {
  height: 100%;
  width: 100%;
  object-fit: contain;
}
.query-details {
  font-weight: 400;
}
/* Calificación*/
.rating-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.imdb-icon {
  height: 4rem;
  margin-right: 0.2rem;
}
.profession {
  font-weight: 400;
}
</style>>


