<template>
  <div class="menu">
    <div class="search-bar-container" @mouseenter="isHovering = true"
    @mouseleave="isHovering = false">
      <input placeholder="Search" class="search-bar" type="text" v-model="searchQuery" />
      <img class="search-icon" src="../assets/search-black.png" alt="" />
      <div
        class="search-results-container"
        :style="{ display: searchQuery && isHovering ? 'block' : 'none' }"
      >
        <v-row  class="movie-row" v-for="(movie, index) in movies" :key="index">
          <v-col cols="3" class="image-container">
            <img
              class="image"
              :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
            />
          </v-col>
          <v-col class="movie-details">
            {{ movie.original_title }}
            <p class="rating-container">
              <img class="imdb-icon" src="../assets/imdb.png" alt="Star Icon" />
              {{ movie.vote_average.toFixed(1) }}
            </p>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        searchQuery: "",
      isHovering: false,
      movies: [],
      tv: [],
      person: [],
    };
  },
  watch: {
    searchQuery() {
      this.searchMovie(this.searchQuery);
    },
  },
  mounted() {},
  methods: {
    searchMovie(query) {
      if (!query) return; // es para no hacer una solicitud http con datos vacios
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YjlhNTMwYWQ5M2FkNWJiYTRmMjllOTczNDAwNTMwNiIsInN1YiI6IjY0OGI1MjMyMjYzNDYyMDEyZDQ4Y2FmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Et8_P6mnw57auSL1lTQZJMHPwdJ-XCW0hWBjKjq83n0",
        },
      };

      fetch(
        `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
        options
      )
        .then((response) => response.json())
        .then((response) => {
          this.movies = response.results;
        })
        .catch((err) => console.error(err));
    },
  },
};
</script>

<style scoped>
.menu {
  background-color: #202020;
  height: 6rem;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  position: relative;
  z-index: 10;
}
.search-bar-container {
  background-color: #ffffff;
  height: 5rem;
  width: 50%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  position: relative;
}
.search-bar {
  width: 100%;
  height: 100%;
  font-weight: 400;
  padding: 1rem;
}
.search-bar:focus {
  outline: none;
  border: 1px solid #868686;
}
.search-icon {
  position: absolute;
  top: 20%;
  left: 92%;
}

.search-results-container {
  padding-top: 2rem;
  position: absolute;
  height: 80rem;
  width: 100%;
  background-color: #202020;
  top: 100%;
  left: 0%;
  display: none;
  overflow: scroll;
}
.search-bar:focus + .search-results-container {
  opacity: 1;
}
.image-container {
  height: 20rem;
}
.image {
  height: 100%;
  width: 100%;
  object-fit: contain;
}
.movie-details {
    font-weight: 400;
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
</style>>


